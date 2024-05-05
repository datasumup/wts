export const keyframes = {
  enterFromRight: {
    from: { opacity: "0", transform: "translateX(200px)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },
  enterFromLeft: {
    from: { opacity: "0", transform: "translateX(-200px)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },
  exitToRight: {
    from: { opacity: "1", transform: "translateX(0)" },
    to: { opacity: "0", transform: "translateX(200px)" },
  },
  exitToLeft: {
    from: { opacity: "1", transform: "translateX(0)" },
    to: { opacity: "0", transform: "translateX(-200px)" },
  },
  scaleIn: {
    from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
    to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
  },
  scaleOut: {
    from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
    to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
  },
  fadeIn: {
    from: { opacity: "0" },
    to: { opacity: "1" },
  },
  fadeOut: {
    from: { opacity: "1" },
    to: { opacity: "0" },
  },
  slideUpAndFade: {
    from: { opacity: "0", transform: "translateY(2px)" },
    to: { opacity: "1", transform: "translateY(0)" },
  },
  slideRightAndFade: {
    from: { opacity: "0", transform: "translateX(-2px)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },
  slideDownAndFade: {
    from: { opacity: "0", transform: "translateY(-2px)" },
    to: { opacity: "1", transform: "translateY(0)" },
  },
  slideLeftAndFade: {
    from: { opacity: "0", transform: "translateX(2px)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },
  spin: {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
  slideDown: {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  slideUp: {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  wiggle: {
    "0%, 100%": {
      transform: "rotate(-3deg)",
    },
    "50%": {
      transform: "rotate(3deg)",
    },
  },
  wiggleMore: {
    "0%, 100%": {
      transform: "rotate(-12deg)",
    },
    "50%": {
      transform: "rotate(12deg)",
    },
  },
  rotateY: {
    "0%": {
      transform: "rotateY(360deg)",
    },
    "100%": {
      transform: "rotateY(0)",
    },
  },
  rotateX: {
    "0%": {
      transform: "rotateX(360deg)",
    },
    "100%": {
      transform: "rotateX(0)",
    },
  },
  jump: {
    "0%, 100%": {
      transform: "scale(100%)",
    },
    "10%": {
      transform: "scale(80%)",
    },
    "50%": {
      transform: "scale(120%)",
    },
  },
  jumpIn: {
    "0%": {
      transform: "scale(0%)",
    },
    "80%": {
      transform: "scale(120%)",
    },
    "100%": {
      transform: "scale(100%)",
    },
  },
  jumpOut: {
    "0%": {
      transform: "scale(100%)",
    },
    "20%": {
      transform: "scale(120%)",
    },
    "100%": {
      transform: "scale(0%)",
    },
  },
  shake: {
    "0%": {
      transform: "translateX(0rem)",
    },
    "25%": {
      transform: "translateX(-1rem)",
    },
    "75%": {
      transform: "translateX(1rem)",
    },
    "100%": {
      transform: "translateX(0rem)",
    },
  },
  fade: {
    "0%": {
      opacity: "0",
    },
    "100%": {
      opacity: "1",
    },
  },
  fadeDown: {
    "0%": {
      opacity: "0",
      transform: "translateY(-2rem)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
  fadeUp: {
    "0%": {
      opacity: "0",
      transform: "translateY(2rem)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
  fadeLeft: {
    "0%": {
      opacity: "0",
      transform: "translateX(2rem)",
    },
    "100%": {
      opacity: "1",
      transform: "translateX(0)",
    },
  },
  fadeRight: {
    "0%": {
      opacity: "0",
      transform: "translateX(-2rem)",
    },
    "100%": {
      opacity: "1",
      transform: "translateX(0)",
    },
  },
  flipUp: {
    "0%": {
      transform: "rotateX(90deg)",
      transformOrigin: "bottom",
    },
    "100%": {
      transform: "rotateX(0)",
      transformOrigin: "bottom",
    },
  },
  flipDown: {
    "0%": {
      transform: "rotateX(-90deg)",
      transformOrigin: "top",
    },
    "100%": {
      transform: "rotateX(0)",
      transformOrigin: "top",
    },
  },
  overlayShow: {
    from: { opacity: "0" },
    to: { opacity: "1" },
  },
  contentShow: {
    from: { opacity: "0", transform: "translate(-50%, -48%) scale(0.96)" },
    to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
  },
  expandFromLeft: {
    from: { width: "0" },
    to: { width: "100%" },
  },
  slideIn: {
    from: {
      transform: "translateX(-100%)",
      zIndex: "0",
    },
    to: {
      transform: "translateX(0%)",
      zIndex: "1",
    },
  },
  typeWriter: {
    from: { width: "0" },
    to: { width: "100%" },
  },
  blinkingCursor: {
    from: { width: "0" },
    to: { width: "4px" },
  },
  blinkTextCursor: {
    from: { borderRightColor: "rgba(255,255,255,.75)" },
    to: { borderRightColor: "transparent" },
  },
  type: {
    "0%": { transform: "translateX(0ch)" },
    "5%, 10%": { transform: "translateX(1ch)" },
    "15%, 20%": { transform: "translateX(2ch)" },
    "25%, 30%": { transform: "translateX(3ch)" },
    "35%, 40%": { transform: "translateX(4ch)" },
    "45%, 50%": { transform: "translateX(5ch)" },
    "55%, 60%": { transform: "translateX(6ch)" },
    "65%, 70%": { transform: "translateX(7ch)" },
    "75%, 80%": { transform: "translateX(8ch)" },
    "85%, 90%": { transform: "translateX(9ch)" },
    "95%, 100%": { transform: "translateX(11ch)" },
  },
};

export const animations = {
  scaleIn: "scaleIn 200ms ease",
  expandFromLeftSlow: "expandFromLeft 1200ms ease",
  slideInSlow: "slideIn 1200ms ease",
  scaleOut: "scaleOut 200ms ease",
  fadeIn: "fadeIn 200ms ease",
  fadeOut: "fadeOut 200ms ease",
  enterFromLeft: "enterFromLeft 250ms ease",
  enterFromRight: "enterFromRight 250ms ease",
  enterFromLeftSlow: "enterFromLeft 700ms ease",
  enterFromRightSlow: "enterFromRight 700ms ease",
  exitToLeft: "exitToLeft 250ms ease",
  exitToRight: "exitToRight 250ms ease",
  slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  slideRightAndFade: "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  wiggle: "wiggle 1s both",
  wiggleMore: "wiggle-more 1s both",
  rotateY: "rotate-y 1s both",
  rotateX: "rotate-x 1s both",
  jump: "jump .5s both",
  jumpIn: "jump-in .5s both",
  jumpOut: "jump-out .5s both",
  shake: "shake .5s both",
  fade: "fade 1s both",
  fadeDown: "fade-down 1s both",
  fadeUp: "fade-up 1s both",
  fadeLeft: "fade-left 1s both",
  fadeRight: "fade-right 1s both",
  flipUp: "flip-up 1s both",
  flipDown: "flip-down 1s both",
  overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  typeWriter: "typeWriter 4s steps(44) 1s infinite normal both",
  blinkTextCursor: "blinkTextCursor 500ms steps(44) infinite normal",
  blinkCursor: "blinkingCursor 600ms steps(2) infinite normal",
  type: "type 2.7s ease-out .8s infinite alternate both",
};
