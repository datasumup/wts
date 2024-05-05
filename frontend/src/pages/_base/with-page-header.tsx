import classNames from "classnames";

export type WithPageHeaderProps = {
  children?: React.ReactNode;
  header: string;
  className?: string;
};
export const WithPageHeader = ({
  children,
  header,
  className,
}: WithPageHeaderProps) => {
  return (
    <div className={classNames("flex flex-col", className)}>
      <h1 className="my-2 md:my-4 text-xl md:text-2xl font-bold leading-9 tracking-tight text-gray-900 w-full flex justify-center md:justify-start">
        {header}
      </h1>
      {children}
    </div>
  );
};
