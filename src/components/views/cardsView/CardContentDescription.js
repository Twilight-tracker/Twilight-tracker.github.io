import classes from "./CardContentDescription.module.css";

const CardContentDescription = ({ className, card }) => {
  return (
    <div className={[className, classes.block].join(" ")}>
      <div className={classes.shape}></div>
      <div className={classes.inline}>
        <div className={classes.value}>{card.description.value}</div>
        {card.extra && <div className={classes.extra}>{card.extra.value}</div>}
      </div>
    </div>
  );
};

export default CardContentDescription;
