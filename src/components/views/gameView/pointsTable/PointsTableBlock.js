import classes from "./PointsTableBlock.module.css";

const PointsTableBlock = ({ children }) => {
  return <div className={classes.main}>{children}</div>;
};

export default PointsTableBlock;
