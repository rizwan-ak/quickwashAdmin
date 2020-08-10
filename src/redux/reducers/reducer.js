import AT from "../actions/actionTypes";

const initialState = {
  orders: [],
  users: [],
  chats: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AT.GET_ORDERS:
      return { ...state, orders: payload };
    case AT.GET_USERS:
      return { ...state, users: payload };
    case AT.GET_CHATS:
      return { ...state, chats: payload };
    default:
      return state;
  }
};
