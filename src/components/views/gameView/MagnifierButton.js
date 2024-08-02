import classNames from "classnames/bind";
import { useGameViewContext } from "./GameView";
import Magnifier from "../../svg/Magnifier";
import classes from "./MagnifierButton.module.css";

const cx = classNames.bind(classes);

const MagnifierButton = ({ className }) => {
  const { magnifierActive, setMagnifierActive } = useGameViewContext();

  const buttonClass = cx({
    button: true,
    active: magnifierActive,
    inactive: !magnifierActive,
  });

  return (
    <div className={className}>
      <div
        className={buttonClass}
        onClick={() => setMagnifierActive((val) => !val)}
      >
        <Magnifier />
      </div>
    </div>
  );
};

export default MagnifierButton;
