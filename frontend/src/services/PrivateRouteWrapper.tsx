import React, { ReactNode, useEffect, useState } from "react";
import { Contexts } from "./Contexts";
import { check_token } from "./auth.services";
import { Loading } from "../components/Loading";

export const PrivateRouteWrapper = ({ children }: { children: ReactNode }) => {
  const { state, dispatch } = React.useContext(Contexts);

  useEffect(() => {
    const check = async () => {
      const verified = await check_token();

      if (!verified) {
        window.location.replace("/login");
        return;
      }

      dispatch({
        type: "SET_AUTH",
        payload: { user: verified, isAuthenticated: true },
      });
    };

    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{state.auth.user.token ? children : <Loading />}</div>;
};
