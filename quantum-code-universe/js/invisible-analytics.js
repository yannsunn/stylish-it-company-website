/**
 * Invisible Analytics Implementation
 * Privacy-by-design analytics with differential privacy
 */

class InvisibleAnalytics {
    constructor() {
        this.consentGiven = false;
        this.sessionData = {
            sessionId: this.generateSessionId(),
            startTime: Date.now(),
            events: [],
            performance: {},
            userFlow: []
        };
        
        this.privacyLevel = 1.0; // Differential privacy epsilon
        this.batchSize = 10;
        this.eventQueue = [];
        
        this.init();
    }

    init() {
        // Check for existing consent
        this.checkConsent();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        // Setup A/B testing framework
        this.setupABTesting();
        
        // Setup batch processing
        this.setupBatchProcessing();
        
        console.log('Invisible Analytics initialized with privacy-by-design');
    }

    checkConsent() {
        const consent = localStorage.getItem('analytics-consent');
        this.consentGiven = consent === 'accepted';
        
        if (!consent) {
            this.showConsentModal();
        } else if (this.consentGiven) {
            this.startAnalytics();
        }
    }

    showConsentModal() {
        const modal = document.getElementById('analytics-consent-modal');
        if (modal) {
            modal.classList.remove('hidden');
            
            document.getElementById('consent-accept').addEventListener('click', () => {
                this.giveConsent(true);
                modal.classList.add('hidden');
            });
            
            document.getElementById('consent-decline').addEventListener('click', () => {
                this.giveConsent(false);
                modal.classList.add('hidden');
            });
        }
    }

    giveConsent(accepted) {
        this.consentGiven = accepted;
        localStorage.setItem('analytics-consent', accepted ? 'accepted' : 'declined');
        
        if (accepted) {
            this.startAnalytics();
        }
    }

    startAnalytics() {
        if (!this.consentGiven) return;
        
        // Track page view
        this.trackEvent('page_view', {
            path: window.location.pathname,
            referrer: document.referrer,
            timestamp: Date.now()
        });
        
        // Track user engagement
        this.setupEngagementTracking();
    }

