import * as firebase from "firebase";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDylm_jWDX-Oy9bN5U4a4AcHsN3USnAF7I",
  authDomain: "quickwash-c0d35.firebaseapp.com",
  databaseURL: "https://quickwash-c0d35.firebaseio.com",
  projectId: "quickwash-c0d35",
  storageBucket: "quickwash-c0d35.appspot.com",
  messagingSenderId: "730392161523",
  appId: "1:730392161523:web:5323e68c8e664d32b3db86",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = app.auth();
const firestore = app.firestore();

//SIGNIN
const signin = async (email, password) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return user.uid;
  } catch (err) {
    alert(err);
  }
};

//GET CURRENT USER
const isAdmin = async (id) => {
  try {
    const userRef = firestore.doc(`admin/${id}`);
    const user = await userRef.get();

    return user.data();
  } catch (err) {
    alert(err);
  }
};

//LOGOUT
const logout = async () => {
  try {
    return await auth.signOut();
  } catch (err) {
    alert(err);
  }
};

//IS LOGGED IN
const isLoggedIn = async (set) => {
  try {
    await auth.onAuthStateChanged((user) => {
      user && set(true);
    });
  } catch (err) {
    alert(err);
  }
};

//GET ORDERS
const getOrders = async () => {
  try {
    const data = await firestore.collection("orders").get();
    return await data.docs.map((doc) => doc.data());
  } catch (err) {
    alert(err);
  }
};

//GET USERS
const getUsers = async () => {
  try {
    const data = await firestore.collection("users").get();
    return await data.docs.map((doc) => doc.data());
  } catch (err) {
    alert(err);
  }
};

//GET USER
const getUser = async (id, set) => {
  try {
    await firestore
      .collection("users")
      .where("id", "==", id)
      .onSnapshot(async (res) => {
        const vas = res.docs.map((doc) => doc.data());
        set(vas[0]);
      });
  } catch (err) {
    alert(err);
  }
};

//GET CHATS
const getChats = async (set) => {
  try {
    await firestore.collection("chats").onSnapshot(async (res) => {
      const chats = await res.docs.map((doc) => doc.data());
      await set(chats);
    });
  } catch (err) {
    alert(err);
  }
};

//CHANGE ORDER'S STATUS
const changeOrderStatus = async (status, id) => {
  try {
    await firestore.doc(`orders/${id}`).set({ status }, { merge: true });
  } catch (err) {
    alert(err);
  }
};

//SEND MSG
const sendMsg = async (id, msg) => {
  try {
    await firestore.doc(`chats/${id}`).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        sender: "admin",
        msg: msg,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      }),
    });

    // await .set({ merge: true });
  } catch (err) {
    alert(err);
  }
};

const setLocation = async (data) => {
  console.log(data);
  try {
    await firestore
      .doc(`ridersLocation/1`)
      .set({ lat: data.latitude, lon: data.longitude });
  } catch (err) {
    alert(err);
  }
};

export default {
  signin,
  isAdmin,
  logout,
  isLoggedIn,
  getOrders,
  changeOrderStatus,
  getUser,
  getUsers,
  getChats,
  sendMsg,
  setLocation,
};
