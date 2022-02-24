import { useContext } from "react";

import { CountdownContext } from "@/contexts/CountdownContext";

export const useCountdown = () => useContext(CountdownContext);
