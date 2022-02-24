import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { setCookie } from "nookies";

import challenges from "challenges.json";

import { LevelUpModal } from "@/components";

type Challenge = {
  type: "body" | "eye";
  description: string;
  amount: number;
};

type ChallengesContextData = {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge | null;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
};

type ChallengesProviderProps = {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  children: ReactNode | ReactNode[];
};

export const ChallengesContext = createContext<ChallengesContextData>(
  {} as ChallengesContextData
);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(
    null
  );
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = useMemo(
    () => Math.pow((level + 1) * 4, 2),
    [level]
  );

  const levelUp = useCallback(() => {
    setLevel((prevLevel) => prevLevel + 1);
    setIsLevelUpModalOpen(true);
  }, []);

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex] as Challenge;

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }, []);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null);
  }, []);

  const completeChallenge = useCallback(() => {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setActiveChallenge(null);
    setCurrentExperience(finalExperience);
    setChallengesCompleted(
      (prevChallengesCompleted) => prevChallengesCompleted + 1
    );
  }, [activeChallenge, currentExperience, experienceToNextLevel, levelUp]);

  const closeLevelUpModal = useCallback(() => {
    setIsLevelUpModalOpen(false);
  }, []);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    setCookie(undefined, "@moveit:level", String(level));
    setCookie(
      undefined,
      "@moveit:currentExperience",
      String(currentExperience)
    );
    setCookie(
      undefined,
      "@moveit:challengesCompleted",
      String(challengesCompleted)
    );
  }, [level, currentExperience, challengesCompleted]);

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
