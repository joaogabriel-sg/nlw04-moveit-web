import { useChallenges } from "@/hooks";

import styles from "./styles.module.scss";

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useChallenges();

  return (
    <div className={styles.overlay}>
      <div className={styles.levelUpModalContainer}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img
            src="/icons/close.svg"
            alt="Ícone em formato de x simbolizando o botão para fechar o modal"
          />
        </button>
      </div>
    </div>
  );
}
