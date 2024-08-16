import PetalPath from "../svg/PetalPath";

const FlowerPath = ({
  petalClasses,
  petalClickHandlers,
  ...props
}) => {
  return (
    <>
      {[...Array(6).keys()].map((index) => {
        return (
          <PetalPath
            key={index}
            className={petalClasses[index]}
            id={index}
            playerIndex={index}
            onClick={petalClickHandlers?.[index]}
            {...props}
          />
        );
      })}
    </>
  );
};

export default FlowerPath;
