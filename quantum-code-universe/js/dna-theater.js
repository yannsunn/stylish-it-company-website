/**
 * QuantumCode Universe - DNA Theater
 * Live code editor with real-time visualization
 */

class DNATheater {
    constructor() {
        this.editor = null;
        this.output = null;
        this.codeInput = null;
        this.lineNumbers = null;
        this.isActive = false;
        
        this.sampleCodes = [
            {
                name: 'quantum.js',
                content: `// Quantum Particle System
class QuantumParticle {
    constructor(x, y, z) {
        this.position = { x, y, z };
        this.velocity = { 
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: Math.random() * 2 - 1
        };
        this.energy = Math.random() * 100;
        this.entangled = null;
    }
    
    update() {
        // Quantum superposition
        if (Math.random() < 0.1) {
            this.teleport();
        }
        
        // Wave function collapse
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;
        
        // Entanglement effect
        if (this.entangled) {
            this.synchronize();
        }
    }
    
    teleport() {
        this.position.x = Math.random() * 800;
        this.position.y = Math.random() * 600;
        this.energy *= 0.9;
    }
    
    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 
               this.energy / 20, 0, Math.PI * 2);
        ctx.fillStyle = \`hsl(\${this.energy * 3}, 70%, 60%)\`;
        ctx.fill();
    }
}

// Create quantum field
const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new QuantumParticle(
        Math.random() * 800,
        Math.random() * 600,
        Math.random() * 100
    ));
}

// Animation loop
function animate() {
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
}`
            },
            {
                name: 'reality.css',
                content: `/* Reality Manipulation Styles */
@keyframes quantumFlux {
    0% { 
        transform: scale(1) rotate(0deg);
        filter: hue-rotate(0deg);
    }
    50% { 
        transform: scale(1.1) rotate(180deg);
        filter: hue-rotate(180deg);
    }
    100% { 
        transform: scale(1) rotate(360deg);
        filter: hue-rotate(360deg);
    }
}

.quantum-element {
    animation: quantumFlux 3s infinite;
    background: linear-gradient(45deg, 
        #3B82F6, #8B5CF6, #06FFA5);
    background-size: 300% 300%;
    animation: quantumFlux 3s infinite,
               gradientShift 2s infinite;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Reality distortion field */
.reality-field {
    position: relative;
    overflow: hidden;
}

.reality-field::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
        radial-gradient(circle, 
            rgba(59, 130, 246, 0.1) 0%, 
            transparent 70%);
    animation: realityWave 4s linear infinite;
}

@keyframes realityWave {
    0% { transform: rotate(0deg) scale(1); }
    100% { transform: rotate(360deg) scale(1.2); }
}`
            },
            {
                name: 'future.html',
                content: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Future Interface</title>
    <style>
        body {
            background: linear-gradient(135deg, #0F172A, #1E293B);
            color: #F8FAFC;
            font-family: 'JetBrains Mono', monospace;
            margin: 0;
            padding: 20px;
        }
        
        .neural-interface {
            border: 2px solid #06FFA5;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            background: rgba(6, 255, 165, 0.1);
            animation: neuralPulse 2s infinite;
        }
        
        @keyframes neuralPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(6, 255, 165, 0.3); }
            50% { box-shadow: 0 0 40px rgba(6, 255, 165, 0.6); }
        }
    </style>
</head>
<body>
    <h1>>à Neural Interface Dashboard</h1>
    
    <div class="neural-interface">
        <h2>Quantum Consciousness Stream</h2>
        <p>Status: <span id="status">Connected</span></p>
        <div id="thought-stream"></div>
    </div>
    
    <script>
        // Simulate neural activity
        const thoughtStream = document.getElementById('thought-stream');
        const thoughts = [
            '< Expanding consciousness...',
            '¡ Processing quantum data...',
            '=. Visualizing future possibilities...',
            '=€ Initiating reality compilation...'
        ];
        
        setInterval(() => {
            const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
            thoughtStream.innerHTML += \`<div>\${thought}</div>\`;
            if (thoughtStream.children.length > 5) {
                thoughtStream.removeChild(thoughtStream.firstChild);
            }
        }, 2000);
    </script>
</body>
</html>`
            }
        ];
        
        this.init();
    }
    
    /**
     * Initialize DNA Theater
     */
    init() {
        this.setupEditor();
        this.setupOutput();
        this.setupControls();
        this.loadSampleCode();
    }
    
    /**
     * Setup code editor
     */
    setupEditor() {
        this.codeInput = document.getElementById('code-input');
        this.lineNumbers = document.getElementById('line-numbers');
        
        if (this.codeInput) {
            this.codeInput.addEventListener('input', () => {
                this.updateLineNumbers();
                this.updateOutput();
            });
            
            this.codeInput.addEventListener('keydown', (e) => {
                this.handleEditorKeydown(e);
            });
            
            this.codeInput.addEventListener('scroll', () => {
                if (this.lineNumbers) {
                    this.lineNumbers.scrollTop = this.codeInput.scrollTop;
                }
            });
        }
        
        // Tab switching
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.switchTab(index);
            });
        });
    }
    
    /**
     * Setup output canvas
     */
    setupOutput() {
        const outputCanvas = document.getElementById('output-canvas');
        if (outputCanvas) {
            this.createOutputVisualization(outputCanvas);
        }
    }
    
    /**
     * Setup control buttons
     */
    setupControls() {
        const runBtn = document.getElementById('run-code');
        const aiBtn = document.getElementById('ai-suggest');
        const threeDBtn = document.getElementById('3d-view');
        const arBtn = document.getElementById('ar-view');
        
        if (runBtn) {
            runBtn.addEventListener('click', () => {
                this.runCode();
            });
        }
        
        if (aiBtn) {
            aiBtn.addEventListener('click', () => {
                this.generateAISuggestion();
            });
        }
        
        if (threeDBtn) {
            threeDBtn.addEventListener('click', () => {
                this.toggle3DView();
            });
        }
        
        if (arBtn) {
            arBtn.addEventListener('click', () => {
                this.toggleARView();
            });
        }
    }
    
    /**
     * Load sample code
     */
    loadSampleCode() {
        if (this.codeInput && this.sampleCodes[0]) {
            this.codeInput.value = this.sampleCodes[0].content;
            this.updateLineNumbers();
            this.updateOutput();
        }
    }
    
    /**
     * Update line numbers
     */
    updateLineNumbers() {
        if (!this.lineNumbers || !this.codeInput) return;
        
        const lines = this.codeInput.value.split('\n').length;
        let lineNumberHtml = '';
        
        for (let i = 1; i <= lines; i++) {
            lineNumberHtml += `${i}\n`;
        }
        
        this.lineNumbers.textContent = lineNumberHtml;
    }
    
    /**
     * Handle editor keyboard shortcuts
     */
    handleEditorKeydown(e) {
        // Tab indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.codeInput.selectionStart;
            const end = this.codeInput.selectionEnd;
            
            this.codeInput.value = 
                this.codeInput.value.substring(0, start) + 
                '    ' + 
                this.codeInput.value.substring(end);
            
            this.codeInput.selectionStart = this.codeInput.selectionEnd = start + 4;
        }
        
        // Ctrl+Enter to run code
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            this.runCode();
        }
    }
    
    /**
     * Switch between code tabs
     */
    switchTab(index) {
        // Update tab appearance
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelectorAll('.tab')[index];
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Load corresponding code
        if (this.sampleCodes[index] && this.codeInput) {
            this.codeInput.value = this.sampleCodes[index].content;
            this.updateLineNumbers();
            this.updateOutput();
        }
    }
    
    /**
     * Run the current code
     */
    runCode() {
        const code = this.codeInput.value;
        const language = this.getCurrentLanguage();
        
        // Create visual feedback
        this.createRunEffect();
        
        // Execute based on language
        switch (language) {
            case 'javascript':
                this.executeJavaScript(code);
                break;
            case 'css':
                this.applyCSS(code);
                break;
            case 'html':
                this.renderHTML(code);
                break;
            default:
                this.showCodeVisualization(code);
        }
    }
    
    /**
     * Get current programming language
     */
    getCurrentLanguage() {
        const activeTab = document.querySelector('.tab.active');
        if (!activeTab) return 'javascript';
        
        const tabText = activeTab.textContent.toLowerCase();
        if (tabText.includes('.js')) return 'javascript';
        if (tabText.includes('.css')) return 'css';
        if (tabText.includes('.html')) return 'html';
        return 'javascript';
    }
    
    /**
     * Execute JavaScript code safely
     */
    executeJavaScript(code) {
        try {
            // Create a safe execution context
            const canvas = this.getOutputCanvas();
            const ctx = canvas.getContext('2d');
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Set up safe globals
            const safeGlobals = {
                canvas,
                ctx,
                Math,
                console: {
                    log: (...args) => this.outputLog('log', ...args),
                    warn: (...args) => this.outputLog('warn', ...args),
                    error: (...args) => this.outputLog('error', ...args)
                },
                requestAnimationFrame: window.requestAnimationFrame.bind(window)
            };
            
            // Execute code in sandboxed environment
            const func = new Function(...Object.keys(safeGlobals), code);
            func(...Object.values(safeGlobals));
            
            this.showNotification('Code executed successfully!', 'success');
            
        } catch (error) {
            this.outputLog('error', 'Execution Error:', error.message);
            this.showNotification('Code execution failed', 'error');
        }
    }
    
    /**
     * Apply CSS styles
     */
    applyCSS(css) {
        const canvas = this.getOutputCanvas();
        const container = canvas.parentElement;
        
        // Create a demo element to apply styles
        const demoElement = document.createElement('div');
        demoElement.className = 'css-demo';
        demoElement.innerHTML = `
            <div class="quantum-element">Quantum Element</div>
            <div class="reality-field">Reality Field</div>
        `;
        
        // Apply styles
        const styleElement = document.createElement('style');
        styleElement.textContent = css + `
            .css-demo {
                width: 100%;
                height: 100%;
                padding: 20px;
                background: #0F172A;
                color: #F8FAFC;
                font-family: 'JetBrains Mono', monospace;
            }
        `;
        
        // Replace canvas with demo element temporarily
        container.innerHTML = '';
        container.appendChild(styleElement);
        container.appendChild(demoElement);
        
        this.showNotification('CSS applied successfully!', 'success');
    }
    
    /**
     * Render HTML content
     */
    renderHTML(html) {
        const canvas = this.getOutputCanvas();
        const container = canvas.parentElement;
        
        // Create iframe for safe HTML rendering
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.background = '#0F172A';
        
        container.innerHTML = '';
        container.appendChild(iframe);
        
        // Write HTML to iframe
        iframe.contentDocument.open();
        iframe.contentDocument.write(html);
        iframe.contentDocument.close();
        
        this.showNotification('HTML rendered successfully!', 'success');
    }
    
    /**
     * Show code as visualization
     */
    showCodeVisualization(code) {
        const canvas = this.getOutputCanvas();
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create text visualization
        ctx.font = '12px JetBrains Mono';
        ctx.fillStyle = '#06FFA5';
        
        const lines = code.split('\n');
        lines.forEach((line, index) => {
            if (index < 20) { // Limit visible lines
                ctx.fillText(line.substring(0, 60), 10, 20 + index * 15);
            }
        });
        
        // Add some visual effects
        this.addCodeParticles(ctx, canvas);
    }
    
    /**
     * Add particle effects to code visualization
     */
    addCodeParticles(ctx, canvas) {
        const particles = [];
        
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                hue: Math.random() * 360
            });
        }
        
        const animate = () => {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
                ctx.fill();
            });
            
            ctx.restore();
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    /**
     * Generate AI code suggestion
     */
    generateAISuggestion() {
        const suggestions = [
            "// Add quantum entanglement\nparticle.entangled = otherParticle;",
            "// Implement wave function\nconst waveFunction = (x) => Math.sin(x * frequency) * amplitude;",
            "// Add neural network layer\nconst layer = new NeuralLayer(neurons, activation);",
            "// Create reality distortion\nctx.filter = 'blur(2px) hue-rotate(90deg)';",
            "// Quantum superposition\nif (Math.random() < 0.5) particle.state = 'spin-up';"
        ];
        
        const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        
        // Insert suggestion at cursor position
        if (this.codeInput) {
            const start = this.codeInput.selectionStart;
            const end = this.codeInput.selectionEnd;
            
            this.codeInput.value = 
                this.codeInput.value.substring(0, start) + 
                '\n' + suggestion + '\n' + 
                this.codeInput.value.substring(end);
            
            this.updateLineNumbers();
        }
        
        this.showNotification('AI suggestion added!', 'success');
    }
    
    /**
     * Toggle 3D view
     */
    toggle3DView() {
        const canvas = this.getOutputCanvas();
        
        if (canvas.dataset.view3d === 'true') {
            canvas.dataset.view3d = 'false';
            canvas.style.transform = '';
            this.showNotification('2D view activated', 'info');
        } else {
            canvas.dataset.view3d = 'true';
            canvas.style.transform = 'perspective(1000px) rotateX(10deg) rotateY(10deg)';
            this.showNotification('3D view activated', 'info');
        }
    }
    
    /**
     * Toggle AR view (placeholder)
     */
    toggleARView() {
        this.showNotification('AR view coming soon!', 'info');
    }
    
    /**
     * Create visual effect when running code
     */
    createRunEffect() {
        const runBtn = document.getElementById('run-code');
        if (runBtn) {
            runBtn.style.background = 'linear-gradient(45deg, #06FFA5, #3B82F6)';
            runBtn.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                runBtn.style.background = '';
                runBtn.style.transform = '';
            }, 300);
        }
    }
    
    /**
     * Create output visualization
     */
    createOutputVisualization(container) {
        const canvas = document.createElement('canvas');
        canvas.id = 'output-canvas-main';
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        
        container.appendChild(canvas);
        
        // Initialize with welcome animation
        this.createWelcomeAnimation(canvas);
    }
    
    /**
     * Create welcome animation
     */
    createWelcomeAnimation(canvas) {
        const ctx = canvas.getContext('2d');
        let frame = 0;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw welcome text
            ctx.font = '24px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#06FFA5';
            
            const opacity = Math.sin(frame * 0.05) * 0.5 + 0.5;
            ctx.globalAlpha = opacity;
            
            ctx.fillText('Live Code DNA Theater', canvas.width / 2, canvas.height / 2 - 20);
            
            ctx.font = '16px JetBrains Mono';
            ctx.fillStyle = '#8B5CF6';
            ctx.fillText('Write code and see it come alive!', canvas.width / 2, canvas.height / 2 + 20);
            
            ctx.globalAlpha = 1;
            
            frame++;
            if (frame < 200) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    /**
     * Get output canvas
     */
    getOutputCanvas() {
        let canvas = document.getElementById('output-canvas-main');
        if (!canvas) {
            const container = document.getElementById('output-canvas');
            if (container) {
                this.createOutputVisualization(container);
                canvas = document.getElementById('output-canvas-main');
            }
        }
        return canvas;
    }
    
    /**
     * Update output in real-time
     */
    updateOutput() {
        // Debounce the update
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => {
            if (this.getCurrentLanguage() === 'javascript') {
                // Only auto-execute safe code patterns
                const code = this.codeInput.value;
                if (this.isSafeCode(code)) {
                    this.executeJavaScript(code);
                }
            }
        }, 1000);
    }
    
    /**
     * Check if code is safe for auto-execution
     */
    isSafeCode(code) {
        const dangerousPatterns = [
            'eval(',
            'Function(',
            'setTimeout(',
            'setInterval(',
            'document.',
            'window.',
            'location.',
            'XMLHttpRequest',
            'fetch('
        ];
        
        return !dangerousPatterns.some(pattern => code.includes(pattern));
    }
    
    /**
     * Output log to console area
     */
    outputLog(type, ...args) {
        console[type](`[DNA Theater ${type.toUpperCase()}]:`, ...args);
    }
    
    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Use the global notification system if available
        if (window.quantumApp && window.quantumApp.showNotification) {
            window.quantumApp.showNotification(message, type);
        } else {
            console.log(`[DNA Theater]: ${message}`);
        }
    }
    
    /**
     * Start demo animation
     */
    startDemo() {
        if (!this.isActive) {
            this.isActive = true;
            this.runCode();
        }
    }
}

// Export for global access
window.DNATheater = DNATheater;