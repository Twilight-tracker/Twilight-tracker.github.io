import Relic from "./Relic";
import relics from "../../../../data/relics.json";
import classes from "./Relics.module.css";

const Relics = ({ className }) => {
  return (
    <div className={className}>
      {Object.keys(relics).map((relicId) => (
        <Relic key={relicId} className={classes.relic} relicId={relicId} />
      ))}
    </div>
  );
};

export default Relics;
