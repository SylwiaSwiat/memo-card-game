import { useEffect, useState } from 'react';
import { GameResult } from '../components/GameHistory/GameHistory';

export const useGameHistory = () => {
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('gameHistory');
    if (storedHistory) {
      setGameHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addGameResult = (gameResult: GameResult) => {
    const updatedHistory = [...gameHistory, gameResult];
    setGameHistory(updatedHistory);
    localStorage.setItem('gameHistory', JSON.stringify(updatedHistory));
  };

  return { gameHistory, addGameResult };
};
