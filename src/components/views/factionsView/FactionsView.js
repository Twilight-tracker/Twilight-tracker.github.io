import { useSettingsContext } from "../settngsView/SettingsView";
import { factionsAssets } from "../../../assets/factions";
import factions from "../../../data/factions.json";
import classNames from "classnames/bind";
import classes from "./FactionsView.module.css";

const cx = classNames.bind(classes);
const sortedFactions = Object.values(factions)
  .filter((faction) => faction.id[0] !== "_")
  .sort(
    (first, second) =>
      (first.name.value > second.name.value) -
      (first.name.value < second.name.value)
  );

const FactionsView = ({ className }) => {
  const { playerActivated, setFaction } = useSettingsContext() ?? {
    playerActivated: -1,
    setFaction: undefined,
  };

  const imageClass = cx({
    image: true,
    imageActive: playerActivated > -1,
    imageInactive: playerActivated === -1,
  });

  const labelClass = cx({
    label: true,
    labelActive: playerActivated > -1,
  });

  const clickProps =
    playerActivated > -1
      ? { onClick: (event) => setFaction(event.target.id) }
      : {};

  return (
    <div className={className ?? classes.main}>
      {sortedFactions.map((faction) => (
        <div key={faction.id} className={classes.item}>
          <img
            className={imageClass}
            id={faction.id}
            {...factionsAssets[faction.id]}
            {...clickProps}
          />
          <div id={faction.id} className={labelClass} {...clickProps}>
            {faction.name.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FactionsView;