    setupEventListeners() {
        // Track clicks with analytics data attributes
        document.addEventListener('click', (e) => {
            const analyticsId = e.target.getAttribute('data-analytics');
            if (analyticsId && this.consentGiven) {
                this.trackEvent('click', {
                    element: analyticsId,
                    elementType: e.target.tagName.toLowerCase(),
                    timestamp: Date.now(),
                    position: {
                        x: e.clientX,
                        y: e.clientY
                    }
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.hasAttribute('data-quantum-form') && this.consentGiven) {
                this.trackEvent('form_submit', {
                    formId: form.getAttribute('data-quantum-form'),
                    timestamp: Date.now()
                });
            }
        });

        // Track scroll depth
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            if (!this.consentGiven) return;
            
            const scrollDepth = Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                
                // Track milestone scroll depths
                if ([25, 50, 75, 90].includes(scrollDepth)) {
                    this.trackEvent('scroll_depth', {
                        depth: scrollDepth,
                        timestamp: Date.now()
                    });
                }
            }
        }, { passive: true });

        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!this.consentGiven) return;
            
            this.trackEvent('visibility_change', {
                hidden: document.hidden,
                timestamp: Date.now()
            });
        });

        // Track session duration on beforeunload
        window.addEventListener('beforeunload', () => {
            if (!this.consentGiven) return;
            
            this.trackEvent('session_end', {
                duration: Date.now() - this.sessionData.startTime,
                timestamp: Date.now()
            });
            
            this.flushEventQueue();
        });
    }

    setupEngagementTracking() {
        let idleTimer;
        let isActive = true;
        const idleThreshold = 30000; // 30 seconds

        const resetIdleTimer = () => {
            clearTimeout(idleTimer);
            
            if (!isActive) {
                isActive = true;
                this.trackEvent('user_active', { timestamp: Date.now() });
            }
            
            idleTimer = setTimeout(() => {
                isActive = false;
                this.trackEvent('user_idle', { timestamp: Date.now() });
            }, idleThreshold);
        };

        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetIdleTimer, { passive: true });
        });

        resetIdleTimer();
    }

    setupPerformanceMonitoring() {
        if (!('PerformanceObserver' in window)) return;

        // Core Web Vitals monitoring
        const vitalsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
                if (!this.consentGiven) return;
                
                let metric = '';
                let value = 0;
                
                switch (entry.entryType) {
                    case 'largest-contentful-paint':
                        metric = 'LCP';
                        value = entry.startTime;
                        break;
                    case 'first-input':
                        metric = 'FID';
                        value = entry.processingStart - entry.startTime;
                        break;
                    case 'layout-shift':
                        if (!entry.hadRecentInput) {
                            metric = 'CLS';
                            value = entry.value;
                        }
                        break;
                }
                
                if (metric) {
                    this.trackEvent('performance_metric', {
                        metric,
                        value: this.addNoise(value),
                        timestamp: Date.now()
                    });
                }
            });
        });

        // Observe different entry types
        try {
            vitalsObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            vitalsObserver.observe({ entryTypes: ['first-input'] });
            vitalsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            console.warn('Some performance metrics not supported');
        }

        // Network monitoring
        if (navigator.connection) {
            this.trackEvent('connection_info', {
                effectiveType: navigator.connection.effectiveType,
                downlink: this.addNoise(navigator.connection.downlink),
                rtt: this.addNoise(navigator.connection.rtt),
                timestamp: Date.now()
            });
        }
    }

    setupABTesting() {
        this.abTestGroups = {
            heroVersion: this.getABTestGroup('hero_test', ['A', 'B']),
            ctaColor: this.getABTestGroup('cta_color', ['blue', 'green', 'purple'])
        };

        // Apply A/B test variations
        this.applyABTestVariations();
        
        // Track A/B test assignment
        if (this.consentGiven) {
            this.trackEvent('ab_test_assignment', {
                tests: this.abTestGroups,
                timestamp: Date.now()
            });
        }
    }

    getABTestGroup(testName, variants) {
        const userId = this.getUserId();
        const hash = this.simpleHash(userId + testName);
        const variantIndex = hash % variants.length;
        return variants[variantIndex];
    }

    getUserId() {
        let userId = localStorage.getItem('quantum-user-id');
        if (!userId) {
            userId = this.generateUserId();
            localStorage.setItem('quantum-user-id', userId);
        }
        return userId;
    }

    generateUserId() {
        return 'u_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    generateSessionId() {
        return 's_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    applyABTestVariations() {
        // Hero version test
        if (this.abTestGroups.heroVersion === 'B') {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.textContent = '次世代を牽引する\n革新的IT企業';
            }
        }

        // CTA color test
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton && this.abTestGroups.ctaColor !== 'blue') {
            const colorMap = {
                green: '#10B981',
                purple: '#8B5CF6'
            };
            ctaButton.style.backgroundColor = colorMap[this.abTestGroups.ctaColor];
        }
    }

    trackEvent(eventType, data) {
        if (!this.consentGiven) return;

        const event = {
            type: eventType,
            data: this.sanitizeData(data),
            sessionId: this.sessionData.sessionId,
            userId: this.hashUserId(this.getUserId()),
            timestamp: Date.now(),
            privacy: {
                epsilon: this.privacyLevel,
                noised: true
            }
        };

        this.eventQueue.push(event);
        this.sessionData.events.push(event);

        // Process queue if it reaches batch size
        if (this.eventQueue.length >= this.batchSize) {
            this.processBatch();
        }
    }

    sanitizeData(data) {
        const sanitized = { ...data };
        
        // Add differential privacy noise to numeric values
        Object.keys(sanitized).forEach(key => {
            if (typeof sanitized[key] === 'number' && key !== 'timestamp') {
                sanitized[key] = this.addNoise(sanitized[key]);
            }
        });

        return sanitized;
    }

    addNoise(value, sensitivity = 1) {
        // Laplace noise for differential privacy
        const scale = sensitivity / this.privacyLevel;
        const u = Math.random() - 0.5;
        const noise = -scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
        return Math.max(0, value + noise);
    }

    hashUserId(userId) {
        // One-way hash for privacy
        return 'h_' + this.simpleHash(userId + 'salt_' + new Date().toDateString()).toString(36);
    }

    setupBatchProcessing() {
        // Process events in batches every 30 seconds
        setInterval(() => {
            if (this.eventQueue.length > 0) {
                this.processBatch();
            }
        }, 30000);
    }

    processBatch() {
        if (!this.consentGiven || this.eventQueue.length === 0) return;

        const batch = [...this.eventQueue];
        this.eventQueue = [];

        // In a real implementation, this would send to analytics backend
        this.sendToAnalyticsBackend(batch);
    }

    sendToAnalyticsBackend(batch) {
        // Simulate sending to analytics backend
        console.log('Analytics batch sent:', batch.length, 'events');
        
        // In production, this would be:
        // fetch('/analytics/batch', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(batch)
        // });

        // Store locally for demo purposes
        const existingData = JSON.parse(localStorage.getItem('quantum-analytics') || '[]');
        existingData.push(...batch);
        
        // Keep only last 100 events to avoid storage bloat
        const recentData = existingData.slice(-100);
        localStorage.setItem('quantum-analytics', JSON.stringify(recentData));
    }

    flushEventQueue() {
        if (this.eventQueue.length > 0) {
            this.processBatch();
        }
    }

    // Public API for manual tracking
    track(eventName, properties = {}) {
        this.trackEvent(eventName, properties);
    }

    identify(userId, traits = {}) {
        if (!this.consentGiven) return;
        
        this.trackEvent('identify', {
            userId: this.hashUserId(userId),
            traits: this.sanitizeData(traits)
        });
    }

    // Get analytics data (for debugging/admin)
    getAnalyticsData() {
        if (!this.consentGiven) return null;
        
        return {
            session: this.sessionData,
            stored: JSON.parse(localStorage.getItem('quantum-analytics') || '[]'),
            abTests: this.abTestGroups
        };
    }

    // Privacy controls
    deleteAllData() {
        localStorage.removeItem('quantum-analytics');
        localStorage.removeItem('quantum-user-id');
        localStorage.removeItem('analytics-consent');
        this.sessionData.events = [];
        this.eventQueue = [];
        console.log('All analytics data deleted');
    }

    exportData() {
        if (!this.consentGiven) return null;
        
        const data = this.getAnalyticsData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-analytics-data.json';
        a.click();
        
        URL.revokeObjectURL(url);
    }
}

// Initialize Invisible Analytics
const invisibleAnalytics = new InvisibleAnalytics();

// Export for global access
window.InvisibleAnalytics = invisibleAnalytics;