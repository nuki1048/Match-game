/* eslint-disable react/prop-types */
import "./Card.css";
// eslint-disable-next-line react/prop-types
const Card = ({ card, handleChoice, match, disabled }) => {
  //   const [isShow, setIsShow] = useState(false);
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={match ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          onClick={handleClick}
          className="back"
          src="/img/cover.png"
          alt="card back"
        />
      </div>
    </div>
  );
};

export default Card;
