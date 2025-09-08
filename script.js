// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initCounters();
    initContactForm();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special handling for different elements
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animationDelay = '0.2s';
                    entry.target.style.animationFillMode = 'forwards';
                }
                
                if (entry.target.classList.contains('skill-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Elements to observe
    const elementsToAnimate = document.querySelectorAll(`
        .timeline-item, 
        .achievement-card, 
        .skill-item,
        .contact-item,
        .about-highlights .highlight-item,
        .stat-item
    `);

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for floating cards
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const cards = document.querySelectorAll('.floating-card');
        
        cards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            card.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 40);
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');

    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value !== '') {
            input.parentNode.classList.add('focused');
        }
    });
}

// Send message function
function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const btn = document.querySelector('.btn-submit');

    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Show loading state
    //btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    //btn.disabled = true;

    // Simulate sending (replace with actual email service)
    setTimeout(() => {
        // Create mailto link
        const mailtoLink = `mailto:opeyemi5062@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
        
        // Reset button
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        
        showNotification('Message sent successfully! Your email client should open now.', 'success');
    }, 1000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentNode.remove()">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    // Add button styles
    const closeBtn = notification.querySelector('button');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for buttons
    const scrollButtons = document.querySelectorAll('a[href^="#"]');
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const text = nameElement.textContent;
        nameElement.textContent = '';
        nameElement.style.borderRight = '3px solid var(--primary-color)';
        
        let index = 0;
        const typingSpeed = 100;
        
        function type() {
            if (index < text.length) {
                nameElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    nameElement.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after a short delay
        setTimeout(type, 1000);
    }
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    initTypingEffect();
});

// Scroll to top functionality
function addScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.classList.add('scroll-to-top');
    
    // Add styles
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-1);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    addScrollToTop();
});

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Dark mode toggle (bonus feature)
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.title = 'Toggle Dark Mode';
    
    // Add styles
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        width: 45px;
        height: 45px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1rem;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        const isDark = document.body.classList.contains('dark-theme');
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Hover effect
    darkModeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-50%) scale(1.1)';
    });
    
    darkModeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-50%) scale(1)';
    });
}

// Initialize dark mode toggle (optional)
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment the line below if you want to add dark mode functionality
    // initDarkMode();
});

// Easter egg - Konami code
function initEasterEgg() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let userInput = [];
    
    document.addEventListener('keydown', function(e) {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
            showEasterEgg();
            userInput = [];
        }
    });
}

function showEasterEgg() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    
    showNotification('🎉 Konami Code activated! You found the Easter egg!', 'success');
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}vw;
        width: 10px;
        height: 10px;
        background: ${getRandomColor()};
        z-index: 10000;
        pointer-events: none;
        animation: confetti-fall 3s linear forwards;
    `;
    
    // Add confetti animation if not already added
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize Easter egg
document.addEventListener('DOMContentLoaded', function() {
    initEasterEgg();
});

// Custom cursor effect (optional enhancement)
function initCustomCursor() {
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    cursor.classList.add('custom-cursor');
    cursorFollower.classList.add('custom-cursor-follower');
    
    // Add cursor styles
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .custom-cursor {
            position: fixed;
            top: 0;
            left: 0;
            width: 8px;
            height: 8px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
        }
        
        .custom-cursor-follower {
            position: fixed;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s ease;
            opacity: 0.5;
        }
        
        .custom-cursor.hover {
            transform: scale(2);
        }
        
        .custom-cursor-follower.hover {
            transform: scale(1.5);
            opacity: 0.8;
        }
        
        body.custom-cursor-active {
            cursor: none;
        }
        
        body.custom-cursor-active a,
        body.custom-cursor-active button {
            cursor: none;
        }
    `;
    
    document.head.appendChild(cursorStyles);
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX - 4 + 'px';
        cursor.style.top = mouseY - 4 + 'px';
    });
    
    // Smooth follower animation
    function updateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX - 15 + 'px';
        cursorFollower.style.top = followerY - 15 + 'px';
        
        requestAnimationFrame(updateFollower);
    }
    
    updateFollower();
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .skill-item, .achievement-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
    
    // Enable custom cursor
    document.body.classList.add('custom-cursor-active');
}

// Intersection Observer for animations with more control
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.init();
    }
    
    init() {
        this.createObserver('fadeIn', {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.createObserver('slideUp', {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
    }
    
    createObserver(animationType, options) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, animationType);
                }
            });
        }, options);
        
        this.observers.set(animationType, observer);
    }
    
    animateElement(element, animationType) {
        switch(animationType) {
            case 'fadeIn':
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                break;
            case 'slideUp':
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                break;
        }
    }
    
    observe(element, animationType = 'fadeIn') {
        const observer = this.observers.get(animationType);
        if (observer) {
            // Set initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            observer.observe(element);
        }
    }
}

// Initialize animation controller
document.addEventListener('DOMContentLoaded', function() {
    const animationController = new AnimationController();
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(`
        .timeline-item,
        .achievement-card,
        .skill-item,
        .contact-item,
        .highlight-item
    `);
    
    elementsToAnimate.forEach(el => {
        animationController.observe(el, 'fadeIn');
    });
});

// Preloader functionality
//function initPreloader() {
    // Create preloader
  //  const preloader = document.createElement('div');
    //preloader.id = 'preloader';
    //preloader.innerHTML = `
      //  <div class="preloader-content">
        //    <div class="preloader-logo">Opeyemi Olaifa</div>
          //  <div class="preloader-spinner">
            //    <div class="spinner"></div>
            //</div>
            //<div class="preloader-text">Loading Portfolio...</div>
        //</div>
    //`;
    
    // Add preloader styles
 //   const preloaderStyles = document.createElement('style');
   // preloaderStyles.textContent = `
    //    #preloader {
    //        position: fixed;
    //        top: 0;
    //        left: 0;
    //        width: 100%;
    //        height: 100%;
    //        background: linear-gradient(135deg, #2d5a50 0%, #4a7c59 100%);
    //        display: flex;
    //        align-items: center;
    //        justify-content: center;
    //        z-index: 10000;
    //        transition: opacity 0.5s ease;
    //    }
        
    //    .preloader-content {
    //        text-align: center;
    //        color: white;
    //    }
        
    //    .preloader-logo {
    //        font-size: 2rem;
    //        font-weight: 700;
    //        margin-bottom: 2rem;
    //        opacity: 0;
    //        animation: fadeInUp 1s ease 0.5s forwards;
    //    }
        
    //    .preloader-spinner {
    //        margin: 2rem 0;
    //    }
        
    //    .spinner {
    //        width: 50px;
    //        height: 50px;
    //        border: 3px solid rgba(255, 255, 255, 0.3);
    //        border-top: 3px solid white;
    //        border-radius: 50%;
    //        animation: spin 1s linear infinite;
    //        margin: 0 auto;
    //    }
        
    //    .preloader-text {
    //        font-size: 1rem;
    //        opacity: 0.8;
    //        opacity: 0;
    //        animation: fadeInUp 1s ease 1s forwards;
    //    }
        
    //    @keyframes spin {
    //        0% { transform: rotate(0deg); }
    //        100% { transform: rotate(360deg); }
    //    }
        
    //    @keyframes fadeInUp {
    //        from {
    //            opacity: 0;
    //            transform: translateY(20px);
    //        }
    //        to {
    //            opacity: 1;
    //            transform: translateY(0);
    //        }
    //    }
    //`;
    
    //document.head.appendChild(preloaderStyles);
    //document.body.appendChild(preloader);
    
    // Hide preloader when page is fully loaded
    //window.addEventListener('load', function() {
      //  setTimeout(() => {
        //    preloader.style.opacity = '0';
          //  setTimeout(() => {
            //    preloader.remove();
            //}, 500);
        //}, 1500); // Show preloader for at least 1.5 seconds
    //});
//}

// Initialize preloader
//document.addEventListener('DOMContentLoaded', function() {
  //  initPreloader();
//});

// Page visibility API for performance optimization
function initPageVisibility() {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden, pause animations or reduce activity
            document.body.style.animationPlayState = 'paused';
        } else {
            // Page is visible, resume animations
            document.body.style.animationPlayState = 'running';
        }
    });
}

