export type SocketState = {
  isConnected: boolean;
  joinedChats: string[];
};

export const initialSocketState: SocketState = {
  isConnected: false,
  joinedChats: [],
};

export enum SocketActionTypes {
  SET_CONNECTED = "SET_CONNECTED",
  SET_DISCONNECTED = "SET_DISCONNECTED",
  JOIN_CHATS = "JOIN_CHATS",
}

type SetConnected = {
  type: SocketActionTypes.SET_CONNECTED;
};

type SetDisconnected = {
  type: SocketActionTypes.SET_DISCONNECTED;
};

type JoinRooms = {
  type: SocketActionTypes.JOIN_CHATS;
  payload: string[];
};

export type SocketActions = SetConnected | SetDisconnected | JoinRooms;

export function socketReducer(state: SocketState, action: SocketActions) {
  switch (action.type) {
    case SocketActionTypes.SET_CONNECTED:
      return { ...state, isConnected: true };
    case SocketActionTypes.SET_DISCONNECTED:
      return { ...state, isConnected: false };
    case SocketActionTypes.JOIN_CHATS:
      return { ...state, joinedChats: action.payload };
  }
}
