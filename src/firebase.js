import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const db = firebase.initializeApp(
  {
    apiKey: process.env.VUE_API_KEY,
    authDomain: process.env.VUE_API_DOMAIN,
    projectId: process.env.VUE_API_PROJECT_ID,
    storageBucket: process.env.VUE_BUCKET,
    messagingSenderId: process.env.VUE_SENDER_ID,
    appId: process.env.VUE_APP_ID,
    measurementId: process.env.VUE_MEASURMENT_ID
  }
).firestore()
export default db;
