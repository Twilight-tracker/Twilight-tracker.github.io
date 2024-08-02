import { useFilter } from "../../../hooks/useFilter";
import { useOverlayContext } from "../../ui/Overlay";
import FilterSection from "./FilterSection";
import CardTable from "./CardTable";
import LinkButton from "../../ui/LinkButton";
import ScrollToTop from "../../Layout/ScrollToTop";

import classes from "./CardsView.module.css";

const CardsView = ({ onPage, filters: initialFilters, ...props }) => {
  const [filters, handler] = useFilter(initialFilters);
  const overlayProps = useOverlayContext();

  const scrollProps = onPage ? {} : { containerId: "scrollable-container" };
  return (
    <section className={classes.main}>
      {onPage && (
        <div className={classes.button}>
          <LinkButton to="/">⇐ Назад</LinkButton>
        </div>
      )}
      <FilterSection filters={filters} handler={handler} />
      <CardTable filters={filters} {...props} {...overlayProps}/>
      <ScrollToTop {...scrollProps} />
    </section>
  );
};

export default CardsView;
