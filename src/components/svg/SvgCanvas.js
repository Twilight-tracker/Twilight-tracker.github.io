const SvgCanvas = ({ className, viewbox, children, ...props }) => {
  return (
    <svg
      {...props}
      className={className}
      viewBox={viewbox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default SvgCanvas;
