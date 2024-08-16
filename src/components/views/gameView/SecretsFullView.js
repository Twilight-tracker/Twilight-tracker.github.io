import Overlay from "../../ui/Overlay";
import SecretsTable from "./SecretsTable";
import ScrollToTop from "../../Layout/ScrollToTop";
import classes from "./SecretsFullView.module.css";

const SecretsFullView = ({ onDiscard }) => {
  return (
    <Overlay
      className={classes.container}
      containerId="secrets"
      onDiscard={onDiscard}
      onConfirm={onDiscard}
    >
      <SecretsTable className={classes.table} />
      <ScrollToTop containerId="secrets" />
    </Overlay>
  );
};

export default SecretsFullView;
