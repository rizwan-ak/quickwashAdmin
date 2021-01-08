import * as firebase from "firebase"; 

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDvMcnkcwKAva_bk33AIC5H_7FRT7lhjvo",
  authDomain: "quickwash-162c2.firebaseapp.com",
  databaseURL: "https://quickwash-162c2.firebaseio.com",
  projectId: "quickwash-162c2",
  storageBucket: "quickwash-162c2.appspot.com",
  messagingSenderId: "812769309218",
  appId: "1:812769309218:web:ac414ebb9df981af1c907b",
  measurementId: "G-K2ZVRT2SN4",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = app.auth();
const firestore = app.firestore();
const storageRef = firebase.storage().ref();

//SIGNIN
const signin = async (email, password) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return user.uid;
  } catch (err) {
    console.log(err);
  }
};

//GET CURRENT USER
const isAdmin = async (id) => {
  try {
    const userRef = firestore.doc(`admin/${id}`);
    const user = await userRef.get();

    return user.data();
  } catch (err) {
    console.log(err);
  }
};

//LOGOUT
const logout = async () => {
  try {
    return await auth.signOut();
  } catch (err) {
    console.log(err);
  }
};

//FORGOT PASSWORD
const forgotPassword = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    console.log("Password Reset link is send to your email.");
  } catch (err) {
    console.log(err);
  }
};

//IS LOGGED IN
const isLoggedIn = async (set) => {
  try {
    await auth.onAuthStateChanged((user) => {
      user && set(true);
    });
  } catch (err) {
    console.log(err);
  }
};

//GET ORDERS
const getOrders = async (set) => {
  try {
    firestore.collection("orders").onSnapshot(async (res) => {
      await set(res.docs.map((doc) => doc.data()));
    });
  } catch (err) {
    console.log(err);
  }
};

//GET USERS
const getUsers = async (set) => {
  try {
    const data = firestore.collection("users").onSnapshot(async (res) => {
      const vas = res.docs.map((doc) => doc.data());
      set(vas);
    });
    return data.docs.map((doc) => doc.data());
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

//GET CHATS
const getChats = async (set) => {
  try {
    firestore.collection("chats").onSnapshot(async (res) => {
      const chats = res.docs.map((doc) => doc.data());
      await set(chats);
    });
  } catch (err) {
    console.log(err);
  }
};

//CHANGE ORDER'S STATUS
const changeOrderStatus = async (status, id) => {
  try {
    await firestore.doc(`orders/${id}`).set({ status }, { merge: true });
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

// SET RIDERS CURRENT LOCATION
const setLocation = async (data) => {
  try {
    await firestore
      .doc(`ridersLocation/1`)
      .set({ lat: data.latitude, lon: data.longitude }, { merge: true });
  } catch (err) {
    console.log(err);
  }
};

// SET PRICES
const setPrices = async (data) => {
  try {
    await firestore.doc(`prices/1`).set({ ...data }, { merge: true });
  } catch (err) {
    console.log(err);
  }
};

//GET PRICES
const getPrices = async (set) => {
  try {
    firestore.collection("prices").onSnapshot(async (res) => {
      await set(res.docs.map((doc) => doc.data())[0]);
    });
  } catch (err) {
    console.log(err);
  }
};

//DELTE USER
const deleteUser = async (id) => {
  try {
    await firestore.doc(`users/${id}`).delete();
    alert("Document successfully deleted!");
  } catch (err) {
    console.log(err);
  }
};

//SET DEAL
const setDeal = async (data) => {
  try {
    await firestore.doc(`deal/1`).set({ ...data }, { merge: true });
  } catch (err) {
    console.log(err);
  }
};

//GET DEAL
const getDeal = async (set) => {
  try {
    firestore.collection("deal").onSnapshot(async (res) => {
      await set(res.docs.map((doc) => doc.data())[0].deal);
    });
  } catch (err) {
    console.log(err);
  }
};

//SET VOUCHER
const setVouchers = async (data) => {
  try {
    await firestore.doc(`vouchers/1`).set({ data });
  } catch (err) {
    console.log(err);
  }
};

//GET VOUCHERS
const getVouchers = async (set) => {
  try {
    firestore.collection("vouchers").onSnapshot(async (res) => {
      await set(res.docs.map((doc) => doc.data())[0].data);
    });
  } catch (err) {
    console.log(err);
  }
};

//SET DRIVERS
const setDrivers = async (data, id) => {
  console.log(data);
  try {
    await firestore.doc(`drivers/${id}`).set({ ...data });
  } catch (err) {
    console.log(err);
  }
};

//SET DRIVERS PROFILE PICTURE
const setDriversPic = async (file, id, set) => {
  try {
    var uploadTask = storageRef.child("drivers/" + id).put(file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {},
      function (error) {},
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          set(downloadURL);
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//DELTE DRIVER
const deleteDriver = async (id) => {
  try {
    await firestore.doc(`drivers/${id}`).delete();
  } catch (err) {
    console.log(err);
  }
};

//GET DRIVERS
const getDrivers = async (set) => {
  try {
    firestore.collection("drivers").onSnapshot(async (res) => {
      await set(res.docs.map((doc) => doc.data()));
    });
  } catch (err) {
    console.log(err);
  }
};

//CHANGE DRIVERSRATINGS
const changeDriversRatings = async (ratings, id) => {
  try {
    await firestore.doc(`drivers/${id}`).set({ ratings }, { merge: true });
  } catch (err) {
    console.log(err);
  }
};

//SEND NOTIFICATIONS
const sendNotifications = async (data) => {
  console.log(data);
  try {
    await firestore.doc(`notifications/1`).set({ ...data }, { merge: true });
  } catch (err) {
    console.log(err);
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
  forgotPassword,
  setPrices,
  getPrices,
  deleteUser,
  setDeal,
  getDeal,
  setVouchers,
  getVouchers,
  setDrivers,
  getDrivers,
  deleteDriver,
  setDriversPic,
  changeDriversRatings,
  sendNotifications,
};
