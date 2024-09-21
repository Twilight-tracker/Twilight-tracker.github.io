import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { useTotalPoints } from "../../hooks/useTotalPoints";
import { factionsAssets } from "../../assets/factions";
import classes from "./Background.module.css";
import colorClasses from "../../data/colors.module.css";

const cx = classNames.bind(classes);

const Background = () => {
  const { pathname } = useLocation();
  const showLeader = pathname === "/game";
  const [stableLeader, setStableLeader] = useState({ leader: -1 });
  const [exitState, setExitState] = useState(false);
  const { leader } = useTotalPoints();

  if (
    stableLeader.index !== leader.index ||
    stableLeader.colorId !== leader.colorId ||
    stableLeader.factionId !== leader.factionId
  ) {
    if (stableLeader.index === -1) {
      setStableLeader(leader);
    } else if (exitState !== true) {
      setTimeout(() => {
        setExitState(false);
        setStableLeader(leader);
      }, 500);
      setExitState(true);
    }
  }

  const backgroundClass = cx({
    background: true,
    [colorClasses[stableLeader.colorId]]: showLeader && stableLeader.index > -1,
    gradient: showLeader && stableLeader.index > -1,
    gradientEnter: showLeader && !exitState && stableLeader.index > -1,
    gradientExit: showLeader && exitState,
  });

  const factionClass = cx({
    faction: true,
    factionEnter: !exitState,
    factionExit: exitState,
  });

  return (
    <div className={classes.main}>
      <div className={backgroundClass}>
        {showLeader && stableLeader.index > -1 && (
          <img
            className={factionClass}
            src={factionsAssets[stableLeader.factionId].portrait.src}
            alt={factionsAssets[stableLeader.factionId].portrait.alt}
          />
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Background;
