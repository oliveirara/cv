// Import styles for Vite bundling
import './styles.css';

// ===========================
// Navigation & Scroll Effects
// ===========================
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    });
});

// ===========================
// Typing Animation
// ===========================
const textArray = [
    'AI Specialist',
    'AI Architect',
    'Machine Learning Engineer',
    'MLOps Engineer',
    'LLM Engineer',
    'Computer Vision Engineer',
    'Data Analyst',
    'Data Engineer',
    'Data Scientist',
    'Research Scientist',
    'Physicist',
    'Astrophysicist',
];
const typingSpeed = 100;
const erasingSpeed = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingSpeed + 500);
    }
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, newTextDelay + 250);
});

// ===========================
// Scroll Reveal Animation
// ===========================
const revealElements = document.querySelectorAll(
    '.glass-card, .timeline-item, .skill-category, .education-card, .publication-item'
);

function reveal() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('reveal', 'active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Initial check for elements already in view
reveal();

// ===========================
// Active Navigation Link
// ===========================
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document
                .querySelector('.nav-menu a[href*=' + sectionId + ']')
                ?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===========================
// Parallax Effect for Background Particles
// ===========================
const particles = document.querySelectorAll('.particle');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    particles.forEach((particle, index) => {
        const speed = 0.5 + index * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===========================
// Card Tilt Effect - REMOVED
// ===========================
// Tilt effect has been removed for a cleaner, more professional look

// ===========================
// Dynamic Particle Generation
// ===========================
function createFloatingParticles() {
    const bgAnimation = document.querySelector('.bg-animation');

    // Add more subtle particles
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-dot';
        const colors = [
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(0, 255, 136, 0.8)',
            'rgba(255, 0, 128, 0.8)',
            'rgba(178, 102, 255, 0.8)',
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${randomColor};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatDot ${5 + Math.random() * 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            box-shadow: 0 0 10px ${randomColor};
        `;
        bgAnimation.appendChild(particle);
    }
}

// Add floating dots animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatDot {
        0%, 100% { transform: translate(0, 0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

createFloatingParticles();

// ===========================
// Performance Optimization
// ===========================
let ticking = false;

function optimizedScroll(callback) {
    return function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                callback();
                ticking = false;
            });
            ticking = true;
        }
    };
}

window.addEventListener(
    'scroll',
    optimizedScroll(() => {
        scrollActive();
        reveal();
    })
);

// ===========================
// Loading Animation
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate elements on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===========================
// Contact Method Click Analytics (Optional)
// ===========================
const contactMethods = document.querySelectorAll('.contact-method');

contactMethods.forEach(method => {
    method.addEventListener('click', e => {
        // Add visual feedback
        method.style.transform = 'scale(0.95)';
        setTimeout(() => {
            method.style.transform = '';
        }, 150);
    });
});

// ===========================
// Intersection Observer for Better Performance
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all reveal elements
revealElements.forEach(el => observer.observe(el));

// ===========================
// Glitch Effect on Hover (Optional)
// ===========================
const glitchTitle = document.querySelector('.glitch');

if (glitchTitle) {
    glitchTitle.addEventListener('mouseenter', () => {
        glitchTitle.classList.add('glitch-active');
    });

    glitchTitle.addEventListener('mouseleave', () => {
        glitchTitle.classList.remove('glitch-active');
    });
}

// ===========================
// Realistic Star Field
// ===========================
function createRealisticStarField() {
    const bgAnimation = document.querySelector('.bg-animation');

    // Create multiple layers of stars with different sizes and colors
    const starLayers = [
        { count: 60, size: 1, color: 'rgba(255, 255, 255, 0.9)', speed: 0.1, twinkle: 2 },
        { count: 40, size: 1.5, color: 'rgba(255, 255, 255, 0.7)', speed: 0.2, twinkle: 3 },
        { count: 20, size: 2, color: 'rgba(0, 255, 136, 0.6)', speed: 0.3, twinkle: 4 },
        { count: 15, size: 2.5, color: 'rgba(255, 0, 128, 0.5)', speed: 0.4, twinkle: 5 },
        { count: 10, size: 3, color: 'rgba(178, 102, 255, 0.5)', speed: 0.5, twinkle: 6 },
    ];

    starLayers.forEach(layer => {
        for (let i = 0; i < layer.count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.setAttribute('data-speed', layer.speed);
            star.style.cssText = `
                position: absolute;
                width: ${layer.size}px;
                height: ${layer.size}px;
                background: ${layer.color};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: twinkle ${layer.twinkle + Math.random() * 2}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 ${layer.size * 2}px ${layer.color};
            `;
            bgAnimation.appendChild(star);
        }
    });
}

createRealisticStarField();

// ===========================
// Subtle Hover Effects
// ===========================
function addSubtleHoverEffects() {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
}

addSubtleHoverEffects();

// ===========================
// Subtle Background Animation
// ===========================
function createSubtleBackground() {
    const bgAnimation = document.querySelector('.bg-animation');

    function updateGradient() {
        const time = Date.now() * 0.0005;
        const x = Math.sin(time) * 20 + 50;
        const y = Math.cos(time * 0.7) * 20 + 50;

        bgAnimation.style.background = `
            radial-gradient(ellipse at ${x}% ${y}%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
            radial-gradient(ellipse at ${100 - x}% ${100 - y}%, rgba(0, 255, 136, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255, 0, 128, 0.02) 0%, transparent 50%),
            linear-gradient(180deg, #000000 0%, #000000 100%)
        `;
    }

    setInterval(updateGradient, 2000);
}

createSubtleBackground();

// ===========================
// Realistic Star Parallax
// ===========================
function addRealisticStarParallax() {
    const stars = document.querySelectorAll('.star');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        stars.forEach(star => {
            const speed = parseFloat(star.getAttribute('data-speed'));
            const rate = scrolled * -speed;
            star.style.transform = `translateY(${rate}px)`;
        });
    });
}

addRealisticStarParallax();

// ===========================
// Subtle Cursor Effects
// ===========================
function addSubtleCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        opacity: 0.8;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX - 4 + 'px';
        cursor.style.top = e.clientY - 4 + 'px';
    });

    // Subtle scale on hover
    const interactiveElements = document.querySelectorAll('a, button, .glass-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

addSubtleCursorEffects();

// ===========================
// Console Easter Egg - Refined
// ===========================
console.log(
    "%c🚀 Welcome to Renan's Portfolio!",
    'color: #ffffff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #ffffff;'
);
console.log(
    '%c✨ Now featuring spatial dark theme with white stars and colorful accents',
    'color: #00ff88; font-size: 14px; text-shadow: 0 0 5px #00ff88;'
);
console.log(
    '%c🔗 Interested in the code? Check it out on GitHub: https://github.com/oliveirara',
    'color: #b266ff; font-size: 14px; text-shadow: 0 0 5px #b266ff;'
);
console.log(
    "%c🤝 Looking for a talented AI Specialist / Data Scientist? Let's connect!",
    'color: #ff0080; font-size: 14px; text-shadow: 0 0 5px #ff0080;'
);
