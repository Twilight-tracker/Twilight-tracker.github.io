import { createContext, useContext, useState } from "react";
import classNames from "classnames/bind";
import ReactDOM from "react-dom";
import Backdrop from "../Layout/Backdrop";
import classes from "./Overlay.module.css";

const cx = classNames.bind(classes);

const OverlayContext = createContext();
export const useOverlayContext = () => useContext(OverlayContext);

const Overlay = ({ className, containerId, onDiscard, onConfirm, children }) => {
  const [removing, setRemoving] = useState(false);

  const discardHandler = () => {
    setTimeout(() => {
      setRemoving(false);
      onDiscard?.();
    }, 300);
    setRemoving(true);
  };

  const confirmHandler = (value) => {
    setTimeout(() => {
      setRemoving(false);
      onConfirm?.(value);
    }, 300);
    setRemoving(true);
  };

  const containerClass = cx(className, {
    enter: !removing,
    exit: removing,
  });

  const context = { onDiscard: discardHandler, onConfirm: confirmHandler };

  return (
    <>
      <Backdrop onClick={discardHandler} />
      {ReactDOM.createPortal(
        <div className={containerClass} id={`scrollable-container-${containerId}`}>
          <OverlayContext.Provider value={context}>
            {children}
          </OverlayContext.Provider>
        </div>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Overlay;
