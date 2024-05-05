import { NavLink as RouterNavLink } from "react-router-dom";

export type NavLinkProps = {
  text?: string;
  href: string;
};
export const NavLink = ({ text, href }: NavLinkProps) => {
  return (
    <RouterNavLink
      to={href}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      className={({ isActive }) =>
        isActive
          ? "active text-primary-500 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
          : "pending text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
      }
    >
      {text}
    </RouterNavLink>
  );
};
