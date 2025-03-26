self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', (event) => {
  // You can cache requests here if needed
});

importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDsRbOjyfeMwQd3hNmslBcw9LccKS6OWQk",
    projectId: "aditya-bhati",
    messagingSenderId: "13166605751",
    appId: "1:13166605751:web:ab5b96dbe4abb9cf0c2432"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/favicon.ico'
    });
});
