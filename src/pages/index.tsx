import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";

import {
  ChallengeBox,
  CompletedChallenges,
  Countdown,
  ExperienceBar,
  Profile,
} from "@/components";
import { CountdownProvider } from "@/contexts/CountdownContext";
import { ChallengesProvider } from "@/contexts/ChallengesContext";
import styles from "@/styles/pages/Home.module.scss";

type Props = {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
};

export default function Home({
  level,
  currentExperience,
  challengesCompleted,
}: Props) {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const {
    "@moveit:level": level,
    "@moveit:currentExperience": currentExperience,
    "@moveit:challengesCompleted": challengesCompleted,
  } = parseCookies(ctx);

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
