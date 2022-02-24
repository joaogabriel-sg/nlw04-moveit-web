import { useChallenges, useCountdown } from "@/hooks";
import { useCallback } from "react";

import styles from "./styles.module.scss";

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } =
    useChallenges();
  const { resetCountdown } = useCountdown();

  const handleChallengeSucceeded = () => {
    completeChallenge();
    resetCountdown();
  };

  const handleChallengeFailed = () => {
    resetChallenge();
    resetCountdown();
  };

  return (
    <div className={styles.challengeBoxContainer}>
      {!activeChallenge && (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img
              src="/icons/level-up.svg"
              alt="Imagem de uma seta verde com um símbolo de adição indicando aumento de level"
            />
            Avance de level completando desafios.
          </p>
        </div>
      )}

      {activeChallenge && (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img
              src={`/icons/${activeChallenge.type}.svg`}
              alt="Imagem de uma mão segurando um halter como forma de simbolizar um desafio."
            />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}
