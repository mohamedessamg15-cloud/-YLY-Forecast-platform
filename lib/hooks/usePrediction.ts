'use client';

import { useState, useCallback } from 'react';
import type { PredictionState } from '@/lib/data/types';

const DEFAULT_STATE: Omit<PredictionState, 'matchId'> = {
  scoreA: 1,
  scoreB: 1,
  goalscorerTeam: null,
  goalscorerPlayerId: null,
  possessionA: 50,
  yellowCardsA: 1,
  yellowCardsB: 1,
  isComplete: false,
  isSubmitted: false,
};

export function usePrediction(matchId: string) {
  const [state, setState] = useState<PredictionState>({
    matchId,
    ...DEFAULT_STATE,
  });

  const setScoreA = useCallback((v: number) => {
    setState((prev) => {
      const next = { ...prev, scoreA: v };
      return { ...next, isComplete: checkComplete(next) };
    });
  }, []);

  const setScoreB = useCallback((v: number) => {
    setState((prev) => {
      const next = { ...prev, scoreB: v };
      return { ...next, isComplete: checkComplete(next) };
    });
  }, []);

  const setGoalscorer = useCallback((team: 'A' | 'B', playerId: string) => {
    setState((prev) => {
      const next = { ...prev, goalscorerTeam: team, goalscorerPlayerId: playerId };
      return { ...next, isComplete: checkComplete(next) };
    });
  }, []);

  const setPossessionA = useCallback((v: number) => {
    setState((prev) => ({ ...prev, possessionA: Math.min(100, Math.max(0, v)) }));
  }, []);

  const setYellowCardsA = useCallback((v: number) => {
    setState((prev) => ({ ...prev, yellowCardsA: v }));
  }, []);

  const setYellowCardsB = useCallback((v: number) => {
    setState((prev) => ({ ...prev, yellowCardsB: v }));
  }, []);

  const submit = useCallback(() => {
    setState((prev) => ({ ...prev, isSubmitted: true }));
  }, []);

  const reset = useCallback(() => {
    setState({ matchId, ...DEFAULT_STATE });
  }, [matchId]);

  return {
    state,
    setScoreA,
    setScoreB,
    setGoalscorer,
    setPossessionA,
    setYellowCardsA,
    setYellowCardsB,
    submit,
    reset,
  };
}

function checkComplete(state: PredictionState): boolean {
  return state.goalscorerPlayerId !== null;
}
