import { useSecrets } from "../../../../hooks/useSecrets";
import ObjectiveCard from "../../objectivesView/ObjectiveCard";
import Overlay from "../../../ui/Overlay";
import ScrollToTop from "../../../core/ScrollToTop";
import classes from "./CurrentSecretsScreen.module.css";

const CurrentSecretsScreen = ({ onDiscard }) => {
  const secrets = useSecrets();

  return (
    <Overlay
      className={classes.container}
      containerId="secrets"
      onDiscard={onDiscard}
      onConfirm={onDiscard}
    >
      <div className={classes.main}>
        <div className={classes.header}>Секреты</div>
        <div className={classes.table}>
          {secrets.map(({ colorId, playerSecrets }) => (
            <div key={colorId} className={classes.column}>
              {playerSecrets.map((cardId) => (
                <ObjectiveCard key={cardId} cardId={cardId} colorId={colorId} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <ScrollToTop containerId="secrets" />
    </Overlay>
  );
};

export default CurrentSecretsScreen;
