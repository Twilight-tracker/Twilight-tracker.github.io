import { createContext, useContext, useRef } from "react";
import { useButton } from "react-aria";

const ButtonContext = createContext();
export const useButtonContext = () => useContext(ButtonContext);

const Button = ({ children, ...props }) => {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);

  return (
    <ButtonContext.Provider value={buttonProps}>
      {children}
    </ButtonContext.Provider>
  );
};

export default Button;
