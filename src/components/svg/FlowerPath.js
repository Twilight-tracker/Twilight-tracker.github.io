import PetalPath from "../svg/PetalPath";

const FlowerPath = ({ petalProps, onPetalClick, ...props }) => {
  const onClickProps = onPetalClick
    ? (index) => ({
        onClick: () => {
          onPetalClick(index);
        },
      })
    : (_) => {};
  return (
    <>
      {petalProps.map((petal, index) => {
        return (
          <PetalPath
            key={index}
            id={index}
            playerIndex={index}
            {...onClickProps(index)}
            {...props}
            {...petal}
          />
        );
      })}
    </>
  );
};

export default FlowerPath;
