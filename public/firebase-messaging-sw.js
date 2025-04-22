// Scripts for firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the config
firebase.initializeApp({
  apiKey: "AIzaSyCw5AESi-dVPbS2aJ8f7q8HNXO-zVcwutI",
  authDomain: "playground-27c46.firebaseapp.com",
  databaseURL: "https://playground-27c46-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "playground-27c46",
  storageBucket: "playground-27c46.firebasestorage.app",
  messagingSenderId: "494334085855",
  appId: "1:494334085855:web:d1afa9ff107c420346776a"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
});

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
}); 