import { useRef } from "react";
import { useButton } from "react-aria";
import LeafPath from "../svg/LeafPath";

const LeafButton = ({className, center, radius, fill, hoverFill, leafType, ...props}) => {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  const leafProps = {className, center, radius, fill, hoverFill, leafType};

  return (
      <LeafPath
        {...leafProps}
        {...buttonProps}
      />
  );
};

export default LeafButton;
