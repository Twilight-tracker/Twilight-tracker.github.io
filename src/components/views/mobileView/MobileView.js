import classes from "./MobileView.module.css";

const MobileView = () => {
  return (
  <div className={classes.main}>
    <div className={classes.header}></div>
    <div className={classes.objectives}></div>
    <div className={classes.secrets}></div>
  </div>
  );
};

export default MobileView;
