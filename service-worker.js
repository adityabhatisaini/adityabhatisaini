// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  // Optionally, you can add caching logic here
});

// Fetch event (placeholder for future caching logic)
self.addEventListener('fetch', (event) => {
  // Currently no caching logic implemented
});

// Import Firebase scripts
importScripts(
  'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging.js'
);

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDsRbOjyfeMwQd3hNmslBcw9LccKS6OWQk",
  projectId: "aditya-bhati",
  messagingSenderId: "13166605751",
  appId: "1:13166605751:web:ab5b96dbe4abb9cf0c2432"
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  const options = {
    body: body || 'No content available',
    icon: '/favicon.ico'
  };

  self.registration.showNotification(title || 'Notification', options);
});
