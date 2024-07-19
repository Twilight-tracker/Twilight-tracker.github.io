import CardsView from "../components/views/cardsView/CardsView";

const CardsPage = () => {
  document.title = "Карты целей | Сумерки";
  return <CardsView onPage={true} />;
};

export default CardsPage;
