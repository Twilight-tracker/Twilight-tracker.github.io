import { useRef } from "react";
import { useLocale, useNumberField } from "react-aria";
import { useNumberFieldState } from "react-stately";
import classNames from "classnames/bind";
import Button from "../../../ui/Button";
import HexedCanvas from "../../../svg/HexedCanvas";
import classes from "./PlayerNumberField.module.css";
import colors from "../../../../data/colors.module.css";

const cx = classNames.bind(classes);

const PlayerNumberField = ({ className, colorId, value, onChange, ...props }) => {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale, value, onChange });
  const inputRef = useRef(null);
  const { groupProps, inputProps, incrementButtonProps, decrementButtonProps } =
    useNumberField({ ...props, value, onChange }, state, inputRef);

  const resizedBase = { width: 800, height: 400, radius: 200 };

  const containerClass = cx({
    container: true,
    [colors[colorId]]: true,
  });

  return (
    <div className={className}>
      <div className={containerClass} {...groupProps}>
        <input className={classes.input} {...inputProps} ref={inputRef} />
        <HexedCanvas className={classes.svg} hexBase={resizedBase}>
          <HexedCanvas.Hex className={classes.hex} />
          <Button {...decrementButtonProps}>
            <HexedCanvas.Leaf className={classes.button} leafType="backward" />
          </Button>
          <Button {...incrementButtonProps}>
            <HexedCanvas.Leaf className={classes.button} leafType="forward" />
          </Button>
        </HexedCanvas>
      </div>
    </div>
  );
};

export default PlayerNumberField;
