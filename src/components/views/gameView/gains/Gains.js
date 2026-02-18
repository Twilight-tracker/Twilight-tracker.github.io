import Gain from "./Gain";
import gains from "../../../../data/gains.json";
import classes from "./Gains.module.css";

const Gains = ({ className }) => {
  return (
    <div className={className}>
      {Object.values(gains)
        .map(({ id: gainId }) => (
          <Gain key={gainId} className={classes.gain} gainId={gainId} />
        ))}
    </div>
  );
};

export default Gains;
