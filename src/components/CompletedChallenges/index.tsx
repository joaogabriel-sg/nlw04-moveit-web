import { useChallenges } from "@/hooks";

import styles from "./styles.module.scss";

export function CompletedChallenges() {
  const { challengesCompleted } = useChallenges();

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
