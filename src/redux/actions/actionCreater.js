import AT from "./actionTypes";

const getOrders = (payload) => {
  return {
    type: AT.GET_ORDERS,
    payload,
  };
};

const getUsers = (payload) => {
  return {
    type: AT.GET_USERS,
    payload,
  };
};

const getChats = (payload) => {
  return {
    type: AT.GET_CHATS,
    payload,
  };
};

const getPrices = (payload) => {
  return {
    type: AT.GET_PRICES,
    payload,
  };
};

export default {
  getOrders,
  getUsers,
  getChats,
  getPrices,
};
