import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getAuth,GoogleAuthProvider,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore,doc,setDoc,getDoc  } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "viecteen.firebaseapp.com",
  projectId: "viecteen",
  storageBucket: "viecteen.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign in with Google
const providerGoogle = new GoogleAuthProvider();
export { app, auth, providerGoogle, db };
// providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly');
export const signOutGoogle = async () => {
  signOut(auth).then(() => {
    alert("Sign-out successfully.")
  }).catch((error) => {
    console.log(error)
  });
}
export const checkAuthStatus = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}



// Sign in with Facebook
// const providerFacebook = new FacebookAuthProvider();
// export const signInWithFacebook = async () => {
//   try {
//     const resutl = await signInWithPopup(auth, providerFacebook);
//     console.log(resutl.user)
//   }
//   catch (error) {
//     console.log(error)
//   }
// }

// Save user to Firestore
export const addUserToDB = async (username, uid, role, photoURL) => {
  try {
    await setDoc(doc(db, "users", uid), {
      name: username,
      role: role,
      photoProfile: photoURL
    });
  }
  catch (error) {
    console.log(error)
  }
}

export const getUserFromDB = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      return null
    }

  }
  catch (error) {
    console.log(error)
  }
}

// Add company profile to Firestore
export const addCompanyProfileToDB = async (uid, nameCompany, typeCompany, address, contactNumber, websiteURL, imageProfile) => {
  try {
    await setDoc(doc(db, "companies", uid), {
      nameCompany: nameCompany,
      typeCompany: typeCompany,
      address: address,
      contactNumber: contactNumber,
      websiteURL: websiteURL,
      imageProfile: imageProfile,
      ownerID: uid
    });
  }
  catch (error) {
    console.log(error)
  }
}

export const getCompanyProfileFromDB = async (uid) => {
  try {
    const docRef = doc(db, "companies", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      return null
    }
  }
  catch (error) {
    console.log(error)
  }
}