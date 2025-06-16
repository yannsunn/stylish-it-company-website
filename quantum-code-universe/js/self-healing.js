/**
 * Self-Healing Infrastructure Implementation
 * Automatic error detection, recovery, and adaptive resource loading
 */

class SelfHealingSystem {
    constructor() {
        this.errorCount = 0;
        this.errorThreshold = 3;
        this.retryAttempts = new Map();
        this.fallbackResources = new Map();
        this.connectionQuality = 'unknown';
        this.adaptiveSettings = {
            imageQuality: 0.8,
            animationLevel: 'full',
            polyfillsEnabled: false
        };
        
        this.performanceMetrics = {
            loadFailures: 0,
            recoverySuccesses: 0,
            adaptiveChanges: 0
        };

        this.init();
    }

    init() {
        this.setupErrorHandling();
        this.setupResourceFallbacks();
        this.setupConnectionMonitoring();
        this.setupPerformanceAdaptation();
        this.setupCircuitBreaker();
        this.setupHealthChecks();
        
        console.log('Self-Healing System initialized');
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        });

        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: 'promise',
                reason: event.reason,
                promise: event.promise
            });
        });

        // Resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleResourceError(event.target);
            }
        }, true);

        // Network errors
        window.addEventListener('offline', () => {
            this.handleNetworkChange(false);
        });

        window.addEventListener('online', () => {
            this.handleNetworkChange(true);
        });
    }

    handleError(error) {
        console.warn('Self-Healing: Error detected', error);
        
        this.errorCount++;
        this.performanceMetrics.loadFailures++;

        // Log error for analysis
        this.logError(error);

        // Attempt recovery based on error type
        switch (error.type) {
            case 'javascript':
                this.recoverFromJavaScriptError(error);
                break;
            case 'promise':
                this.recoverFromPromiseError(error);
                break;
            default:
                this.performGenericRecovery();
        }

        // Check if system degradation is needed
        if (this.errorCount >= this.errorThreshold) {
            this.enterDegradedMode();
        }
    }

    handleResourceError(element) {
        const resourceType = this.getResourceType(element);
        const resourceUrl = this.getResourceUrl(element);
        
        console.warn(`Self-Healing: ${resourceType} failed to load:`, resourceUrl);
        
        this.performanceMetrics.loadFailures++;
        
        // Attempt recovery
        this.recoverResource(element, resourceType, resourceUrl);
    }

    getResourceType(element) {
        const tagName = element.tagName.toLowerCase();
        
        switch (tagName) {
            case 'img': return 'image';
            case 'script': return 'script';
            case 'link': return 'stylesheet';
            case 'video': return 'video';
            case 'audio': return 'audio';
            default: return 'unknown';
        }
    }

    getResourceUrl(element) {
        return element.src || element.href || element.getAttribute('data-src') || '';
    }

    async recoverResource(element, type, url) {
        const retryKey = `${type}:${url}`;
        const attempts = this.retryAttempts.get(retryKey) || 0;
        
        if (attempts >= 3) {
            console.warn('Self-Healing: Max retry attempts reached for:', url);
            return this.useFallbackResource(element, type);
        }

        this.retryAttempts.set(retryKey, attempts + 1);

        // Wait before retry with exponential backoff
        const delay = Math.pow(2, attempts) * 1000;
        await this.wait(delay);

        // Try alternative CDN or fallback URL
        const fallbackUrl = this.getFallbackUrl(url, type);
        
        if (fallbackUrl) {
            this.loadAlternativeResource(element, fallbackUrl, type);
        } else {
            this.useFallbackResource(element, type);
        }
    }

    getFallbackUrl(originalUrl, type) {
        // Map of CDN fallbacks
        const cdnFallbacks = {
            'cdnjs.cloudflare.com': 'unpkg.com',
            'cdn.jsdelivr.net': 'cdnjs.cloudflare.com',
            'unpkg.com': 'cdn.jsdelivr.net'
        };

        for (const [original, fallback] of Object.entries(cdnFallbacks)) {
            if (originalUrl.includes(original)) {
                return originalUrl.replace(original, fallback);
            }
        }

        // Local fallbacks for external resources
        const localFallbacks = new Map([
            ['three.js', 'js/libs/three.min.js'],
            ['gsap', 'js/libs/gsap.min.js'],
            ['webxr-polyfill', 'js/libs/webxr-polyfill.js']
        ]);

        for (const [lib, localPath] of localFallbacks) {
            if (originalUrl.includes(lib)) {
                return localPath;
            }
        }

        return null;
    }

    loadAlternativeResource(element, fallbackUrl, type) {
        console.log('Self-Healing: Trying fallback URL:', fallbackUrl);

        switch (type) {
            case 'script':
                this.loadScript(fallbackUrl);
                break;
            case 'stylesheet':
                element.href = fallbackUrl;
                break;
            case 'image':
                element.src = fallbackUrl;
                break;
            default:
                element.src = fallbackUrl;
        }
    }

    loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                console.log('Self-Healing: Script loaded successfully:', url);
                this.performanceMetrics.recoverySuccesses++;
                resolve();
            };
            script.onerror = () => {
                console.warn('Self-Healing: Script fallback also failed:', url);
                reject();
            };
            document.head.appendChild(script);
        });
    }

    useFallbackResource(element, type) {
        console.log('Self-Healing: Using fallback for:', type);

        switch (type) {
            case 'image':
                this.useFallbackImage(element);
                break;
            case 'script':
                this.useFallbackScript(element);
                break;
            case 'stylesheet':
                this.useFallbackStyles(element);
                break;
        }
    }

    useFallbackImage(img) {
        // SVG placeholder
        const placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM1MzU0NSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5YTlhOWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
        img.src = placeholder;
        img.classList.add('fallback-image');
    }

    useFallbackScript(script) {
        // Create minimal polyfill or disable dependent features
        const src = script.src || '';
        
        if (src.includes('three.js')) {
            this.createThreeJSFallback();
        } else if (src.includes('gsap')) {
            this.createGSAPFallback();
        } else if (src.includes('webxr')) {
            this.createWebXRFallback();
        }
    }

    createThreeJSFallback() {
        // Minimal Three.js fallback
        window.THREE = {
            Scene: class { constructor() {} },
            WebGLRenderer: class { constructor() { return { domElement: document.createElement('canvas') }; } },
            PerspectiveCamera: class { constructor() {} },
            BoxGeometry: class { constructor() {} },
            MeshBasicMaterial: class { constructor() {} },
            Mesh: class { constructor() {} }
        };
        console.log('Self-Healing: Three.js fallback created');
    }

    createGSAPFallback() {
        // Minimal GSAP fallback
        window.gsap = {
            to: (target, options) => {
                console.log('Self-Healing: GSAP fallback animation');
                if (options.onComplete) options.onComplete();
            },
            fromTo: (target, from, to) => {
                console.log('Self-Healing: GSAP fallback animation');
                if (to.onComplete) to.onComplete();
            }
        };
        console.log('Self-Healing: GSAP fallback created');
    }

    createWebXRFallback() {
        // Disable WebXR features gracefully
        window.WebXRPolyfill = class {
            constructor() {
                console.log('Self-Healing: WebXR disabled - fallback mode');
            }
        };
    }

    useFallbackStyles(link) {
        // Create basic fallback styles
        const style = document.createElement('style');
        style.textContent = `
            /* Fallback styles */
            .quantum-btn { padding: 10px 20px; background: #333; color: white; border: none; }
            .quantum-nav { background: #000; padding: 1rem; }
            .hero-section { background: linear-gradient(45deg, #333, #666); }
        `;
        document.head.appendChild(style);
        console.log('Self-Healing: Fallback styles applied');
    }

    setupConnectionMonitoring() {
        // Monitor connection quality
        if (navigator.connection) {
            const connection = navigator.connection;
            
            this.updateConnectionQuality(connection.effectiveType);
            
            connection.addEventListener('change', () => {
                this.updateConnectionQuality(connection.effectiveType);
                this.adaptToConnection();
            });
        }

        // Periodic connectivity check
        setInterval(() => {
            this.checkConnectivity();
        }, 30000);
    }

    updateConnectionQuality(effectiveType) {
        this.connectionQuality = effectiveType;
        console.log('Self-Healing: Connection quality:', effectiveType);
    }

    adaptToConnection() {
        const lowBandwidth = ['slow-2g', '2g'].includes(this.connectionQuality);
        
        if (lowBandwidth) {
            this.enableLowBandwidthMode();
        } else {
            this.enableHighBandwidthMode();
        }
        
        this.performanceMetrics.adaptiveChanges++;
    }

    enableLowBandwidthMode() {
        console.log('Self-Healing: Enabling low bandwidth mode');
        
        this.adaptiveSettings.imageQuality = 0.3;
        this.adaptiveSettings.animationLevel = 'reduced';
        
        // Reduce image quality
        document.querySelectorAll('img').forEach(img => {
            if (img.dataset.lowQuality) {
                img.src = img.dataset.lowQuality;
            }
        });
        
        // Disable heavy animations
        document.body.classList.add('reduced-motion');
    }

    enableHighBandwidthMode() {
        console.log('Self-Healing: Enabling high bandwidth mode');
        
        this.adaptiveSettings.imageQuality = 0.9;
        this.adaptiveSettings.animationLevel = 'full';
        
        document.body.classList.remove('reduced-motion');
    }

    async checkConnectivity() {
        try {
            const response = await fetch('/ping', {
                method: 'HEAD',
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                this.handleConnectivityIssue();
            }
        } catch (error) {
            this.handleConnectivityIssue();
        }
    }

    handleConnectivityIssue() {
        console.warn('Self-Healing: Connectivity issue detected');
        
        // Enable offline mode
        this.enableOfflineMode();
    }

    enableOfflineMode() {
        // Cache critical resources
        this.cacheEssentialResources();
        
        // Show offline indicator
        this.showOfflineIndicator();
        
        // Disable non-essential features
        this.disableNonEssentialFeatures();
    }

    setupPerformanceAdaptation() {
        // Monitor performance metrics
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                
                entries.forEach(entry => {
                    if (entry.duration > 100) { // Slow operation
                        this.handleSlowPerformance(entry);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }

        // Memory pressure monitoring
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                const usage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
                
                if (usage > 0.9) {
                    this.handleMemoryPressure();
                }
            }, 10000);
        }
    }

    handleSlowPerformance(entry) {
        console.warn('Self-Healing: Slow performance detected:', entry.name);
        
        // Reduce animation complexity
        if (entry.name.includes('animation')) {
            this.reduceAnimationComplexity();
        }
        
        // Optimize resource loading
        this.optimizeResourceLoading();
    }

    handleMemoryPressure() {
        console.warn('Self-Healing: Memory pressure detected');
        
        // Clean up unused resources
        this.cleanupResources();
        
        // Reduce memory usage
        this.reduceMemoryUsage();
    }

    setupCircuitBreaker() {
        this.circuitBreaker = {
            state: 'CLOSED', // CLOSED, OPEN, HALF_OPEN
            failureCount: 0,
            lastFailureTime: null,
            timeout: 60000 // 1 minute
        };
    }

    handleNetworkChange(isOnline) {
        if (isOnline) {
            console.log('Self-Healing: Network restored');
            this.handleNetworkRestoration();
        } else {
            console.log('Self-Healing: Network lost');
            this.handleNetworkLoss();
        }
    }

    handleNetworkRestoration() {
        // Reset error counts
        this.errorCount = 0;
        this.retryAttempts.clear();
        
        // Retry failed operations
        this.retryFailedOperations();
        
        // Hide offline indicator
        this.hideOfflineIndicator();
    }

    handleNetworkLoss() {
        // Switch to offline mode
        this.enableOfflineMode();
        
        // Pause non-critical operations
        this.pauseNonCriticalOperations();
    }

    setupHealthChecks() {
        // Regular system health checks
        setInterval(() => {
            this.performHealthCheck();
        }, 60000); // Every minute
    }

    performHealthCheck() {
        const health = {
            errors: this.errorCount,
            performance: this.getPerformanceScore(),
            connectivity: navigator.onLine,
            memory: this.getMemoryUsage()
        };

        console.log('Self-Healing: Health check:', health);

        // Take corrective actions if needed
        if (health.errors > this.errorThreshold) {
            this.performPreventiveMaintenance();
        }
    }

    getPerformanceScore() {
        // Simple performance score calculation
        const { loadFailures, recoverySuccesses } = this.performanceMetrics;
        return recoverySuccesses / Math.max(loadFailures, 1);
    }

    getMemoryUsage() {
        if ('memory' in performance) {
            return performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
        }
        return 0;
    }

    // Recovery methods
    recoverFromJavaScriptError(error) {
        // Attempt to reload the problematic script
        if (error.filename) {
            this.reloadScript(error.filename);
        }
    }

    recoverFromPromiseError(error) {
        // Log promise error and continue
        console.warn('Self-Healing: Promise rejection handled:', error.reason);
    }

    performGenericRecovery() {
        // General recovery strategies
        this.clearCaches();
        this.reloadCriticalResources();
    }

    enterDegradedMode() {
        console.warn('Self-Healing: Entering degraded mode');
        
        // Disable non-essential features
        this.disableNonEssentialFeatures();
        
        // Use fallback implementations
        this.enableFallbackMode();
        
        // Show user notification
        this.showDegradedModeNotification();
    }

    // Utility methods
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    logError(error) {
        // In production, send to error reporting service
        const errorLog = {
            ...error,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.error('Self-Healing: Error logged:', errorLog);
    }

    // Public API
    getSystemHealth() {
        return {
            errorCount: this.errorCount,
            connectionQuality: this.connectionQuality,
            adaptiveSettings: this.adaptiveSettings,
            performanceMetrics: this.performanceMetrics,
            circuitBreaker: this.circuitBreaker
        };
    }

    forceRecovery() {
        console.log('Self-Healing: Force recovery initiated');
        this.errorCount = 0;
        this.retryAttempts.clear();
        this.performPreventiveMaintenance();
    }

    performPreventiveMaintenance() {
        console.log('Self-Healing: Performing preventive maintenance');
        
        this.cleanupResources();
        this.optimizeResourceLoading();
        this.resetErrorCounters();
        
        this.performanceMetrics.recoverySuccesses++;
    }

    resetErrorCounters() {
        this.errorCount = 0;
        this.retryAttempts.clear();
    }

    cleanupResources() {
        // Remove unused DOM elements
        document.querySelectorAll('.cleanup-target').forEach(el => el.remove());
        
        // Clear old cache entries
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => {
                    if (name.includes('old-')) {
                        caches.delete(name);
                    }
                });
            });
        }
    }

    optimizeResourceLoading() {
        // Preload critical resources
        const criticalResources = [
            'css/critical.css',
            'js/main.js'
        ];

        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    // Placeholder methods for specific recovery actions
    reloadScript(filename) { /* Implementation */ }
    clearCaches() { /* Implementation */ }
    reloadCriticalResources() { /* Implementation */ }
    disableNonEssentialFeatures() { /* Implementation */ }
    enableFallbackMode() { /* Implementation */ }
    showDegradedModeNotification() { /* Implementation */ }
    cacheEssentialResources() { /* Implementation */ }
    showOfflineIndicator() { /* Implementation */ }
    hideOfflineIndicator() { /* Implementation */ }
    retryFailedOperations() { /* Implementation */ }
    pauseNonCriticalOperations() { /* Implementation */ }
    reduceAnimationComplexity() { /* Implementation */ }
    reduceMemoryUsage() { /* Implementation */ }
}

// Initialize Self-Healing System
const selfHealingSystem = new SelfHealingSystem();

// Export for global access
window.SelfHealingSystem = selfHealingSystem;