import {create} from 'zustand';

type Card = {
  id: number;
  src: string;
  matched: boolean;
};

type GameState = {
  revealedTiles: Card[];
  matchedPairs: Card[];
  attempts: number;
  timer: number;
  isGameStarted: boolean;
  startGame: () => void; 
  revealTile: (card: Card) => void;
  matchPair: () => void;
  resetRevealedTiles: () => void;
  incrementAttempts: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetGame: () => void;
  setTimer: (value: number) => void
};

export const useGameStore = create<GameState>((set: (partial: Partial<GameState> | ((state: GameState) => Partial<GameState>)) => void) => ({
  revealedTiles: [],
  matchedPairs: [],
  attempts: 0,
  timer: 0,
  isGameStarted: false,

  startGame: () => set({
    revealedTiles: [],
    matchedPairs: [],
    attempts: 0,
    timer: 0,
  }),

  revealTile: (card: Card) => set((state) => {
    const isAlreadyRevealed = state.revealedTiles.some((tile) => tile.id === card.id);
    
    if (state.revealedTiles.length < 2 && !isAlreadyRevealed) {
      return { revealedTiles: [...state.revealedTiles, card] };
    }
    return state;
  }),

  matchPair: () => set((state) => {
    if (state.revealedTiles.length === 2) {
      return {
        matchedPairs: [...state.matchedPairs, ...state.revealedTiles],
        revealedTiles: [],
      };
    }
    return state;
  }),

  resetRevealedTiles: () => set({ revealedTiles: [] }),

  incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),

  startTimer: () => set({ isGameStarted: true }),

  stopTimer: () => set({ isGameStarted: false }),

  setTimer: (value: number) => set({ timer: value }),

  resetGame: () => set({
    revealedTiles: [],
    matchedPairs: [],
    attempts: 0,
    timer: 0,
    isGameStarted: false
  }),
}));


