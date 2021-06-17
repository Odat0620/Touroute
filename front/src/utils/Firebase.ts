import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_SENDER_ID}`,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// firebase.appsをチェックし、ロードされているかどうかを確認。
// なければinitializeAppを実行
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

export const auth = firebase.auth();
