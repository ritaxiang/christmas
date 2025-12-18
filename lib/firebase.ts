import { initializeApp, getApp, getApps } from "firebase/app"
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCv_tc3wq4kBzH_YR_ik0d4mVnuKml9h2Q",
  authDomain: "christmas-card-cceed.firebaseapp.com",
  projectId: "christmas-card-cceed",
  storageBucket: "christmas-card-cceed.firebasestorage.app",
  messagingSenderId: "659833551784",
  appId: "1:659833551784:web:77597a3bfc35d047147b9d",
  measurementId: "G-RR464KG0G6"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

export let analytics: Analytics | undefined = undefined

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app)
  })
}
