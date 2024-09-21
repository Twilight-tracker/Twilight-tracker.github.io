import HexGridItem from "./HexGridItem";
import classes from "./HexGrid.module.css";

const HexGrid = ({ className, children }) => {
  return (
    <div className={className}>
      <div className={classes.grid}>{children}</div>
    </div>
  );
};

HexGrid.Item = HexGridItem;

export default HexGrid;
