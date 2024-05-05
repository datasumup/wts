import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { Link, useMatches } from "react-router-dom";

export type BreadcrumbProps = { className?: string };
export const Breadcrumbs = ({ className }: BreadcrumbProps) => {
  const matches = useMatches();
  const crumbs = matches
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((match) => Boolean((match.handle as any)?.crumb))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((match) => (match.handle as any)?.crumb(match.data));

  return crumbs?.length > 0 ? (
    <nav aria-label="Breadcrumb" className={className}>
      <ol role="list" className="flex items-center gap-1 text-sm text-gray-600">
        <li className="flex items-center">
          <HomeIcon className="h-4 w-4 mx-0.5" />
          <Link to={"/"} className="block transition hover:text-gray-700">
            {"Home"}
          </Link>
        </li>
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            <ChevronRightIcon className="h-4 w-4 mx-0.5" />
            <Link
              to={matches[index + 1]}
              className="block transition hover:text-gray-700"
            >
              {crumb}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  ) : (
    <></>
  );
};
