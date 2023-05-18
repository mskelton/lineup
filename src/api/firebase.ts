import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  databaseURL: "https://mskelton-lineup-default-rtdb.firebaseio.com",
}

export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
