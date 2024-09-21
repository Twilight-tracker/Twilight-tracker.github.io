import classes from "./HexGridItem.module.css";

const HexGridItem = ({ className, children }) => {
  return (
    <div className={classes.item}>
      <div className={className}>{children}</div>
    </div>
  );
};

export default HexGridItem;
