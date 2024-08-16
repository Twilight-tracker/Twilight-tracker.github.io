import ExtraField from "../../flowers/ExtraField";
import classes from "./ExtraPoints.module.css";

const ExtraPoints = ({className}) => {
  return (
    <div className={className}>
      {[...Array(6).keys()].map((index) => (
        <ExtraField
          className={classes.field}
          key={index}
          playerIndex={index}
          defaultValue={0}
          aria-label="extra points"
        />
      ))}
    </div>
  );
};

export default ExtraPoints;
