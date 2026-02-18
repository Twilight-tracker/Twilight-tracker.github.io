import { useStorage } from "../../../../hooks/useStorage";
import HexGrid from "../../../core/HexGrid";
import MecatolField from "./MecatolField";
import mecatolImage from "../../../../assets/mecatol.png";
import classes from "./Mecatol.module.css";

const Mecatol = ({ className }) => {
  const { storage } = useStorage();
  const colors = storage.gameSettings.colors;

  return (
    <div className={className}>
      <img
        className={classes.mecatol}
        src={mecatolImage}
        alt="Mecatol Rex"
      />
      <HexGrid className={classes.grid}>
        {[...Array(6).keys()].map((index) => (
          <HexGrid.Item key={index}>
            <MecatolField
              className={classes.field}
              colorId={colors[index].colorId}
              playerIndex={index}
            />
          </HexGrid.Item>
        ))}
      </HexGrid>
    </div>
  );
};

export default Mecatol;
