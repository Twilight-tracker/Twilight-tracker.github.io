import { useTime } from "react-timer-hook";
import classes from "./Clock.module.css";

const Clock = ({ className }) => {
  const { minutes, hours } = useTime();

  return (
    <div className={className}>
      <div className={classes.main}>
        {[
          ("00" + hours).slice(-2),
          ("00" + minutes).slice(-2),
        ].join(":")}
      </div>
    </div>
  );
};

export default Clock;
