export const staticEnvConfig = {
  apiUrl: process.env.NEXT_PUBLIC_BASE_API_URL ?? "MOCK_NEXT_PUBLIC_BASE_API_URL",
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "MOCK_NEXT_PUBLIC_FIREBASE_API_KEY",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "MOCK_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "MOCK_NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "MOCK_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "MOCK_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "MOCK_NEXT_PUBLIC_FIREBASE_APP_ID",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "MOCK_NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
  },
};
