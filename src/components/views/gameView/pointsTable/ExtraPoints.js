import PointsTable from "./PointsTable";
import ExtraField from "../flowers/ExtraField";
import classes from "./ExtraPoints.module.css";

const ExtraPoints = ({ className }) => {
  return (
    <div className={className}>
      <PointsTable.Header>Экстра</PointsTable.Header>
      <PointsTable.Block>
        {[...Array(6).keys()].map((index) => (
          <ExtraField
            className={classes.field}
            key={index}
            playerIndex={index}
          />
        ))}
      </PointsTable.Block>
    </div>
  );
};

export default ExtraPoints;
