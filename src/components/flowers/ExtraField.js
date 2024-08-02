import { useRef } from "react";
import { useLocale, useNumberField } from "react-aria";
import { useNumberFieldState } from "react-stately";
import { useStorage } from "../../hooks/useStorage";
import Button from "../ui/Button";
import HexedCanvas from "../svg/HexedCanvas";
import colors from "../../data/colors.json";
import { hexBase } from "../svg/constants";
import classes from "./ExtraField.module.css";

const ExtraField = ({ playerIndex, ...props }) => {
  const { storage, dispatch } = useStorage();
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

  const resizedBase = { ...hexBase, width: 800, height: 400 };

  return (
    <div className={classes.container} {...groupProps}>
      <input className={classes.input} {...inputProps} ref={inputRef} />
      <HexedCanvas className={classes.svg} hexBase={resizedBase}>
        <HexedCanvas.Hex className={classes.hex} fill="whitesmoke" />
        <Button {...decrementButtonProps}>
          <HexedCanvas.Leaf
            className={classes.button}
            leafType="backward"
            {...colorProps}
          />
        </Button>
        <Button {...incrementButtonProps}>
          <HexedCanvas.Leaf
            className={classes.button}
            leafType="forward"
            {...colorProps}
          />
        </Button>
      </HexedCanvas>
    </div>
  );
};

export default ExtraField;
