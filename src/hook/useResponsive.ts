import { breakpoints } from "@ComponentFarm/common";
import { useMediaQuery } from "react-responsive";

const useReponsive = () => {
  return {
    isMobile: useMediaQuery({ maxWidth: breakpoints[1] - 1 }),
  } as const;
};

export default useReponsive;
