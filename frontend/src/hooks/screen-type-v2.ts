import { useEffect, useState } from "react";

type ScreenBreakpoint = {
  name: string;
  min: number;
  max: number;
};

type ScreenBreakpoints = Array<ScreenBreakpoint>;

export const DEFAULT_BREAKPOINTS: ScreenBreakpoints = [
  {
    name: "mobile",
    min: 0,
    max: 478,
  },
  {
    name: "mobileLandscape",
    min: 577,
    max: 767,
  },
  {
    name: "tablet",
    min: 768,
    max: 991,
  },
  {
    name: "desktop",
    min: 992,
    max: 1200,
  },
  {
    name: "largeDesktop",
    min: 1201,
    max: 1400,
  },
  {
    name: "wideDesktop",
    min: 1400,
    max: 9999,
  },
];

export const calculateCurrentScreenType = (breakpoints: ScreenBreakpoints) => {
  const screenType: { [key: (typeof breakpoints)[number]["name"]]: boolean } =
    {};
  for (let index = 0; index < breakpoints.length; index++) {
    const breakpoint = breakpoints[index];
    screenType[breakpoint.name] =
      window.innerWidth >= breakpoint.min &&
      window.innerWidth <= breakpoint.max;
  }
  return screenType;
};

export const useScreenTypeV2 = (
  breakpoints: ScreenBreakpoints = DEFAULT_BREAKPOINTS
) => {
  type ScreeType = { [key: (typeof breakpoints)[number]["name"]]: boolean };
  const [screenType, setScreenType] = useState<ScreeType>(
    calculateCurrentScreenType(breakpoints)
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resizeEventHandler = () => {
    setScreenType(calculateCurrentScreenType(breakpoints));
  };
  useEffect(() => {
    window.addEventListener("resize", resizeEventHandler);
    return () => {
      window.removeEventListener("resize", resizeEventHandler);
    };
  }, []);

  return [screenType];
};
