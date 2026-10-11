// ============================================
// Smooth Scroll Navigation
// ============================================

function scrollTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// Counter Animation for Statistics
// ============================================

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number
        if (target > 100) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current * 100) / 100;
        }
    }, 16);
}

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(element => {
    observer.observe(element);
});

// ============================================
// Form Submission Handler
// ============================================

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Show success message
    showNotification('Message sent successfully!', 'success');
    
    // Reset form
    form.reset();
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
}

// ============================================
// Notification System
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// Scroll Animations
// ============================================

const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            scrollObserver.unobserve(entry.target);
        }
    });
}, scrollObserverOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    scrollObserver.observe(card);
});

// Observe download cards
document.querySelectorAll('.download-card').forEach(card => {
    card.style.opacity = '0';
    scrollObserver.observe(card);
});

// ============================================
// Add CSS Keyframes for Animations
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Mobile Menu (Optional Enhancement)
// ============================================

function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Add mobile menu button if screen is small
    if (window.innerWidth < 768) {
        // Could add hamburger menu functionality here
    }
}

setupMobileMenu();
window.addEventListener('resize', setupMobileMenu);

// ============================================
// Lazy Loading Images (Future Enhancement)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Performance Monitoring
// ============================================

// Log page load time
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page Load Time: ' + pageLoadTime + 'ms');
});

// ============================================
// Service Worker Registration (PWA Ready)
// ============================================

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        // Service worker registration failed, app will work without it
    });
}

// ============================================
// Keyboard Navigation
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
    }
});

// ============================================
// Utility Functions
// ============================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ============================================
// Analytics Tracking (Template)
// ============================================

function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    // In production, send to analytics service
}

// Track button clicks
document.querySelectorAll('.btn, .download-btn').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('button_click', {
            buttonText: button.textContent,
            timestamp: new Date().toISOString()
        });
    });
});

// Track section views
document.querySelectorAll('section').forEach(section => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_view', {
                    sectionId: entry.target.id,
                    timestamp: new Date().toISOString()
                });
            }
        });
    });
    observer.observe(section);
});

console.log('IT World Jersey - Website initialized successfully!');