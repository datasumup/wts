import { useEffect, useState } from "react";

type ScreenBreakpoints = {
  largeDesktop: number;
  desktop: number;
  tablet: number;
  mobile: number;
};

export const DEFAULT_BREAKPOINTS: ScreenBreakpoints = {
  largeDesktop: 1440,
  desktop: 992,
  tablet: 768,
  mobile: 320,
};

export const BREAKPOINT_TYPES = {
  mobile: "MOBILE",
  tablet: "TABLET",
  desktop: "DESKTOP",
  largeDesktop: "LARGE_DESKTOP",
};
export const getCurrentScreenType = (currentScreenType: any) => ({
  isMobile: currentScreenType === BREAKPOINT_TYPES.mobile,
  isTablet: currentScreenType === BREAKPOINT_TYPES.tablet,
  isDesktop: currentScreenType === BREAKPOINT_TYPES.desktop,
  isLargeDesktop: currentScreenType === BREAKPOINT_TYPES.largeDesktop,
});

export const calculateCurrentScreenType = (breakpoints: ScreenBreakpoints) => ({
  isMobile: window.innerWidth < breakpoints.tablet,
  isTablet:
    window.innerWidth >= breakpoints.tablet &&
    window.innerWidth < breakpoints.desktop,
  isDesktop:
    window.innerWidth >= breakpoints.desktop &&
    window.innerWidth < breakpoints.largeDesktop,
  isLargeDesktop: window.innerWidth >= breakpoints.largeDesktop,
});

export const useScreenType = () => {
  const [screenType, setScreenType] = useState(
    calculateCurrentScreenType(DEFAULT_BREAKPOINTS)
  );
  const handleResize = (type: string) => (event: { matches: any }) =>
    event.matches && setScreenType(getCurrentScreenType(type));

  useEffect(() => {
    setScreenType(calculateCurrentScreenType(DEFAULT_BREAKPOINTS));

    const largeDesktopQueryList = matchMedia(
      `(min-width: ${DEFAULT_BREAKPOINTS.largeDesktop}px)`
    );
    const desktopQueryList = matchMedia(
      `(min-width: ${DEFAULT_BREAKPOINTS.desktop}px) and (max-width: ${
        DEFAULT_BREAKPOINTS.largeDesktop - 1
      }px)`
    );
    const tabletQueryList = matchMedia(
      `(min-width: ${DEFAULT_BREAKPOINTS.tablet}px) and (max-width: ${
        DEFAULT_BREAKPOINTS.desktop - 1
      }px)`
    );
    const mobileQueryList = matchMedia(
      `(max-width: ${DEFAULT_BREAKPOINTS.mobile}px)`
    );

    mobileQueryList.addEventListener(
      "change",
      handleResize(BREAKPOINT_TYPES.mobile)
    );
    tabletQueryList.addEventListener(
      "change",
      handleResize(BREAKPOINT_TYPES.tablet)
    );
    desktopQueryList.addEventListener(
      "change",
      handleResize(BREAKPOINT_TYPES.desktop)
    );
    largeDesktopQueryList.addEventListener(
      "change",
      handleResize(BREAKPOINT_TYPES.largeDesktop)
    );

    return () => {
      mobileQueryList.removeEventListener(
        "change",
        handleResize(BREAKPOINT_TYPES.mobile)
      );
      tabletQueryList.removeEventListener(
        "change",
        handleResize(BREAKPOINT_TYPES.tablet)
      );
      desktopQueryList.removeEventListener(
        "change",
        handleResize(BREAKPOINT_TYPES.desktop)
      );
      largeDesktopQueryList.removeEventListener(
        "change",
        handleResize(BREAKPOINT_TYPES.largeDesktop)
      );
    };
  }, []);

  return [screenType];
};
