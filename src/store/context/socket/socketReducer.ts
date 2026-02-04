export type SocketState = {
  isConnected: boolean;
  joinedChats: string[];
};

enum SocketActionTypes {
  SET_CONNECTED = "SET_CONNECTED",
  SET_DISCONNECTED = "SET_DISCONNECTED",
  JOIN_ROOMS = "JOIN_ROOMS",
}

type SetConnected = {
  type: SocketActionTypes.SET_CONNECTED;
};

type SetDisconnected = {
  type: SocketActionTypes.SET_DISCONNECTED;
};

type JoinRooms = {
  type: SocketActionTypes.JOIN_ROOMS;
  payload: string[];
};

export type SocketActions = SetConnected | SetDisconnected | JoinRooms;

export function socketReducer(state: SocketState, action: SocketActions) {
  switch (action.type) {
    case SocketActionTypes.SET_CONNECTED:
      return { ...state, isConnected: true };
    case SocketActionTypes.SET_DISCONNECTED:
      return { ...state, isConnected: false };
    case SocketActionTypes.JOIN_ROOMS:
      return { ...state, joinedRooms: action.payload };
  }
}