// Initialize page visibility optimization
document.addEventListener('DOMContentLoaded', function() {
    initPageVisibility();
});

// Print styles handler
function initPrintStyles() {
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            .navbar,
            .hamburger,
            .floating-card,
            .scroll-to-top,
            .dark-mode-toggle,
            #preloader {
                display: none !important;
            }
            
            body {
                font-size: 12pt;
                line-height: 1.4;
            }
            
            .hero {
                min-height: auto;
                page-break-after: always;
            }
            
            .section-title {
                color: #2d5a50 !important;
                page-break-after: avoid;
            }
            
            .timeline-item,
            .achievement-card,
            .contact-item {
                page-break-inside: avoid;
                margin-bottom: 1rem;
            }
            
            .hero-image {
                display: none;
            }
            
            a {
                color: #2d5a50 !important;
                text-decoration: underline;
            }
        }
    `;
    
    document.head.appendChild(printStyles);
}

// Initialize print styles
document.addEventListener('DOMContentLoaded', function() {
    initPrintStyles();
});

// Final initialization check
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Opeyemi Olaifa Portfolio - All systems loaded!');
    
    // Check if all critical elements are present
    const criticalElements = [
        '.navbar',
        '.hero',
        '.about',
        '.experience',
        '.skills',
        '.contact'
    ];
    
    criticalElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`⚠️ Critical element missing: ${selector}`);
        }
    });
    
    // Performance timing
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`📊 Page load time: ${loadTime}ms`);
    }
});