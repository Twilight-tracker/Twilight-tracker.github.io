import { useObjectivesFilter } from "../../../hooks/useFilter";
import { useOverlayContext } from "../../ui/Overlay";
import FilterSection from "../../core/FilterSection";
import ScrollToTop from "../../core/ScrollToTop";
import ObjectivesTable from "./ObjectivesTable";
import LinkButton from "../../ui/LinkButton";
import classes from "./ObjectivesView.module.css";

const ObjectivesView = () => {
  const [filters, handler, data] = useObjectivesFilter();
  const overlayProps = useOverlayContext();

  return (
    <div className={classes.main}>
      <div className={classes.button}>
        <LinkButton to="/">⇐ Назад</LinkButton>
      </div>
      <FilterSection filters={filters} handler={handler} data={data} />
      <ObjectivesTable filters={filters} {...overlayProps} />
      <ScrollToTop />
    </div>
  );
};

export default ObjectivesView;
