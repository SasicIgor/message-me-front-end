import { Socket, io } from "socket.io-client";

const URL =
  import.meta.env.VITE_NODE_ENV === "DEV"
    ? "http://localhost:5023"
    : import.meta.env.VITE_BASE_URL_PRODUCTION;

export const socket: Socket = io(URL, {
  autoConnect: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});
