import { useState } from "react";
import SvgCanvas from "../svg/SvgCanvas";
import HexPath from "../svg/HexPath";
import PetalPath from "../svg/PetalPath";
import ColorHexes from "../svg/ColorHexes";
import colors from "../../data/colors.json";

import classes from "./ColorPicker.module.css";

const defPetals = [
  { colorId: "_default" },
  { colorId: "_default" },
  { colorId: "_default" },
  { colorId: "_default" },
  { colorId: "_default" },
  { colorId: "_default" },
];

const ColorPicker = () => {
  const [petals, setPetals] = useState(defPetals);
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
    setPetals((list) => {
      const newPetals = list;
      newPetals[clicked] = { colorId: event.target.id };
      return newPetals;
    }, []);
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

  const baseParameters = { center: { x: 600, y: 520 }, radius: 200 };

  return (
    <SvgCanvas className={classes.canvas} viewbox="0 0 1200 1040">
      <HexPath {...baseParameters} fill="#000080" />
      {petals.map((petal, index) => {
        const color = colors[petal.colorId];
        return (
          <PetalPath
            key={index}
            id={index}
            {...baseParameters}
            className={classes.clickable}
            fill={color.color}
            hoverFill={color.hoverColor}
            onClick={petalClickHandler}
            step={index}
          />
        );
      })}
      {clicked !== -1 && (
        <ColorHexes
          className={`${classes.clickable} ${
            removing ? classes.exit : classes.enter
          }`}
          step={clicked}
          {...baseParameters}
          onClick={colorPickHandler}
        />
      )}
    </SvgCanvas>
  );
};

export default ColorPicker;
