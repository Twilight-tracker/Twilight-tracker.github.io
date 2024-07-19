import { useState } from "react";
import SvgCanvas from "../../svg/SvgCanvas";
import HexPath from "../../svg/HexPath";
import PetalPath from "../../svg/PetalPath";
import ColorHexes from "../../svg/ColorHexes";
import colors from "../../../data/colors.json";
import { useStorage } from "../../../hooks/useStorage";

import classes from "./ColorPicker.module.css";

const ColorPicker = () => {
  const [storage, dispatch] = useStorage();
  const petals = storage.gameSettings.colors;
  const [clicked, setClicked] = useState(-1);
  const [removing, setRemoving] = useState(false);

  const petalClickHandler = (event) => {
    setClicked((value) => {
      const newValue = Number(event.target.id);
      if (value === -1) {
        return newValue;
      }
      setTimeout(() => {
        if (value !== newValue) {
          setTimeout(() => setClicked(newValue), 1);
        }
        setRemoving(false);
        setClicked(-1);
      }, 100);
      setRemoving(true);
      return value;
    }, []);
    event.preventDefault();
  };

  const colorPickHandler = (event) => {
    dispatch("SET_COLOR", { position: clicked, colorId: event.target.id });
    setClicked((value) => {
      setTimeout(() => {
        setRemoving(false);
        setClicked(-1);
      }, 100);
      setRemoving(true);
      return value;
    });
    event.preventDefault();
  };

  const baseParameters = { center: { x: 520, y: 600 }, radius: 200 };

  return (
    <SvgCanvas className={classes.canvas} viewbox="0 0 1040 1200">
      <HexPath {...baseParameters} fill="#000080" />
      {petals.map((petal, index) => {
        const color = colors[petal.colorId];
        return (
          <PetalPath
            key={index}
            id={index}
            className={classes.clickable}
            {...baseParameters}
            fill={color.color}
            hoverFill={color.hoverColor}
            onClick={petalClickHandler}
            playerIndex={index}
          />
        );
      })}
      {clicked !== -1 && (
        <ColorHexes
          className={`${classes.clickable} ${
            removing ? classes.exit : classes.enter
          }`}
          {...baseParameters}
          playerIndex={clicked}
          onClick={colorPickHandler}
        />
      )}
    </SvgCanvas>
  );
};

export default ColorPicker;
