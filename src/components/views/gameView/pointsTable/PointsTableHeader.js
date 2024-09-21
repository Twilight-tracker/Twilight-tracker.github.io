import classes from "./PointsTableHeader.module.css";

const PointsTableHeader = ({ children }) => {
  return <div className={classes.main}>{children}</div>;
};

export default PointsTableHeader;
