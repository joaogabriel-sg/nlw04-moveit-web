import { useChallenges } from "@/hooks";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

type CountdownContextData = {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
};

type CountdownProviderProps = {
  children: ReactNode | ReactNode[];
};

export const CountdownContext = createContext<CountdownContextData>(
  {} as CountdownContextData
);

let countdownTimeout: NodeJS.Timeout;

const COUNTDOWN_INITIAL_TIME: number = 0.1 * 60; // 25 minutes

export function CountdownProvider({ children }: CountdownProviderProps) {
  const [time, setTime] = useState(COUNTDOWN_INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const { startNewChallenge } = useChallenges();

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, []);

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(COUNTDOWN_INITIAL_TIME);
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(
        () => setTime((prevTime) => prevTime - 1),
        1000
      );
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
