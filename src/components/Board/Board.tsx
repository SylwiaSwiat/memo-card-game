import './Board.scss';
import Card from '../Card/Card';

type CardType = {
  src: string;
  matched: boolean;
  id: number;
};

type BoardProps = {
  cards: CardType[];
  handleChoice: (card: CardType) => void;
  flippedCards: CardType[];
};

const Board = ({ cards, handleChoice, flippedCards }: BoardProps) => {
  return (
    <div className="board">
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={flippedCards.includes(card) || card.matched}
        />
      ))}
    </div>
  );
};

export default Board;