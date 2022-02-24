import {
  CompletedChallenges,
  Countdown,
  ExperienceBar,
  Profile,
} from "@/components";

import styles from "@/styles/pages/Home.module.scss";
import Head from "next/head";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div></div>
      </section>
    </div>
  );
}
