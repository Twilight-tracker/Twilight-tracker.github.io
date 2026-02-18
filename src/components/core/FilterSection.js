import Checkbox from "../ui/Checkbox";
import classes from "./FilterSection.module.css";

const FilterSection = ({ filters, handler, data }) => {
  const getHandler = (name) => () => handler(name);
  return (
    <div className={classes.main}>
      {data.map((block, index) => (
        <div key={index} className={classes.block}>
          {block.map(({ name, label }) => (
            <Checkbox
              key={name}
              name={name}
              label={label}
              defaultChecked={filters[name]}
              onClick={getHandler(name)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
