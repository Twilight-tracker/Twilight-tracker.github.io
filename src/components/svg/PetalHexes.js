import HexPath from "./HexPath";
import { useHexedCanvasContext } from "./HexedCanvas";

const adjustFirstPlayerToTop = -2;

const PetalHexes = ({
  petalClasses,
  petalClickHandlers,
  spreadRadius,
  hexRadius,
  ...props
}) => {
  const { width, height } = useHexedCanvasContext();
  const center = { x: 0.5 * width, y: 0.5 * height };

  return (
    <>
      {[...Array(6).keys()].map((index) => {
        const alpha = ((index + adjustFirstPlayerToTop + 0.5) * Math.PI) / 3;

        const hexCenter = {
          x: center.x + spreadRadius * Math.cos(alpha),
          y: center.y + spreadRadius * Math.sin(alpha),
        };

        return (
          <HexPath
            className={petalClasses[index]}
            key={index}
            {...props}
            center={hexCenter}
            radius={hexRadius}
            onClick={petalClickHandlers[index]}
          />
        );
      })}
    </>
  );
};

export default PetalHexes;
