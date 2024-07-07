import admin from "firebase-admin";
import serviceAccount from "./firebase.json";

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  }),
});

export default app;

export const db = app.firestore();
