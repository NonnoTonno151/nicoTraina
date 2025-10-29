// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with reveal class
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(element => {
    observer.observe(element);
});

// Gallery items animation with stagger effect
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100); // Stagger animation by 100ms
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

galleryItems.forEach(item => {
    galleryObserver.observe(item);
});

// About section animation
const aboutText = document.querySelector('.about-text');
const aboutImage = document.querySelector('.about-image');

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutText.classList.add('active');
            aboutImage.classList.add('active');
        }
    });
}, {
    threshold: 0.2
});

if (aboutText && aboutImage) {
    aboutObserver.observe(aboutText);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');

    if (hero) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// Image lazy loading optimization
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Add smooth hover effect to gallery images
const imageWrappers = document.querySelectorAll('.image-wrapper');
imageWrappers.forEach(wrapper => {
    wrapper.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    wrapper.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        const rotateY = percentX * 5;
        const rotateX = -percentY * 5;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    wrapper.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.id = 'scroll-progress';
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(to right, #000, #333);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Add cursor follower effect (optional, minimal)
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
cursor.style.cssText = `
    width: 10px;
    height: 10px;
    border: 2px solid #000;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease, opacity 0.3s ease;
    opacity: 0;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 5 + 'px';
    cursor.style.top = e.clientY - 5 + 'px';
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Enlarge cursor on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .image-wrapper');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2.5)';
        cursor.style.borderColor = '#666';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#000';
    });
});

// Smooth scroll reveal for contact section
const contactContent = document.querySelector('.contact-content');
if (contactContent) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.3
    });

    contactContent.style.opacity = '0';
    contactContent.style.transform = 'translateY(50px)';
    contactContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

    contactObserver.observe(contactContent);
}

// Add fade-in animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events for better performance
const throttledScroll = throttle(() => {
    // Custom scroll logic here if needed
}, 100);

window.addEventListener('scroll', throttledScroll);

console.log('Portfolio initialized with smooth animations ✨');
