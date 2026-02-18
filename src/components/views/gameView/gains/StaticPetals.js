import HexedCanvas from "../../../svg/HexedCanvas";
import classes from "./StaticPetals.module.css";

const petalList = [...Array(6).keys()];

const StaticPetals = ({ className, onClick }) => {
  const petalClasses = petalList.map((_) => classes.petal);
  const petalClickHandlers = petalList.map((_) => onClick);

  const hexBase = { width: 600, height: 520, radius: 200 };

  return (
    <div className={className}>
      <HexedCanvas className={classes.canvas} hexBase={hexBase}>
        <HexedCanvas.Flower
          petalClasses={petalClasses}
          petalClickHandlers={petalClickHandlers}
        />
      </HexedCanvas>
    </div>
  );
};

export default StaticPetals;
