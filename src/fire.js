import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDbLtCnQ9DD8fgT_8WDFhIrzEL7yJdYnm0",
  authDomain: "cogmerchant.firebaseapp.com",
  databaseURL: "https://cogmerchant.firebaseio.com",
  projectId: "cogmerchant",
  storageBucket: "",
  messagingSenderId: "456183308424"
  };
var fire = firebase.initializeApp(config);
export default fire;
