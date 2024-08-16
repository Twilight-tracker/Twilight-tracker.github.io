import { useStopwatch, useTime } from "react-timer-hook";
import classes from "./Timer.module.css";

const Timer = ({ className, dateBefore }) => {
  let props = { autoStart: true };
  if (dateBefore !== -1) {
    const offset = Date.now() - dateBefore;
    const offsetTimestamp = new Date();
    offsetTimestamp.setMilliseconds(offsetTimestamp.getMilliseconds() + offset);
    props = { ...props, offsetTimestamp };
  }
  const stopwatch = useStopwatch(props);
  const time = useTime();

  const dateLine =
    dateBefore === -1
      ? [
          ("00" + time.hours).slice(-2),
          ("00" + time.minutes).slice(-2),
          ("00" + time.seconds).slice(-2),
        ].join(":")
      : "+" +
        [
          ("00" + stopwatch.hours).slice(-2),
          ("00" + stopwatch.minutes).slice(-2),
          ("00" + stopwatch.seconds).slice(-2),
        ].join(":");
  return (
    <div className={className}>
      <div className={classes.main}>
        <div className={classes.date}>{dateLine}</div>
      </div>
    </div>
  );
};

export default Timer;
