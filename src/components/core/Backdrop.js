import ReactDOM from "react-dom";
import classes from "./Backdrop.module.css";

const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={onClick} />,
    document.getElementById("backdrop-root")
  );
};

export default Backdrop;
