import classes from "./Checkbox.module.css";

const Checkbox = ({ name, label, defaultChecked, onClick }) => {
  return (
    <div className={classes.main}>
      <input
        type="checkbox"
        id={name}
        name={name}
        className={classes.checkbox}
        onClick={onClick}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;
