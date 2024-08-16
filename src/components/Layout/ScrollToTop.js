import UpArrowSvg from "./UpArrowSvg";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import classes from "./ScrollToTop.module.css";

const ScrollToTop = ({ containerId }) => {
  const [showButton, scrollMethod] = useScrollToTop({
    containerId: `scrollable-container-${containerId}`,
    behavior: "smooth",
  });

  if (showButton) {
    return (
      <div onClick={scrollMethod} className={classes.container}>
        <UpArrowSvg className={classes.svg} />
      </div>
    );
  }
  return <></>;
};

export default ScrollToTop;
