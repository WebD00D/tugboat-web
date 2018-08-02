import firebase from "firebase";
var config = {
  apiKey: "AIzaSyC0Yn77TYXhk5MskwjaVPtC08izjyAA9sU",
  authDomain: "tugboat-app.firebaseapp.com",
  databaseURL: "https://tugboat-app.firebaseio.com",
  projectId: "tugboat-app",
  storageBucket: "",
  messagingSenderId: "888761548553"
};
var fire = firebase.initializeApp(config);
export default fire;
