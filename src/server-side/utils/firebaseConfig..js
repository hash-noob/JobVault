// src/lib/firebaseAdmin.ts
import { initializeApp, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import dotenv from "dotenv";
dotenv.config()

initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)),
});

export const admMessaging = getMessaging();
