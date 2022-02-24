import { useCallback, useEffect, useState } from "react";

import styles from "./styles.module.scss";

export function Countdown() {
  const [time, setTime] = useState(25 * 60); // 25 minutes
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  const startCountdown = useCallback(() => {
    setActive(true);
  }, []);

  useEffect(() => {
    if (active && time > 0) {
      const timeoutId = setTimeout(
        () => setTime((prevTime) => prevTime - 1),
        1000
      );

      return () => clearTimeout(timeoutId);
    }
  }, [active, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
}
