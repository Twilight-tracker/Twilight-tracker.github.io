import { Outlet } from "react-router-dom";
import classes from "./Background.module.css";

const Background = () => {
  return (
    <div className={classes.main}>
      <div className={classes.background}/>
      <Outlet />
      <a
        className={classes.attribution}
        href="https://www.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_39674698.htm"
        target="_blank"
        rel="noopener noreferrer"
      >
        Image by benzoix on Freepik
      </a>
    </div>
  );
};

export default Background;
