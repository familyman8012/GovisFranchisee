import { breakpoints } from "@ComponentFarm/common";
import { useMediaQuery } from "react-responsive";

const useReponsive = () => {
  return {
    isMobile: useMediaQuery({ maxWidth: breakpoints[2] - 1 }),
  } as const;
};

export default useReponsive;
