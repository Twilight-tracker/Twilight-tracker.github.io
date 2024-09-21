import { useState } from "react";
import { useStorage } from "../../../../hooks/useStorage";
import PointsTable from "../pointsTable/PointsTable";
import ThroneFlower from "./ThroneFlower";
import classes from "./ThroneSupports.module.css";

const ThroneSupports = ({ className }) => {
  const { storage, dispatch } = useStorage();
  const colors = storage.gameSettings.colors;

  const [selectedSupporter, setSelectedSupporter] = useState(-1);

  const onSelectSupporter = (supporterIndex) => {
    setSelectedSupporter(
      selectedSupporter === supporterIndex ? -1 : supporterIndex
    );
  };

  const onSelectReceiver = (event) => {
    dispatch("SET_THRONE_SUPPORT", {
      supporterIndex: selectedSupporter,
      receiverIndex: Number(event.target.id),
    });
    setSelectedSupporter(-1);
  };

  return (
    <div className={className}>
      <PointsTable.Header>Поддержка претендента</PointsTable.Header>
      <PointsTable.Block>
        {colors.map(({ colorId }, index) => (
          <ThroneFlower
            key={index}
            supporterIndex={index}
            colorId={colorId}
            selectedSupporter={selectedSupporter}
            onSelectSupporter={onSelectSupporter}
            onSelectReceiver={onSelectReceiver}
          />
        ))}
      </PointsTable.Block>
    </div>
  );
};

export default ThroneSupports;
