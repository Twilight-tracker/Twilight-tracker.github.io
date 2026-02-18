import classes from "./ObjectiveCardTitle.module.css";

const ObjectiveCardTitle = ({ className, children }) => {
  return (
    <div className={className}>
      <div className={classes.title}>
        <div className={classes.shape}></div>
        <div className={classes.children}>{children}</div>
      </div>
    </div>
  );
};

export default ObjectiveCardTitle;
