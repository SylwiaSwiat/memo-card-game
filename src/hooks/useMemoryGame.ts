import { useEffect, useState } from 'react';
import { useGameStore } from '../components/useGameStore';
import cardImages from '../components/cardImages';

type CardType = {
  src: string;
  matched: boolean;
  id: number;
};

export const useGameLogic = (level: number) => {
  const revealedTiles = useGameStore((state) => state.revealedTiles);
  const attempts = useGameStore((state) => state.attempts);
  const timer = useGameStore((state) => state.timer);
  const isGameStarted = useGameStore((state) => state.isGameStarted);
  const { revealTile, matchPair, resetGame, incrementAttempts, startTimer } = useGameStore();
  
  const [cards, setCards] = useState<CardType[]>([]);

  const shuffleCards = () => {
    const slicedCardImages = cardImages.sort(() => Math.random() - 0.5).slice(0, level);
    
    const shuffledCards = [...slicedCardImages, ...slicedCardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    resetGame();
    startTimer();
  };

  useEffect(() => {
    shuffleCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const handleChoice = (card: CardType) => {
    revealTile(card);
  };

  useEffect(() => {
    if (revealedTiles.length === 2) {
      if (revealedTiles[0].src === revealedTiles[1].src) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.src === revealedTiles[0].src ? { ...card, matched: true } : card
          )
        );
        matchPair();
      } else {
        setTimeout(() => useGameStore.getState().resetRevealedTiles(), 1000);
      }
      incrementAttempts();
    }
  }, [revealedTiles, incrementAttempts, matchPair]);

  useEffect(() => {
    let timerInterval: number | null = null;
    if (isGameStarted) {
      timerInterval = setInterval(() => {
        useGameStore.setState((state) => ({ timer: state.timer + 1 }));
      }, 1000);
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isGameStarted]);

  return { cards, handleChoice, attempts, timer, shuffleCards, revealedTiles, resetGame };
};
