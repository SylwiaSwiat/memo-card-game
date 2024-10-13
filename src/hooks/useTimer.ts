import { useEffect } from 'react';
import { useGameStore } from '../components/useGameStore';

export const useTimer = () => {
  const timer = useGameStore((state) => state.timer);
  const isGameStarted = useGameStore((state) => state.isGameStarted);
  const setTimer = useGameStore((state) => state.setTimer);

  useEffect(() => {
    let timerInterval: number | null = null;

    if (isGameStarted) {
      timerInterval = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);
    } 

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isGameStarted, setTimer, timer]);

  return timer;
};
