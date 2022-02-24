import styles from "./styles.module.scss";

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://github.com/joaogabriel-sg.png"
        alt="Imagem de perfil de João Gabriel"
      />
      <div>
        <strong>João Gabriel</strong>
        <p>
          <img
            src="/icons/level.svg"
            alt="Ícone de uma seta verde para cima simbolizando o level"
          />
          Level 1
        </p>
      </div>
    </div>
  );
}
