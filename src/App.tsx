import 'normalize.css';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import Board from './components/Board/Board';
import Level from './components/Level/Level';
import { useGameStore } from './components/useGameStore';
import { useGameLogic } from './hooks/useMemoryGame';
import { useGameHistory } from './hooks/useGameHistory';
import Timer from './components/Timer/Timer';
import Attempts from './components/Attempts/Attempts';
import Header from './components/Header/Header';
import GameHistory from './components/GameHistory/GameHistory';
import WinMessage from './components/WinMessage/WinMessage';

const levelOptions = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  champion: 'Champion',
};

const flipSound = new Audio('/flipcard.mp3');
const successSound = new Audio('/success.mp3');
const winSound = new Audio('/win.mp3');

function App() {
  const [level, setLevel] = useState(8);
  const { cards, handleChoice, attempts, timer, shuffleCards, revealedTiles } = useGameLogic(level);
  const { gameHistory, addGameResult } = useGameHistory();
  const [showWinMessage, setShowWinMessage] = useState(false);

  const matchPlayedRef = useRef(false);
  const winPlayedRef = useRef(false);
  const previousMatchedCountRef = useRef(0);

  const handleLevel = (levelName: string) => {
    setLevel(levelName === levelOptions.easy ? 8 : levelName === levelOptions.medium ? 10 : levelName === levelOptions.hard ? 12 : 20);
  };

  useEffect(() => {
    previousMatchedCountRef.current = 0;
    matchPlayedRef.current = false;
    winPlayedRef.current = false;
  }, [shuffleCards, level]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      useGameStore.getState().stopTimer();
      const currentDate = new Date().toLocaleDateString();
      const gameDuration = timer;

      const gameResult = { attempts, gameDuration, date: currentDate };
      addGameResult(gameResult);
      setTimeout(() => {
        setShowWinMessage(true);
      }, 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, attempts, timer]);

  useEffect(() => {
    if (revealedTiles.length > 0) {
      flipSound.play();
    }
  }, [revealedTiles]);

  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every(card => card.matched);
    const currentMatchedCount = cards.filter(card => card.matched).length;

    if (currentMatchedCount > previousMatchedCountRef.current + 1) {
      successSound.play();
      previousMatchedCountRef.current = currentMatchedCount;
    }

    if (allMatched && !winPlayedRef.current) {
      winSound.play();
      winPlayedRef.current = true;
    }

    if (!allMatched) {
      winPlayedRef.current = false;
    }
  }, [cards]);

  const handleCloseWinMessage = () => {
    setShowWinMessage(false);
    shuffleCards();
  };

  return (
    <div className="App">
       {showWinMessage && <WinMessage onClose={handleCloseWinMessage} />}
      <Header header={'Memory Game'} />
      <div className='buttonContainer'>
        <button className='newGameButton' onClick={shuffleCards}>New Game</button>
        <Level handleLevel={handleLevel} chosenLevel={levelOptions.easy} />
        <Level handleLevel={handleLevel} chosenLevel={levelOptions.medium} />
        <Level handleLevel={handleLevel} chosenLevel={levelOptions.hard} />
      </div>
      <Board cards={cards} handleChoice={handleChoice} flippedCards={revealedTiles} />
      <div className="footerInfo">
        <Attempts attempts={attempts} />
        <Timer seconds={timer} />
      </div>
      <GameHistory gameHistory={gameHistory} results={3} />
    </div>
  );
}

export default App;
