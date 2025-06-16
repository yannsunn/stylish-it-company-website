/**
 * Quantum-CDN Implementation
 * AI-powered predictive content delivery with lazy loading
 */

class QuantumCDN {
    constructor() {
        this.observer = null;
        this.imageCache = new Map();
        this.loadedImages = new Set();
        this.performanceMetrics = {
            loadTimes: [],
            cacheHits: 0,
            predictions: []
        };
        
        this.init();
    }

    init() {
        // Initialize Intersection Observer for lazy loading
        this.setupIntersectionObserver();
        
        // Setup predictive preloading
        this.setupPredictiveLoading();
        
        // Setup image optimization
        this.setupImageOptimization();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        console.log('Quantum-CDN initialized successfully');
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadLazyContent(entry.target);
                }
            });
        }, options);

        // Observe all lazy elements
        this.observeLazyElements();
    }

    observeLazyElements() {
        // Lazy images
        const lazyImages = document.querySelectorAll('[data-lazy-src]');
        lazyImages.forEach(img => this.observer.observe(img));

        // Lazy backgrounds
        const lazyBackgrounds = document.querySelectorAll('[data-lazy-bg]');
        lazyBackgrounds.forEach(bg => this.observer.observe(bg));

        // Lazy content sections
        const lazyContent = document.querySelectorAll('[data-lazy-content]');
        lazyContent.forEach(content => this.observer.observe(content));
    }

    async loadLazyContent(element) {
        const startTime = performance.now();

        try {
            if (element.hasAttribute('data-lazy-src')) {
                await this.loadLazyImage(element);
            } else if (element.hasAttribute('data-lazy-bg')) {
                await this.loadLazyBackground(element);
            } else if (element.hasAttribute('data-lazy-content')) {
                await this.loadLazySection(element);
            }

            // Record performance
            const loadTime = performance.now() - startTime;
            this.performanceMetrics.loadTimes.push(loadTime);

            // Stop observing this element
            this.observer.unobserve(element);

        } catch (error) {
            console.error('Quantum-CDN: Failed to load content', error);
            // Fallback mechanism
            this.handleLoadError(element);
        }
    }

    async loadLazyImage(img) {
        const src = img.getAttribute('data-lazy-src');
        if (!src || this.loadedImages.has(src)) return;

        // Check cache first
        if (this.imageCache.has(src)) {
            img.src = this.imageCache.get(src);
            this.performanceMetrics.cacheHits++;
            return;
        }

        // Determine optimal format
        const optimizedSrc = await this.getOptimizedImageSrc(src);
        
        return new Promise((resolve, reject) => {
            const tempImg = new Image();
            tempImg.onload = () => {
                img.src = optimizedSrc;
                img.classList.add('lazy-loaded');
                this.imageCache.set(src, optimizedSrc);
                this.loadedImages.add(src);
                resolve();
            };
            tempImg.onerror = reject;
            tempImg.src = optimizedSrc;
        });
    }

    async loadLazyBackground(element) {
        const bgSrc = element.getAttribute('data-lazy-bg');
        if (!bgSrc) return;

        const optimizedSrc = await this.getOptimizedImageSrc(bgSrc);
        
        return new Promise((resolve) => {
            const tempImg = new Image();
            tempImg.onload = () => {
                element.style.backgroundImage = `url(${optimizedSrc})`;
                element.classList.add('bg-loaded');
                resolve();
            };
            tempImg.src = optimizedSrc;
        });
    }

    async loadLazySection(element) {
        const contentType = element.getAttribute('data-lazy-content');
        
        // Simulate dynamic content loading
        await new Promise(resolve => setTimeout(resolve, 100));
        
        element.classList.add('content-loaded');
        
        // Add shimmer effect removal
        element.classList.remove('loading-shimmer');
    }

    async getOptimizedImageSrc(src) {
        // Check browser support for modern formats
        const supportsWebP = await this.checkWebPSupport();
        const supportsAVIF = await this.checkAVIFSupport();
        
        let optimizedSrc = src;
        
        if (supportsAVIF && src.includes('.jpg')) {
            optimizedSrc = src.replace('.jpg', '.avif');
        } else if (supportsWebP && src.includes('.jpg')) {
            optimizedSrc = src.replace('.jpg', '.webp');
        }
        
        return optimizedSrc;
    }

    async checkWebPSupport() {
        if (this.webpSupport !== undefined) return this.webpSupport;
        
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                this.webpSupport = (webP.height === 2);
                resolve(this.webpSupport);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    async checkAVIFSupport() {
        if (this.avifSupport !== undefined) return this.avifSupport;
        
        return new Promise((resolve) => {
            const avif = new Image();
            avif.onload = avif.onerror = () => {
                this.avifSupport = (avif.height === 2);
                resolve(this.avifSupport);
            };
            avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
        });
    }

    setupPredictiveLoading() {
        // Simple user behavior prediction
        let lastScrollTime = 0;
        let scrollDirection = 'down';
        
        window.addEventListener('scroll', () => {
            const currentTime = Date.now();
            const currentScroll = window.pageYOffset;
            
            if (currentTime - lastScrollTime > 100) {
                const newDirection = currentScroll > this.lastScrollPosition ? 'down' : 'up';
                
                if (newDirection !== scrollDirection) {
                    scrollDirection = newDirection;
                    this.predictNextContent(scrollDirection);
                }
                
                this.lastScrollPosition = currentScroll;
                lastScrollTime = currentTime;
            }
        }, { passive: true });
        
        // Hover prediction
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a[href*="#"]')) {
                const targetId = e.target.getAttribute('href').substring(1);
                this.preloadSectionContent(targetId);
            }
        });
    }

    predictNextContent(direction) {
        const sections = Array.from(document.querySelectorAll('section'));
        const currentSection = this.getCurrentSection(sections);
        
        if (!currentSection) return;
        
        const currentIndex = sections.indexOf(currentSection);
        let predictedIndex;
        
        if (direction === 'down') {
            predictedIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
            predictedIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (predictedIndex !== currentIndex) {
            this.preloadSectionImages(sections[predictedIndex]);
            this.performanceMetrics.predictions.push({
                predicted: sections[predictedIndex].id,
                direction,
                timestamp: Date.now()
            });
        }
    }

    getCurrentSection(sections) {
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        
        return sections.find(section => {
            const rect = section.getBoundingClientRect();
            const top = rect.top + window.pageYOffset;
            const bottom = top + rect.height;
            
            return scrollPosition >= top && scrollPosition <= bottom;
        });
    }

    preloadSectionContent(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        this.preloadSectionImages(section);
    }

    preloadSectionImages(section) {
        const lazyImages = section.querySelectorAll('[data-lazy-src]');
        
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-lazy-src');
            if (src && !this.loadedImages.has(src)) {
                // Preload with low priority
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = src;
                document.head.appendChild(link);
            }
        });
    }

    setupImageOptimization() {
        // Compress images based on connection quality
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection) {
            const effectiveType = connection.effectiveType;
            
            // Adjust image quality based on connection
            this.imageQuality = this.getImageQuality(effectiveType);
        }
    }

    getImageQuality(effectiveType) {
        const qualityMap = {
            'slow-2g': 0.3,
            '2g': 0.5,
            '3g': 0.7,
            '4g': 0.9
        };
        
        return qualityMap[effectiveType] || 0.8;
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
    }

    handleLoadError(element) {
        // Fallback for failed loads
        if (element.hasAttribute('data-lazy-src')) {
            element.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+';
        } else if (element.hasAttribute('data-lazy-bg')) {
            element.style.backgroundColor = '#f0f0f0';
        }
        
        element.classList.add('load-error');
    }

    // Public API
    getPerformanceMetrics() {
        return {
            ...this.performanceMetrics,
            averageLoadTime: this.performanceMetrics.loadTimes.reduce((a, b) => a + b, 0) / this.performanceMetrics.loadTimes.length,
            cacheHitRate: this.performanceMetrics.cacheHits / this.performanceMetrics.loadTimes.length
        };
    }

    preloadResource(url, type = 'image') {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        if (type === 'image') link.as = 'image';
        document.head.appendChild(link);
    }
}

// Initialize Quantum-CDN
const quantumCDN = new QuantumCDN();

// Export for global access
window.QuantumCDN = quantumCDN;