import { createContext, useContext } from "react";

export const Contexts = createContext({
  sendMessage: (args: any) => {},
  state: {} as State,
  dispatch: (args: any) => {},
});
