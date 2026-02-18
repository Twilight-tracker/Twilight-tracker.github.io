import { useObjectivesFilter } from "../../../../hooks/useFilter";
import FilterSection from "../../../core/FilterSection";
import ScrollToTop from "../../../core/ScrollToTop";
import { useOverlayContext } from "../../../ui/Overlay";
import Overlay from "../../../ui/Overlay";
import ObjectivesTable from "../../objectivesView/ObjectivesTable";
import classes from "./ObjectivesScreen.module.css";

const ObjectivesScreen = ({
  filters: initialFilters,
  onDiscard,
  onConfirm,
}) => {
  const [filters, handler, data] = useObjectivesFilter(initialFilters);
  const overlayProps = useOverlayContext();

  return (
    <Overlay
      className={classes.container}
      containerId="objectives"
      onDiscard={onDiscard}
      onConfirm={onConfirm}
    >
      <div className={classes.main}>
        <FilterSection filters={filters} handler={handler} data={data} />
        <ObjectivesTable filters={filters} onConfirm={onConfirm} {...overlayProps} />
        <ScrollToTop containerId="objectives" />
      </div>
    </Overlay>
  );
};

export default ObjectivesScreen;
