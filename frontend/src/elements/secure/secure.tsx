import { useUser } from "@@services/user";

export type SecureAccessProps = {
  children: React.ReactNode;
  roles: Array<string>;
};
export const SecureAccess = ({ children, roles }: SecureAccessProps) => {
  const [user] = useUser();

  if (!user?.authenticated && !import.meta.env.VITE_AUTH_DISABLED) {
    return null;
  }

  return import.meta.env.VITE_AUTH_DISABLED ||
    roles?.some((role) => user?.roles?.includes(role)) ? (
    <>{children}</>
  ) : null;
};
