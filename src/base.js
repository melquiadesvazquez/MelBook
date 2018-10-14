import Rebase from "re-base";
import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.DB_API_KEY,
  authDomain: process.env.DB_AUTH_DOMAIN,
  databaseURL: process.env.DB_URL
});
 const base = Rebase.createClass(firebaseApp.database());
 // This a named export
export { firebaseApp }
 // this is a dfault
export default base;