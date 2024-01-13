import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'



const firebaseConfig = {


  apiKey: "AIzaSyC3tCvz78OHB0tdGi0k2O59J9-Se-SGAf8",
  authDomain: "d5reactgallery-586aa.firebaseapp.com",
  projectId: "d5reactgallery-586aa",
  storageBucket: "d5reactgallery-586aa.appspot.com",
  messagingSenderId: "341639789640",
  appId: "1:341639789640:web:45abb8f9ff3b64a52e6c7d"

  /*
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSEAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
    */

    
  };
  
const firebaseApp = initializeApp(firebaseConfig)

 export const storage = getStorage(firebaseApp)
 console.log(storage)