import SecretFlower from "../../flowers/SecretFlower";
import classes from "./ExtraPoints.module.css";

const ExtraPoints = () => {
  return (
    <div className={classes.main}>
      {[...Array(6).keys()].map((index) => (
        <SecretFlower key={index} playerIndex={index} />
      ))}
    </div>
  );
};

export default ExtraPoints;
