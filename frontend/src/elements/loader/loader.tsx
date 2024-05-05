import classNames from "classnames";

export type LoaderProps = {
  className?: string;
  children?: React.ReactNode;
};
export const Loader = ({ className, children }: LoaderProps) => {
  return (
    <div
      className={classNames(
        "relative flex items-center justify-center",
        className
      )}
    >
      <div
        data-path
        className={
          "rounded-full border-4 relative border-tertiary-200 flex items-center justify-center"
        }
      >
        <div
          data-child
          className={"p-1 h-full w-full flex justify-center items-center"}
        >
          {children}
        </div>
      </div>
      <div
        data-spinning
        className="peer h-full w-2 border-0 border-t-4 rounded-full border-tertiary-600 animate-spin absolute"
      ></div>
    </div>
  );
};
