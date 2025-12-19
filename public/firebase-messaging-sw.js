importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCwUKNY8I03LVghUKwemEhlS2WeDd7S1-g",
  authDomain: "salmara-f75c3.firebaseapp.com",
  projectId: "salmara-f75c3",
  storageBucket: "salmara-f75c3.firebasestorage.app",
  messagingSenderId: "981347013176",
  appId: "1:981347013176:web:ffa314e9dfd80ff5d4cccd",
  measurementId: "G-H3B071BLT3",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  });
});
