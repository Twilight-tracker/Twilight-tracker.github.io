import Checkbox from "../../ui/Checkbox";
import classes from "./FilterSection.module.css";

const data = [
  [
    { name: "stage1", label: "Цели I этапа" },
    { name: "stage2", label: "Цели II этапа" },
    { name: "secret", label: "Секретные цели" },
  ],
  [
    { name: "status", label: "Фаза статуса" },
    { name: "action", label: "Фаза действий" },
    { name: "agenda", label: "Фаза политики" },
  ],
  [
    { name: "main", label: "Базовая игра" },
    { name: "pok", label: "Пророчество королей" },
    { name: "omega", label: "Омега-карты" },
  ],
];

const FilterSection = ({ filters, handler }) => {
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
