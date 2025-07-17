// DOM Elements
const lockScreen = document.getElementById('lockScreen');
const mainContent = document.getElementById('mainContent');
const enterBtn = document.getElementById('enterBtn');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Prevent scroll initially
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    enterBtn.addEventListener('click', handleEnterClick);
    
    // Handle Enter key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !lockScreen.classList.contains('hidden')) {
            handleEnterClick();
        }
    });
    
    // Prevent right-click on lock screen
    lockScreen.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});

// Handle enter button click
function handleEnterClick() {
    // Hide lock screen
    lockScreen.classList.add('hidden');
    
    // Show main content after transition
    setTimeout(() => {
        mainContent.classList.add('visible');
        document.body.style.overflow = 'auto';
        
        // Hide scroll indicator after some time
        setTimeout(() => {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 1s ease';
            }
        }, 3000);
    }, 300);
}

// Smooth scrolling for internal links (if any are added later)
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states for external links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[target="_blank"]')) {
        const originalText = e.target.textContent;
        e.target.textContent = 'Abriendo...';
        
        setTimeout(() => {
            e.target.textContent = originalText;
        }, 1000);
    }
});

// Add scroll-based animations
function handleScroll() {
    const elements = document.querySelectorAll('.project-card, .approach-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('scroll', handleScroll);

// Set initial states for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.project-card, .approach-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Performance optimization: throttle scroll events
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
        setTimeout(() => {
            ticking = false;
        }, 100);
    }
}

document.addEventListener('scroll', requestTick);