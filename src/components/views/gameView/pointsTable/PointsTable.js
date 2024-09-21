import Secrets from "../secrets/Secrets";
import ExtraPoints from "./ExtraPoints";
import ThroneSupports from "../throneSupports/ThroneSupports";
import PointsTableBlock from "./PointsTableBlock";
import PointsTableHeader from "./PointsTableHeader";
import classes from "./PointsTable.module.css";

const PointsTable = ({ className }) => {
  return (
    <div className={className}>
      <div className={classes.main}>
        <Secrets className={classes.secrets} />
        <ThroneSupports className={classes.throneSupports} />
        <ExtraPoints className={classes.extraPoints} />
      </div>
    </div>
  );
};

PointsTable.Header = PointsTableHeader;
PointsTable.Block = PointsTableBlock;

export default PointsTable;
