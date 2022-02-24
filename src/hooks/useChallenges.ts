import { useContext } from "react";

import { ChallengesContext } from "@/contexts/ChallengesContext";

export const useChallenges = () => useContext(ChallengesContext);
