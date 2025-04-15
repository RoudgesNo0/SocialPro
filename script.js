// Mobile Detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Initialize AOS (Animate On Scroll) with mobile optimizations
AOS.init({
    duration: isMobile ? 600 : 800,
    easing: 'ease-in-out',
    once: isMobile, // Set to true on mobile for better performance
    mirror: false,
    disable: window.innerWidth < 768 ? 'phone' : false // Disable on very small devices
});

// Custom Cursor (only on desktop)
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!isMobile && cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            cursorFollower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });

        // Effect on links and buttons
        document.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.width = '30px';
                cursorFollower.style.height = '30px';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
            });
        });
    } else {
        // Hide cursor elements on mobile
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    }
});

// Modal functionality with mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Modal elements
    const projectModal = document.getElementById('project-modal');
    const newsletterModal = document.getElementById('newsletter-modal');
    
    // Open buttons
    const openProjectBtn = document.getElementById('open-project-modal');
    const openNewsletterBtn = document.getElementById('open-newsletter-modal');
    const footerNewsletterBtn = document.getElementById('footer-newsletter-btn');
    const pricingStarterBtn = document.getElementById('pricing-starter-btn');
    const pricingProfessionalBtn = document.getElementById('pricing-professional-btn');
    const pricingEnterpriseBtn = document.getElementById('pricing-enterprise-btn');
    
    // Close buttons
    const projectModalClose = document.getElementById('project-modal-close');
    const newsletterModalClose = document.getElementById('newsletter-modal-close');
    
    // Function to open modal with mobile considerations
    const openModal = (modal, packageOption = null) => {
        if (!modal) return;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add mobile-specific class if on mobile
        if (isMobile) {
            const modalContent = modal.querySelector('.modal');
            if (modalContent) modalContent.classList.add('mobile');
        }
        
        // Pre-select package if provided
        if (packageOption && modal === projectModal) {
            const packageSelect = document.querySelector('#project-form select');
            if (packageSelect) {
                // Remove previously added options
                Array.from(packageSelect.options).forEach(option => {
                    if (['starter', 'professional', 'enterprise'].includes(option.value)) {
                        packageSelect.removeChild(option);
                    }
                });
                
                // Add new option
                const option = document.createElement('option');
                option.value = packageOption;
                option.textContent = packageOption.charAt(0).toUpperCase() + packageOption.slice(1) + ' Paket';
                option.selected = true;
                packageSelect.appendChild(option);
            }
        }
    };
    
    // Function to close modal
    const closeModal = (modal) => {
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    
    // Open modals
    if (openProjectBtn) {
        openProjectBtn.addEventListener('click', () => openModal(projectModal));
    }
    
    if (openNewsletterBtn) {
        openNewsletterBtn.addEventListener('click', () => openModal(newsletterModal));
    }
    
    if (footerNewsletterBtn) {
        footerNewsletterBtn.addEventListener('click', () => openModal(newsletterModal));
    }
    
    // Pricing buttons open project modal
    if (pricingStarterBtn) {
        pricingStarterBtn.addEventListener('click', () => openModal(projectModal, 'starter'));
    }
    
    if (pricingProfessionalBtn) {
        pricingProfessionalBtn.addEventListener('click', () => openModal(projectModal, 'professional'));
    }
    
    if (pricingEnterpriseBtn) {
        pricingEnterpriseBtn.addEventListener('click', () => openModal(projectModal, 'enterprise'));
    }
    
    // Close modals
    if (projectModalClose) {
        projectModalClose.addEventListener('click', () => closeModal(projectModal));
    }
    
    if (newsletterModalClose) {
        newsletterModalClose.addEventListener('click', () => closeModal(newsletterModal));
    }
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal(projectModal);
        }
        if (e.target === newsletterModal) {
            closeModal(newsletterModal);
        }
    });
    
    // Form submissions
    const projectForm = document.getElementById('project-form');
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze bei Ihnen melden.';
            
            projectForm.style.display = 'none';
            projectForm.parentNode.appendChild(successMessage);
            
            // Close modal after delay
            setTimeout(() => {
                closeModal(projectModal);
                
                // Reset form
                setTimeout(() => {
                    projectForm.reset();
                    projectForm.style.display = 'block';
                    successMessage.remove();
                }, 500);
            }, 3000);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Vielen Dank für Ihre Anmeldung! Sie erhalten in Kürze eine Bestätigungs-E-Mail.';
            
            newsletterForm.style.display = 'none';
            newsletterForm.parentNode.appendChild(successMessage);
            
            // Close modal after delay
            setTimeout(() => {
                closeModal(newsletterModal);
                
                // Reset form
                setTimeout(() => {
                    newsletterForm.reset();
                    newsletterForm.style.display = 'block';
                    successMessage.remove();
                }, 500);
            }, 3000);
        });
    }
});

// Smooth scrolling for navigation links with mobile optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Adjust offset for copyright banner
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const bannerHeight = document.querySelector('.copyright-banner').offsetHeight;
            const offset = navHeight + bannerHeight;
            
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: isMobile ? 'auto' : 'smooth' // Use auto for better performance on mobile
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const menuBtn = document.querySelector('.menu-btn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuBtn) menuBtn.classList.remove('active');
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle with improved touch handling
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            e.target !== menuBtn) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
    
    // Close menu when pressing escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
}

// Staggered animation for service cards with reduced delay on mobile
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${isMobile ? index * 0.1 : index * 0.2}s`;
    });
});

// Typing effect for hero text (disabled on smaller mobile devices for better performance)
document.addEventListener('DOMContentLoaded', () => {
    const heroHeading = document.querySelector('.hero-text h1');
    
    if (heroHeading && window.innerWidth > 480) {
        const text = heroHeading.textContent;
        heroHeading.innerHTML = '';
        
        let i = 0;
        const typingSpeed = isMobile ? 50 : 100; // Faster on mobile
        
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                heroHeading.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, typingSpeed);
    }
});

// Parallax scrolling effect (disabled on mobile for better performance)
if (!isMobile) {
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        const heroElements = document.querySelectorAll('.floating-elements .element');
        
        heroElements.forEach((element, index) => {
            element.style.transform = `translateY(${scrollValue * (0.1 * (index + 1))}px)`;
        });
    });
}

// Optimized intersection observer configuration
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: isMobile ? 0.1 : 0.2 // Lower threshold on mobile for earlier triggering
};

// Add animation class when element comes into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Unobserve after animation for better performance on mobile
            if (isMobile) {
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .pricing-card, .portfolio-item').forEach(item => {
    observer.observe(item);
});

// Add animation class to service features with reduced delay on mobile
document.querySelectorAll('.service-features li').forEach((item, index) => {
    item.style.transitionDelay = `${isMobile ? index * 0.05 : index * 0.1}s`;
    observer.observe(item);
});

// Initialize counter animation for stats with optimized duration for mobile
function animateCounter(el, start = 0, end, duration = isMobile ? 1000 : 2000) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.textContent.replace(/[^0-9]/g, '');
            if (statValue) {
                animateCounter(entry.target, 0, parseInt(statValue));
                
                // Unobserve after animation for better performance
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card h3, .stat-item h3, .portfolio-stats .stat span').forEach(stat => {
    statsObserver.observe(stat);
});

// Add resize handler for better mobile experience
window.addEventListener('resize', () => {
    // Reinitialize AOS on resize
    AOS.refresh();
    
    // Close mobile menu if window is resized wider
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuBtn) menuBtn.classList.remove('active');
    }
}); 