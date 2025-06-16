/**
 * QuantumCode Universe - Main Application Controller
 * Orchestrates all components and handles application lifecycle
 */

class QuantumApp {
    constructor() {
        this.engine = null;
        this.isLoaded = false;
        this.currentSection = 'home';
        this.loadingProgress = 0;
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    async init() {
        this.showLoader();
        await this.loadResources();
        this.setupEventListeners();
        this.startExperience();
    }
    
    /**
     * Show loading screen
     */
    showLoader() {
        const loader = document.getElementById('quantum-loader');
        const progressBar = document.getElementById('progress-bar');
        
        if (loader) {
            loader.style.display = 'flex';
        }
        
        // Simulate loading progress
        this.updateLoadingProgress(0);
    }
    
    /**
     * Update loading progress
     */
    updateLoadingProgress(progress) {
        this.loadingProgress = Math.min(progress, 100);
        const progressBar = document.getElementById('progress-bar');
        
        if (progressBar) {
            progressBar.style.width = `${this.loadingProgress}%`;
        }
        
        if (this.loadingProgress >= 100) {
            setTimeout(() => this.hideLoader(), 500);
        }
    }
    
    /**
     * Hide loading screen
     */
    hideLoader() {
        const loader = document.getElementById('quantum-loader');
        const container = document.getElementById('quantum-container');
        
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }
        
        if (container) {
            container.classList.remove('hidden');
            container.style.opacity = '0';
            setTimeout(() => {
                container.style.opacity = '1';
                container.style.transition = 'opacity 1s ease';
            }, 100);
        }
        
        this.isLoaded = true;
    }
    
    /**
     * Load external resources
     */
    async loadResources() {
        try {
            this.updateLoadingProgress(20);
            
            // Check if Three.js is loaded
            if (typeof THREE !== 'undefined') {
                this.updateLoadingProgress(40);
                
                // Initialize quantum engine
                if (typeof QuantumEngine !== 'undefined') {
                    this.engine = new QuantumEngine();
                    this.updateLoadingProgress(70);
                }
            }
            
            // Simulate additional loading time
            await this.delay(1000);
            this.updateLoadingProgress(100);
            
        } catch (error) {
            console.warn('Resource loading failed:', error);
            this.updateLoadingProgress(100);
        }
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        this.setupNavigation();
        this.setupHeroButtons();
        this.setupServiceCards();
        this.setupTechShowcase();
        this.setupContactForm();
    }
    
    /**
     * Setup navigation system
     */
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = item.getAttribute('data-section');
                this.navigateToSection(sectionId);
            });
        });
    }
    
    /**
     * Navigate to specific section
     */
    navigateToSection(sectionId) {
        // Update active states
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelectorAll('.quantum-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Activate new section
        const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
        const activeSection = document.getElementById(sectionId);
        
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
        
        if (activeSection) {
            activeSection.classList.add('active');
            this.currentSection = sectionId;
        }
    }
    
    /**
     * Setup hero section buttons
     */
    setupHeroButtons() {
        const startJourneyBtn = document.getElementById('start-journey');
        const enterVRBtn = document.getElementById('enter-vr');
        
        if (startJourneyBtn) {
            startJourneyBtn.addEventListener('click', () => {
                this.navigateToSection('dna-theater');
            });
        }
        
        if (enterVRBtn) {
            enterVRBtn.addEventListener('click', () => {
                this.showNotification('VR Experience coming soon!', 'info');
            });
        }
    }
    
    /**
     * Setup service cards interactions
     */
    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 60px rgba(6, 255, 165, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }
    
    /**
     * Setup tech showcase interactions
     */
    setupTechShowcase() {
        const techPlanets = document.querySelectorAll('.tech-planet');
        
        techPlanets.forEach(planet => {
            planet.addEventListener('click', () => {
                const techType = planet.getAttribute('data-tech');
                this.updateTechDetails(techType);
                
                // Visual feedback
                planet.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    planet.style.transform = '';
                }, 300);
            });
        });
    }
    
    /**
     * Update technology details
     */
    updateTechDetails(techType) {
        const techData = {
            quantum: {
                name: 'Quantum Computing',
                description: '量子ビットによる並列処理で、従来のコンピューティングの限界を超越'
            },
            neural: {
                name: 'Neural Interfaces', 
                description: '脳とコンピューターの直接接続により、思考での操作を実現'
            },
            reality: {
                name: 'Reality Engines',
                description: '現実を再構築し、物理法則を書き換える革新的エンジン'
            }
        };
        
        const data = techData[techType];
        if (data) {
            const nameElement = document.querySelector('.tech-name');
            const descElement = document.querySelector('.tech-description');
            
            if (nameElement) nameElement.textContent = data.name;
            if (descElement) descElement.textContent = data.description;
        }
    }
    
    /**
     * Setup contact form
     */
    setupContactForm() {
        const submitBtn = document.getElementById('submit-contact');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.submitContactForm();
            });
        }
    }
    
    /**
     * Submit contact form
     */
    submitContactForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            this.showNotification('すべてのフィールドを入力してください', 'error');
            return;
        }
        
        // Simulate form submission
        this.showNotification('メッセージが未来に送信されました！', 'success');
        
        // Reset form
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    }
    
    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: rgba(15, 23, 42, 0.95);
            border: 1px solid ${type === 'error' ? '#EF4444' : type === 'success' ? '#10B981' : '#3B82F6'};
            border-radius: 8px;
            color: white;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    /**
     * Start the quantum experience
     */
    startExperience() {
        console.log('🚀 QuantumCode Universe activated!');
        
        // Add some interactive effects
        this.addMouseTracker();
        this.addKeyboardShortcuts();
    }
    
    /**
     * Add mouse tracking for micro-interactions
     */
    addMouseTracker() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            document.documentElement.style.setProperty('--mouse-x', `${x}%`);
            document.documentElement.style.setProperty('--mouse-y', `${y}%`);
        });
    }
    
    /**
     * Add keyboard shortcuts
     */
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Escape key to return to home
            if (e.key === 'Escape') {
                this.navigateToSection('home');
            }
            
            // Number keys for quick navigation
            const sectionMap = {
                '1': 'home',
                '2': 'dna-theater', 
                '3': 'services',
                '4': 'tech',
                '5': 'contact'
            };
            
            if (sectionMap[e.key]) {
                this.navigateToSection(sectionMap[e.key]);
            }
        });
    }
    
    /**
     * Utility: Create delay promise
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.quantumApp = new QuantumApp();
    });
} else {
    window.quantumApp = new QuantumApp();
}