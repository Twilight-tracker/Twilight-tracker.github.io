import { useStopwatch, useTime } from "react-timer-hook";
import classes from "./Timer.module.css";

const addLeadingZeros = (value) => ("00" + value).slice(-2);

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
      ? [time.hours, time.minutes, time.seconds]
          .map((value) => addLeadingZeros(value))
          .join(":")
      : "+" +
        [stopwatch.hours, stopwatch.minutes, stopwatch.seconds]
          .map((value) => addLeadingZeros(value))
          .join(":");
  return (
    <div className={className}>
      <div className={classes.main}>
        <div className={classes.date}>{dateLine}</div>
      </div>
    </div>
  );
};

export default Timer;
