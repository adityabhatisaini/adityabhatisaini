let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a'); // Fixed typo

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 1000);
});

// Theme toggle functionality
let themeToggle = document.querySelector('.theme-toggle');
let themeIcon = document.querySelector('#theme-icon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    } else {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    }
});

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

// Scroll to top functionality
let scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form validation and submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const phone = contactForm.phone_number.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();
    
    if (!name || !email || !phone || !subject || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading message
    showMessage('Sending message...', 'success');
    
    // Submit form
    const formData = new FormData(contactForm);
    
    fetch(contactForm.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            showMessage('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            showMessage('Failed to send message. Please try again.', 'error');
        }
    })
    .catch(error => {
        showMessage('Network error. Please try again later.', 'error');
    });
});

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = type;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skills-box, .project-box, .timeline-item, .services-box').forEach(el => {
    observer.observe(el);
});