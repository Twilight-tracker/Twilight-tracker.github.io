import UpArrowSvg from "./UpArrowSvg";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import classes from "./ScrollToTop.module.css";

const ScrollToTop = ({ containerId }) => {
  const params = {
    containerId: containerId ? `scrollable-container-${containerId}` : undefined,
    behavior: "smooth",
  }
  const [showButton, scrollMethod] = useScrollToTop(params);

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
