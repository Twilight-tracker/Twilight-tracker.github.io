import objectives from "../../../../data/objectives.json";
import ObjectiveCard from "../../objectivesView/ObjectiveCard";
import Overlay from "../../../ui/Overlay";
import ScrollToTop from "../../../core/ScrollToTop";
import classes from "./SelectSecretsScreen.module.css";

const sortByTitle = (first, second) =>
  (first.title.value > second.title.value) -
  (first.title.value < second.title.value);

const SelectSecretsScreen = ({ onDiscard, onConfirm }) => {
  return (
    <Overlay
      className={classes.container}
      containerId="selectSecrets"
      onDiscard={onDiscard}
      onConfirm={onConfirm}
    >
      <div className={classes.main}>
        {Object.values(objectives)
          .filter((objective) => objective.stage === "secret")
          .sort(sortByTitle)
          .map((card) => (
            <ObjectiveCard
              key={card.id}
              cardId={card.id}
              onConfirm={onConfirm}
            />
          ))}
      </div>
      <ScrollToTop containerId="selectSecrets" />
    </Overlay>
  );
};

export default SelectSecretsScreen;
