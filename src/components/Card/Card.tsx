import './Card.scss';

type CardProps = {
  card: {
    src: string;
    matched: boolean;
    id: number;
  };
  handleChoice: (card: { src: string; matched: boolean; id: number }) => void;
  flipped: boolean;
};

const Card = ({ card, handleChoice, flipped }: CardProps) => {
  const handleClick = () => {
    if (!flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={`container ${flipped ? 'flipped' : ''}`}>
        <img className="front" src={card.src} alt="card front" />
        <div className="back" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Card;
