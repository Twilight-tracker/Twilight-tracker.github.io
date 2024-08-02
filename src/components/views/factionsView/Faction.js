import React from "react";

const Faction = ({ faction }) => {
  return (
    <div className={classes.item}>
      <img
        className={imageClass}
        id={faction.id}
        src={asset.path}
        alt={asset.alt}
        {...clickProps}
      />
      <div id={faction.id} className={labelClass} {...clickProps}>
        {faction.name.value}
      </div>
    </div>
  );
};

export default Faction;
