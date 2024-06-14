import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// created a hook
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
// connection of client to server at one place
export const SocketProvider = ({ children }) => {
  // state i want to be available across the app
  const socket = useMemo(() => io("localhost:8000"), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
