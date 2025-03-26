let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a'); // Fixed typo

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) { // Corrected condition
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsRbOjyfeMwQd3hNmslBcw9LccKS6OWQk",
  authDomain: "aditya-bhati.firebaseapp.com",
  projectId: "aditya-bhati",
  storageBucket: "aditya-bhati.firebasestorage.app",
  messagingSenderId: "13166605751",
  appId: "1:13166605751:web:ab5b96dbe4abb9cf0c2432",
  measurementId: "G-KZD96WGZHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Request Notification Permission
function requestPermission() {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            getFCMToken();
        } else {
            console.log('Notification permission denied.');
        }
    });
}

// Get FCM Token
function getFCMToken() {
    messaging.getToken({ vapidKey:'BN6nwElNtDv9MQ38-L4VMDgxCSOHDrEdFsi_rxkf3GCSrxeaDEdvP4PLwraAF8KJ3Dr2fvqTVP2VrkyTL4KU_Fc'})
        .then((currentToken) => {
            if (currentToken) {
                console.log('FCM Token:', currentToken);
                // Send this token to your backend to send push notifications
            } else {
                console.log('No registration token available.');
            }
        }).catch((err) => {
            console.log('Error getting token', err);
        });
}

requestPermission();
