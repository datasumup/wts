import { Suspense } from "react";

export type LazyWrapperProps = {
  children: React.ReactNode;
};
export const LazyWrapper = ({ children }: LazyWrapperProps) => {
  return <Suspense fallback="Loading...">{children}</Suspense>;
};
