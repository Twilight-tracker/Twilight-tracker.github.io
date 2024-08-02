import { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Layout/Backdrop";
import classes from "./Overlay.module.css";

const OverlayContext = createContext();

export const useOverlayContext = () => {
  return useContext(OverlayContext);
};

const Overlay = ({ className, onDiscard, onConfirm, children }) => {
  const [removing, setRemoving] = useState(false);

  const discardHandler = () => {
    setTimeout(() => {
      setRemoving(false);
      onDiscard();
    }, 300);
    setRemoving(true);
  };

  const confirmHandler = (cardId) => {
    setTimeout(() => {
      setRemoving(false);
      onConfirm(cardId);
    }, 300);
    setRemoving(true);
  };

  const context = { onDiscard: discardHandler, onConfirm: confirmHandler };

  return (
    <>
      <Backdrop onClick={discardHandler} />
      {ReactDOM.createPortal(
        <div
          className={[className, removing ? classes.exit : classes.enter].join(
            " "
          )}
          id="scrollable-container"
        >
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
