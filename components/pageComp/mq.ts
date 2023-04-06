export const breakpoints = [544, 768, 1024];
// export const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

// $mobile-width: 544px;
// $tablet-width: 768px;
// $big-tablet-width: 1024px;

export const mq = breakpoints.map(
  (bp, i) =>
    `${
      bp > 544
        ? `@media (min-width:${breakpoints[i - 1]}px) and (max-width: ${breakpoints[i]}px)`
        : `@media (max-width: ${bp}px)`
    }`
);
