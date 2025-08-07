// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Deal countdown timers
function updateCountdown(element, expiry) {
    const now = new Date().getTime();
    const distance = expiry - now;

    if (distance < 0) {
        element.innerHTML = '<span class="timer__expired">Expired</span>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = element.querySelector('.timer__days');
    const hoursEl = element.querySelector('.timer__hours');
    const minutesEl = element.querySelector('.timer__minutes');
    const secondsEl = element.querySelector('.timer__seconds');

    if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// Initialize countdown timers
document.querySelectorAll('.deal__timer').forEach(timer => {
    const expiryDate = new Date(timer.dataset.expires).getTime();
    const countdownEl = timer.querySelector('.timer__countdown');
    
    updateCountdown(countdownEl, expiryDate);
    
    setInterval(() => {
        updateCountdown(countdownEl, expiryDate);
    }, 1000);
});

// Modal functionality
const modal = document.getElementById('code-modal');
const modalCode = document.getElementById('modal-code');
const modalClose = document.querySelector('.modal__close');
const copyCodeBtn = document.getElementById('copy-code');

// Deal button handlers
document.querySelectorAll('.deal__btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const code = btn.dataset.code;
        
        if (code && (btn.textContent.includes('Get Code') || btn.textContent.includes('Reveal Code'))) {
            modalCode.textContent = code;
            modal.style.display = 'block';
        } else {
            // For "Grab Deal", "View Deal", etc. - simulate opening store
            btn.textContent = 'Opening Store...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.textContent = 'Store Opened';
                btn.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    btn.textContent = btn.textContent.includes('Grab') ? 'Grab Deal' : 'View Deal';
                    btn.style.opacity = '1';
                    btn.style.backgroundColor = '';
                }, 2000);
            }, 1000);
        }
    });
});

// Modal close handlers
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Copy code functionality
copyCodeBtn.addEventListener('click', () => {
    const code = modalCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
        copyCodeBtn.textContent = 'Copied!';
        copyCodeBtn.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            copyCodeBtn.textContent = 'Copy Code';
            copyCodeBtn.style.backgroundColor = '';
        }, 2000);
    });
});

// Newsletter subscription
const newsletterBtn = document.querySelector('.newsletter__btn');
const newsletterInput = document.querySelector('.newsletter__input');

newsletterBtn.addEventListener('click', () => {
    const email = newsletterInput.value.trim();
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    newsletterBtn.textContent = 'Subscribing...';
    newsletterBtn.style.opacity = '0.7';
    
    setTimeout(() => {
        newsletterBtn.textContent = 'Subscribed!';
        newsletterBtn.style.backgroundColor = '#10b981';
        newsletterInput.value = '';
        
        setTimeout(() => {
            newsletterBtn.textContent = 'Subscribe';
            newsletterBtn.style.backgroundColor = '';
            newsletterBtn.style.opacity = '1';
        }, 3000);
    }, 1500);
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Search functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.querySelector('.search__button');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        // Simulate search - in real app, this would redirect to search results
        alert(`Searching for: "${query}"\nThis would redirect to search results page.`);
    }
}

// Category card click handlers
document.querySelectorAll('.category__card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.category__title').textContent;
        // Simulate navigation to category page
        window.location.href = `categories.html#${title.toLowerCase().replace(/\s+/g, '-')}`;
    });
});

// Smooth scroll for anchor links
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

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Performance: Lazy load images that are not in viewport
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));