import AT from "../actions/actionTypes";

const initialState = {
  orders: "",
  users: "",
  chats: "",
  prices: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AT.GET_ORDERS:
      return { ...state, orders: payload };
    case AT.GET_USERS:
      return { ...state, users: payload };
    case AT.GET_CHATS:
      return { ...state, chats: payload };
    case AT.GET_PRICES:
      return { ...state, prices: payload };
    default:
      return state;
  }
};
