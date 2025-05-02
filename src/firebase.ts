import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Récupérer la configuration depuis localStorage ou utiliser la configuration par défaut
let firebaseConfig;
const savedConfig = localStorage.getItem('firebaseConfig');

if (savedConfig) {
  try {
    firebaseConfig = JSON.parse(savedConfig);
  } catch (e) {
    console.error("Erreur lors du parsing de la configuration Firebase:", e);
    // Si la configuration est invalide, ne pas initialiser Firebase
    throw new Error("Configuration Firebase invalide");
  }
} else {
  // Pas de configuration trouvée, ne pas initialiser Firebase
  console.log("Aucune configuration Firebase trouvée dans localStorage");
  throw new Error("Aucune configuration Firebase trouvée");
}

// Initialiser Firebase seulement si la configuration est disponible
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
export const db = getFirestore(app);

export default app; 