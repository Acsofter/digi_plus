import React, { ReactNode, useEffect, useState } from "react";
import { Contexts } from "./Contexts";
import { check_token } from "./auth.services";
import { Loading } from "../components/Loading";

export const PrivateRouteWrapper = ({
  children,
  onlyStaff,
}: {
  children: ReactNode;
  onlyStaff?: boolean;
}) => {
  const { state, dispatch } = React.useContext(Contexts);
  if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  useEffect(() => {
    const check = async () => {
      const verified = await check_token();

      if (onlyStaff) {
        if (!verified?.is_staff) {
          window.location.replace("/home");
          return;
        }
      }

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

  return <>{state.auth.isAuthenticated ? children : <Loading />}</>;
};
