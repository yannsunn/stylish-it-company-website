// ==========================================================================
// Main JavaScript - Site Integration & Global Functionality
// ==========================================================================

class InnovateTechSite {
    constructor() {
        this.isLoaded = false;
        this.currentSection = 'home';
        this.scrollPosition = 0;
        this.isScrolling = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupHeaderAnimation();
        this.setupHeroAnimation();
        this.setupParallaxEffects();
        this.setupFormHandling();
        this.initializeComponents();
        
        // Mark as loaded
        document.body.classList.add('loaded');
        this.isLoaded = true;
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // CTA buttons
        document.querySelectorAll('.cta-button').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCTAClick(e));
        });
        
        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('load', () => this.handleWindowLoad());
        
        // Touch events for mobile
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.updateActiveNavigation(sectionId);
                    this.triggerSectionAnimations(entry.target);
                }
            });
        }, options);
        
        // Observe all sections
        document.querySelectorAll('section[id]').forEach(section => {
            this.observer.observe(section);
        });
    }
    
    updateActiveNavigation(sectionId) {
        // Update navigation active state
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        this.currentSection = sectionId;
    }
    
    triggerSectionAnimations(section) {
        // Add fade-in animation to section elements
        const animatedElements = section.querySelectorAll(
            '.section-title, .section-subtitle, .poetry-gallery, .dna-container, .office-container, .contact-content'
        );
        
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in-up');
            }, index * 100);
        });
    }
    
    setupSmoothScrolling() {
        // Enhanced smooth scrolling for better UX
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            });
        });
    }
    
    smoothScrollTo(element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }
    
    setupHeaderAnimation() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    setupHeroAnimation() {
        const heroCanvas = document.getElementById('hero-canvas');
        if (!heroCanvas) return;
        
        this.createHeroVisualization(heroCanvas);
    }
    
    createHeroVisualization(canvas) {
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 50;
        
        // Resize canvas
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Update particle position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1000})`;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * (element.dataset.parallax || 0.5);
                element.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        });
    }
    
    setupFormHandling() {
        const contactForm = document.querySelector('.contact-form form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(contactForm);
        });
    }
    
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = '送信中...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showNotification('お問い合わせありがとうございます！後日ご連絡いたします。', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#6366f1',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    initializeComponents() {
        // Initialize all major components
        this.initCodePoetry();
        this.initTechDNA();
        this.initVirtualOffice();
    }
    
    initCodePoetry() {
        // Code Poetry Gallery is initialized in its own file
        // Add any additional integration here
        console.log('Code Poetry Gallery initialized');
    }
    
    initTechDNA() {
        // Tech DNA Storytelling is initialized in its own file
        // Add any additional integration here
        console.log('Tech DNA Storytelling initialized');
    }
    
    initVirtualOffice() {
        // Virtual Office Experience is initialized in its own file
        // Add any additional integration here
        console.log('Virtual Office Experience initialized');
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                this.smoothScrollTo(targetElement);
            }
        }
    }
    
    handleCTAClick(e) {
        const action = e.target.dataset.action;
        
        switch (action) {
            case 'start-experience':
                this.smoothScrollTo(document.getElementById('code-poetry'));
                break;
            case 'virtual-office':
                this.smoothScrollTo(document.getElementById('virtual-office'));
                break;
            default:
                // Default behavior
                break;
        }
    }
    
    handleScroll() {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        this.scrollPosition = window.pageYOffset;
        
        requestAnimationFrame(() => {
            this.updateScrollEffects();
            this.isScrolling = false;
        });
    }
    
    updateScrollEffects() {
        // Add custom scroll effects here
        const scrollProgress = Math.min(this.scrollPosition / (document.body.scrollHeight - window.innerHeight), 1);
        
        // Update any scroll-based animations or effects
        document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    }
    
    handleResize() {
        // Handle responsive adjustments
        this.debounce(() => {
            // Trigger resize events for components
            window.dispatchEvent(new Event('component-resize'));
        }, 250)();
    }
    
    handleWindowLoad() {
        // Remove any loading states
        document.body.classList.add('fully-loaded');
        
        // Trigger entrance animations
        this.triggerEntranceAnimations();
    }
    
    triggerEntranceAnimations() {
        const animatedElements = document.querySelectorAll('.hero-content, .hero-visual');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in-up');
            }, index * 200);
        });
    }
    
    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }
    
    handleTouchEnd(e) {
        this.touchEndY = e.changedTouches[0].clientY;
        this.handleSwipe();
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchStartY - this.touchEndY;
        
        if (Math.abs(swipeDistance) < swipeThreshold) return;
        
        if (swipeDistance > 0) {
            // Swipe up - next section
            this.navigateToNextSection();
        } else {
            // Swipe down - previous section
            this.navigateToPrevSection();
        }
    }
    
    navigateToNextSection() {
        const sections = ['home', 'code-poetry', 'tech-dna', 'virtual-office', 'contact'];
        const currentIndex = sections.indexOf(this.currentSection);
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        
        if (nextIndex !== currentIndex) {
            const nextSection = document.getElementById(sections[nextIndex]);
            if (nextSection) {
                this.smoothScrollTo(nextSection);
            }
        }
    }
    
    navigateToPrevSection() {
        const sections = ['home', 'code-poetry', 'tech-dna', 'virtual-office', 'contact'];
        const currentIndex = sections.indexOf(this.currentSection);
        const prevIndex = Math.max(currentIndex - 1, 0);
        
        if (prevIndex !== currentIndex) {
            const prevSection = document.getElementById(sections[prevIndex]);
            if (prevSection) {
                this.smoothScrollTo(prevSection);
            }
        }
    }
    
    handleKeydown(e) {
        // Keyboard navigation
        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                this.navigateToNextSection();
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.navigateToPrevSection();
                break;
            case 'Home':
                e.preventDefault();
                this.smoothScrollTo(document.getElementById('home'));
                break;
            case 'End':
                e.preventDefault();
                this.smoothScrollTo(document.getElementById('contact'));
                break;
        }
    }
    
    debounce(func, wait) {
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
    
    // Public API methods
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            this.smoothScrollTo(section);
        }
    }
    
    getCurrentSection() {
        return this.currentSection;
    }
    
    isPageLoaded() {
        return this.isLoaded;
    }
}

// Global utility functions
function scrollToSection(sectionId) {
    if (window.innovateTechSite) {
        window.innovateTechSite.scrollToSection(sectionId);
    }
}

function showNotification(message, type = 'info') {
    if (window.innovateTechSite) {
        window.innovateTechSite.showNotification(message, type);
    }
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                console.log(`Page load time: ${loadTime}ms`);
                
                // Send to analytics if needed
                if (loadTime > 3000) {
                    console.warn('Page load time is above optimal threshold');
                }
            }, 0);
        });
    }
}

// Initialize error handling
function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // Could send to error reporting service
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        // Could send to error reporting service
    });
}

// Initialize the site when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupErrorHandling();
    measurePerformance();
    
    // Initialize main site functionality
    window.innovateTechSite = new InnovateTechSite();
    
    console.log('InnovateTech site initialized successfully');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InnovateTechSite;
}