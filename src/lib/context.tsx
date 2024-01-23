import { useState, createContext, ReactNode } from "react";

type AppContextTime = {
  work: number;
  break: number;
};
type AppContextProviderState = {
  time: AppContextTime;
  setTime: (time: AppContextTime) => void;
};
const initialState: AppContextProviderState = {
  time: { work: 25, break: 5 },
  setTime: () => null,
};

export const AppContext = createContext<AppContextProviderState>(initialState);

function Context({ children }: { children: ReactNode }) {
  const [time, setTime] = useState(initialState.time);

  const value = { time, setTime };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export default Context;
