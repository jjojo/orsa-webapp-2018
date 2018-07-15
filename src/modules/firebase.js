import firebase from 'firebase'
import config from '../firebaseConfig'

const fire = firebase.initializeApp(config)

fire.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
export { fire };