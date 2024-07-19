import { Link } from "react-router-dom";
import classes from "./LinkButton.module.css";
import buttons from "./buttons.module.css";

const LinkButton = ({ to, className, children, ...props }) => {
  return (
    <Link to={to} className={classes.link}>
      <div className={[classes.button, className ?? buttons.blue].join(" ")} {...props}>
        {children}
      </div>
    </Link>
  );
};

export default LinkButton;
