import './GameHistory.scss';

type GameHistoryProps = {
  gameHistory: GameResult[];
  results: number;
};

export type GameResult = {
  attempts: number;
  gameDuration: number;
  date: string;
};

const GameHistory = ({ gameHistory, results }: GameHistoryProps) => {
  return (
    <div>
      <h2>Game History</h2>
      <ul>
        {gameHistory.length > 0 ? gameHistory.slice(-results).map((game, index) => (
          <li key={index} className="result">
            Date: {game.date}, Attempts: {game.attempts}, Duration: {Math.floor(game.gameDuration / 60)} min {game.gameDuration % 60} sec
          </li>
        )) : <p>No game history available</p>}
      </ul>
    </div>
  );
};

export default GameHistory;
