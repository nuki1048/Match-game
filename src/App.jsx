import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/Card";
const cardImages = [
  { src: "/img/helmet-1.png", match: false },
  { src: "/img/potion-1.png", match: false },
  { src: "/img/ring-1.png", match: false },
  { src: "/img/scroll-1.png", match: false },
  { src: "img/shield-1.png", match: false },
  { src: "/img/sword-1.png", match: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // shuffle cards

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffleCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((state) => {
          return state.map((item) => {
            if (item.src === choiceOne.src || item.src === choiceTwo.src) {
              return { ...item, match: true };
            } else {
              return item;
            }
          });
        });
        resetTurn();
      } else if (choiceOne.src !== choiceTwo.src) {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns((pvevTurns) => pvevTurns + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            match={card === choiceOne || card === choiceTwo || card.match}
            handleChoice={handleChoice}
            card={card}
            key={card.id}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
