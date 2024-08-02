import { createContext, useContext } from "react";
import HexPath from "./HexPath";
import PetalPath from "./PetalPath";
import FlowerPath from "./FlowerPath";
import LeafPath from "./LeafPath";
import ColorHexes from "./ColorHexes";
import PlusPath from "./PlusPath";

const HexedCanvasContext = createContext();

export const useHexedCanvasContext = () => {
  const context = useContext(HexedCanvasContext);
  if (!context) {
    throw Error(
      "HexedCanvas-related components must be wrapped with <HexCanvas>."
    );
  }
  return context;
};

const HexedCanvas = ({ className, hexBase, children, ...props }) => {
  const { width, height } = hexBase;
  const viewbox = `0 0 ${width} ${height}`;

  return (
    <HexedCanvasContext.Provider value={hexBase}>
      <svg
        {...props}
        className={className}
        viewBox={viewbox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </HexedCanvasContext.Provider>
  );
};

HexedCanvas.Hex = HexPath;
HexedCanvas.Petal = PetalPath;
HexedCanvas.Flower = FlowerPath;
HexedCanvas.Leaf = LeafPath;
HexedCanvas.ColorHexes = ColorHexes;
HexedCanvas.Plus = PlusPath;

export default HexedCanvas;
