import { useRef } from "react";
import { useLocale, useNumberField } from "react-aria";
import { useNumberFieldState } from "react-stately";
import { useStorage } from "../../hooks/useStorage";
import SvgCanvas from "../svg/SvgCanvas";
import HexPath from "../svg/HexPath";
import LeafButton from "./LeafButton";
import colors from "../../data/colors.json";
import { baseParameters } from "../svg/constants";
import classes from "./ExtraField.module.css";

const ExtraField = ({ playerIndex, ...props }) => {
  const [storage, dispatch] = useStorage();
  const colorId = storage.gameSettings.colors[playerIndex].colorId;
  const color = colors[colorId];
  const colorProps = {
    fill: `color-mix(in srgb, ${color.color} 90%, transparent)`,
    hoverFill: color.hoverColor,
  };
  const value = storage.gameState.extraPoints[playerIndex];
  const onChange = (value) =>
    dispatch("SET_EXTRA_POINTS", { playerIndex, value });

  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale, value, onChange });
  const inputRef = useRef(null);
  const { groupProps, inputProps, incrementButtonProps, decrementButtonProps } =
    useNumberField({ ...props, value, onChange }, state, inputRef);

  const parameters = { ...baseParameters, center: { x: 400, y: 200 } };

  return (
    <div className={classes.container} {...groupProps}>
      <input className={classes.input} {...inputProps} ref={inputRef} />
      <SvgCanvas viewbox="0 0 800 400" className={classes.svg}>
        <HexPath className={classes.hex} fill="whitesmoke" {...parameters} />
        <LeafButton
          className={classes.button}
          leafType="backward"
          {...parameters}
          {...colorProps}
          {...decrementButtonProps}
        />
        <LeafButton
          className={classes.button}
          leafType="forward"
          {...parameters}
          {...colorProps}
          {...incrementButtonProps}
        />
      </SvgCanvas>
    </div>
  );
};

export default ExtraField;
