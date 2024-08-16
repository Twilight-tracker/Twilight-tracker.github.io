import { useSecrets } from "../../../hooks/useSecrets";
import HexCard from "../cardsView/HexCard";
import classes from "./SecretsTable.module.css";

const SecretsTable = ({ className }) => {
  const secrets = useSecrets();

  return (
    <section className={className}>
      <div className={classes.table}>
        {secrets.map(({ colorId, playerSecrets }) => (
          <div key={colorId} className={classes.column}>
            {playerSecrets.map((cardId) => (
              <HexCard key={cardId} cardId={cardId} colorId={colorId} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecretsTable;
