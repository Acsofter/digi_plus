import React, { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Administration } from "./pages/Administration";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";
import { Contexts } from "./services/Contexts";
import { PrivateRouteWrapper } from "./services/PrivateRouteWrapper";
import { useUserServices } from "./services/user.services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "reactstrap";
const audio_notification = require("./assets/sound/pop.mp3");

const initialState: State = {
  ws: {
    readyState: 0,
    lastMessage: null,
  },
  company: {} as Company,
  popup: {
    isOpen: false,
    loading: true,
    title: undefined,
    subtitle: undefined,
    content: undefined,
  },
  auth: {
    isAuthenticated: false,
    user: {} as User,
    token: "",
  },
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_DATA": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_POPUP": {
      return {
        ...state,
        popup: { ...state.popup, ...action.payload },
      };
    }
    case "SET_WS": {
      return {
        ...state,
        ws: { ...state.ws, ...(action.payload as WsState) },
      };
    }
    case "SET_COMPANY": {
      return {
        ...state,
        company: action.payload as Company,
      };
    }
    case "SET_AUTH": {
      return {
        ...state,
        auth: action.payload as AuthState,
      };
    }
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const [userInteracted, setUserInteracted] = React.useState(false);

  const { get_company_details } = useUserServices();

  const socketUrl: string = `ws://localhost:8000/ws/company/ashfd1i2e397t3xbe63129x6739/?token=${localStorage.getItem(
    "user"
  )}`;

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    reconnectInterval: 3000,
    shouldReconnect: () => true,
  });

  const notification_sound = () => {
    if (!userInteracted) return;
    const audio = new Audio(audio_notification);
    audio.volume = 0.5;
    audio.loop = false;

    audio.play();
  };

  useEffect(() => {
    const handleInteraction = () => setUserInteracted(true);

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await get_company_details();
      if (response) dispatch({ type: "SET_COMPANY", payload: response });
    };
    fetchCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      const messageData = JSON.parse(lastMessage.data);

      switch (messageData.type) {
        case "user_joined":
          state.auth.user.roles &&
            state.auth.user.roles.includes("staff") &&
            toast.info(`${messageData.user.username} se ha conectado.`);
          break;

        case "ticket_added":
          if (state.auth.user.roles.includes("staff")) {
            toast.info(`${messageData.user.username} ha añadido un ticket.`);
          } else if (state.auth.user.id === messageData.user.id) {
            toast.info(`ticket añadido correctamente.`);
          }
          notification_sound();
          break;

        case "ticket_updated":
        case "ticket_deleted":
          break;
        default:
          break;
      }

      dispatch({
        type: "SET_WS",
        payload: { lastMessage: messageData },
      });
    }
    dispatch({ type: "SET_WS", payload: { readyState } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage, readyState]);

  const handleSendMessage = useCallback(
    ({
      message,
      type,
      payload = {},
    }: {
      message: string;
      type: string;
      payload?: { [index: string]: any };
    }) => {
      sendMessage(JSON.stringify({ message, type, payload }));
    },
    [sendMessage]
  );
  return (
    <Contexts.Provider
      value={{ state, dispatch, sendMessage: handleSendMessage }}
    >
      <div className="flex place-items-center w-screen h-screen relative overflow-hidden">
        <Modal />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <PrivateRouteWrapper>
                <Home />
              </PrivateRouteWrapper>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRouteWrapper>
                <Home />
              </PrivateRouteWrapper>
            }
          />
          {/* <Route
            path="/upload"
            element={
              <PrivateRouteWrapper>
                <FileUpload />
              </PrivateRouteWrapper>
            }
          /> */}

          <Route
            path="/admin"
            element={
              <PrivateRouteWrapper>
                <Administration />
              </PrivateRouteWrapper>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRouteWrapper>
                <Settings />
              </PrivateRouteWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRouteWrapper>
                <Dashboard />
              </PrivateRouteWrapper>
            }
          />
        </Routes>
        {!userInteracted && (
          <div className="absolute  opacity-40  bottom-0 right-0 px-3">
            <h2>Las funcionalidades de este sitio requieren interactuar</h2>
          </div>
        )}
      </div>
    </Contexts.Provider>
  );
};

export default App;
