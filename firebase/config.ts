import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getAuth,
} from "firebase/auth";

import {
  getStorage,
} from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyDmQiGpyK0Rzv7AiEwq389sM6c1ahRuWAg",

  authDomain: "zarvian-shoppers.firebaseapp.com",

  projectId: "zarvian-shoppers",

  storageBucket: "zarvian-shoppers.appspot.com",

  messagingSenderId: "946492150671",

  appId: "1:946492150671:web:400737bcd78e5514a7b1fa",

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);