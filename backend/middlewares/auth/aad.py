from fastapi import Depends, FastAPI, HTTPException, Request, status
import os
from fastapi.security import OAuth2PasswordRequestForm
from msal import ConfidentialClientApplication
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.middleware.sessions import SessionMiddleware
from starlette.types import ASGIApp
from starlette.responses import Response, RedirectResponse
from starlette.requests import Request
import uuid
import json
import secrets

__COOKIE_NAME__ = "__ccaa_custom_auth"
__CLIENT_ID__ = os.getenv("ENTRA_CLIENT_ID")
__CLIENT_SECRET__ = os.getenv("ENTRA_CLIENT_SECRET")
__AUTHORITY__ = f"https://login.microsoftonline.com/{os.getenv('ENTRA_TENANT_ID')}"
__ENTRA_REDIRECT_URL__ = os.getenv("ENTRA_REDIRECT_URL")
__DEFAULT_SESSION_SECRET__ = os.getenv("SESSION_SECRET", secrets.token_urlsafe(32))
SCOPES = ["User.Read"]

__confidential_app__ = ConfidentialClientApplication(
    __CLIENT_ID__,
    authority=__AUTHORITY__,
    client_credential=__CLIENT_SECRET__,
)


def get_scopes():
    return SCOPES


def login_request_handler(request: Request):
    request.session["state"] = str(uuid.uuid4())
    auth_url = __confidential_app__.get_authorization_request_url(
        get_scopes(),
        state=request.session["state"],
        redirect_uri=__ENTRA_REDIRECT_URL__,
    )
    return RedirectResponse(url=auth_url)


def login_callback_handler(request: Request):
    if request.query_params.get("state") != request.session["state"]:
        return Response(
            content={"error": "Request not originated from us"},
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    if request.query_params.get("error"):
        return Response(
            content={"error": request.query_params.get("error")},
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    result = __confidential_app__.acquire_token_by_authorization_code(
        request.query_params.get("code"),
        scopes=get_scopes(),
        redirect_uri=__ENTRA_REDIRECT_URL__,
    )

    if "access_token" not in result:
        return Response(
            content={"error": "Error acquiring token"},
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    request.session["user"] = result.get("id_token_claims")
    request.session["roles"] = result.get("id_token_claims").get("roles")
    # request.session["access_token"] = result.get("access_token")
    return RedirectResponse(url="/")


def logout_handler(request: Request):
    request.session.clear()
    request.cookies.clear()
    return "Logged out successfully"


class AADAuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp) -> None:
        super().__init__(app)

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        if ("user" not in request.session) and (
            not request.url.path.startswith("/auth")
        ):
            if request.url.path.startswith("/api"):
                return Response(
                    content=json.dumps({"error": "unauthorized"}),
                    status_code=status.HTTP_401_UNAUTHORIZED,
                )
            else:
                return RedirectResponse(url="/auth/login")
        response = await call_next(request)
        return response


def use_aad_auth(app: FastAPI, config: dict):
    app.add_middleware(AADAuthMiddleware)
    app.add_middleware(
        SessionMiddleware, secret_key=__DEFAULT_SESSION_SECRET__, max_age=604800
    )
    app.add_api_route("/auth/login", methods=["GET"], endpoint=login_request_handler)
    app.add_api_route(
        "/auth/callback", methods=["GET"], endpoint=login_callback_handler
    )
    app.add_api_route("/auth/logout", methods=["GET"], endpoint=logout_handler)
