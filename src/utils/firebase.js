// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestFcmToken() {
  try {
    const status = await Notification.requestPermission();
    if (status !== 'granted') {
      throw new Error('Permission denied');
    }

    if (!('serviceWorker' in navigator)) {
      throw new Error('Service workers are not supported in this browser');
    }

    // Wait for service worker installation
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    await navigator.serviceWorker.ready;

    console.log('Service Worker registered with scope:', registration.scope);

    // Ensure the service worker is active
    if (registration.active) {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.VITE_VAPID_KEY,
          serviceWorkerRegistration: registration
        });

        if (!currentToken) {
          throw new Error('No registration token available');
        }

        console.log('FCM Token obtained:', currentToken);
        return currentToken;
      } catch (err) {
        console.error('Error getting FCM token:', err);
        throw new Error('Failed to get FCM token: ' + err.message);
      }
    } else {
      throw new Error('Service Worker is not active');
    }
  } catch (error) {
    console.error('Error in requestFcmToken:', error);
    throw error;
  }
}

// listen for foreground messages
onMessage(messaging, (payload) => {
  const { title, body } = payload.notification;
  new Notification(title, {
    body: body
  });
});

export default messaging;
