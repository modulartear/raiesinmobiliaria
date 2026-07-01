import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export type FirebaseServices = {
  ready: boolean;
  error: string;
  app: ReturnType<typeof initializeApp> | null;
  auth: ReturnType<typeof getAuth> | null;
  db: ReturnType<typeof getFirestore> | null;
  storage: ReturnType<typeof getStorage> | null;
};

function env(key: string): string {
  return (import.meta as any).env?.[key] ?? "";
}

function isCompleteConfig(config: Record<string, string>): boolean {
  return (
    !!config.apiKey &&
    !!config.authDomain &&
    !!config.projectId &&
    !!config.storageBucket &&
    !!config.messagingSenderId &&
    !!config.appId
  );
}

export function initFirebase(): FirebaseServices {
  const config = {
    apiKey: env("VITE_FIREBASE_API_KEY"),
    authDomain: env("VITE_FIREBASE_AUTH_DOMAIN"),
    projectId: env("VITE_FIREBASE_PROJECT_ID"),
    storageBucket: env("VITE_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: env("VITE_FIREBASE_MESSAGING_SENDER_ID"),
    appId: env("VITE_FIREBASE_APP_ID")
  };

  if (!isCompleteConfig(config)) {
    return {
      ready: false,
      error:
        "Firebase no configurado. Completa las variables VITE_FIREBASE_* en tu entorno.",
      app: null,
      auth: null,
      db: null,
      storage: null
    };
  }

  const app = getApps().length ? getApps()[0] : initializeApp(config);

  return {
    ready: true,
    error: "",
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app)
  };
}

