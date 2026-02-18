import { useSettingsContext } from "../settingsView/SettingsView";
import { factionsAssets } from "../../../assets/factions";
import factions from "../../../data/factions.json";
import classNames from "classnames/bind";
import classes from "./FactionsView.module.css";

const cx = classNames.bind(classes);

const expansions = { main: 0, te: 1 };
const sortByExpansionAndName = (first, second) =>
            (expansions[first.expansion] - expansions[second.expansion]) * 10 +
            (first.name.value > second.name.value) -
            (first.name.value < second.name.value);

const sortedFactions = Object.values(factions)
  .filter((faction) => faction.available)
  .sort(sortByExpansionAndName);

const FactionsView = ({ className }) => {
  const { playerActivated, setFaction } = useSettingsContext() ?? {
    playerActivated: -1,
    setFaction: undefined,
  };

  const portraitClass = cx({
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
    <div className={className}>
      <div className={classes.main}>
        {sortedFactions.map((faction) => {
          const { id } = faction;
          const { portrait, icon } = factionsAssets[id];
          const { src: portraitSrc, alt: portraitAlt } = portrait;
          const { src: iconSrc, alt: iconAlt } = icon;
          return (
            <div key={id} id={id} className={classes.item} {...clickProps}>
              <img
                className={portraitClass}
                id={id}
                src={portraitSrc}
                alt={portraitAlt}
              />
              <div id={id} className={labelClass}>
                <img
                  className={classes.icon}
                  id={id}
                  src={iconSrc}
                  alt={iconAlt}
                />
                <div className={classes.name} id={id}>
                  {faction.name.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FactionsView;
