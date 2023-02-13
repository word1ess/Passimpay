if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /js/init.js');
var firebaseConfig = {
  "projectId": "advokat-315811",
  "appId": "1:291305628376:web:56f37b9d37a797198aedad",
  "storageBucket": "advokat-315811.appspot.com",
  "apiKey": "AIzaSyBYn-0GslsKtmJQrwK2stKdaFA5oibt_Dk",
  "authDomain": "advokat-315811.firebaseapp.com",
  "messagingSenderId": "291305628376"
};
if (firebaseConfig) {
  firebase.initializeApp(firebaseConfig);

  var firebaseEmulators = undefined;
  if (firebaseEmulators) {
    console.log("Automatically connecting Firebase SDKs to running emulators:");
    Object.keys(firebaseEmulators).forEach(function (key) {
      console.log('\t' + key + ': http://' + firebaseEmulators[key].host + ':' + firebaseEmulators[key].port);
    });

    if (firebaseEmulators.database && typeof firebase.database === 'function') {
      firebase.database().useEmulator(firebaseEmulators.database.host, firebaseEmulators.database.port);
    }

    if (firebaseEmulators.firestore && typeof firebase.firestore === 'function') {
      firebase.firestore().useEmulator(firebaseEmulators.firestore.host, firebaseEmulators.firestore.port);
    }

    if (firebaseEmulators.functions && typeof firebase.functions === 'function') {
      firebase.functions().useEmulator(firebaseEmulators.functions.host, firebaseEmulators.functions.port);
    }

    if (firebaseEmulators.auth && typeof firebase.auth === 'function') {
      firebase.auth().useEmulator('http://' + firebaseEmulators.auth.host + ':' + firebaseEmulators.auth.port);
    }

    if (firebaseEmulators.storage && typeof firebase.storage === 'function') {
      firebase.storage().useEmulator(firebaseEmulators.storage.host, firebaseEmulators.storage.port);
    }
  } else {
    console.log("To automatically connect the Firebase SDKs to running emulators, replace '/__/firebase/init.js' with '/__/firebase/init.js?useEmulator=true' in your index.html");
  }
}
