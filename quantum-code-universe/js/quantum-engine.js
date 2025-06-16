/**
 * QuantumCode Universe - Core Engine
 * Revolutionary Three.js and WebGL implementation
 * Handles 3D backgrounds, particle systems, and quantum effects
 */

class QuantumEngine {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.animationId = null;
        this.isInitialized = false;
        this.mouseX = 0;
        this.mouseY = 0;
        
        // Performance settings
        this.particleCount = this.getParticleCount();
        this.enableAdvancedEffects = this.checkWebGLSupport();
        
        this.init();
    }
    
    /**
     * Initialize the quantum engine
     */
    init() {
        this.createScene();
        this.createParticleSystems();
        this.setupEventListeners();
        this.startAnimation();
        this.isInitialized = true;
    }
    
    /**
     * Create Three.js scene, camera, and renderer
     */
    createScene() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0F172A, 1, 1000);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 100;
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: this.enableAdvancedEffects,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0F172A, 0);
        
        // Attach to canvas
        const heroCanvas = document.getElementById('hero-canvas');
        if (heroCanvas) {
            heroCanvas.appendChild(this.renderer.domElement);
        }
    }
    
    /**
     * Create quantum particle systems
     */
    createParticleSystems() {
        this.createQuantumField();
        this.createDNAHelix();
        this.createFloatingCode();
        
        if (this.enableAdvancedEffects) {
            this.createNeuralNetwork();
            this.createRealityDistortion();
        }
    }
    
    /**
     * Create quantum field background
     */
    createQuantumField() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        
        const colorPalette = [
            new THREE.Color(0x3B82F6), // quantum-primary
            new THREE.Color(0x8B5CF6), // quantum-secondary
            new THREE.Color(0x06FFA5), // quantum-accent
            new THREE.Color(0x00D4FF)  // quantum-glow
        ];
        
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Random position in 3D space
            positions[i3] = (Math.random() - 0.5) * 2000;
            positions[i3 + 1] = (Math.random() - 0.5) * 2000;
            positions[i3 + 2] = (Math.random() - 0.5) * 1000;
            
            // Random color from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Random size
            sizes[i] = Math.random() * 2 + 0.5;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Custom shader material for quantum effects
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2() }
            },
            vertexShader: `
                attribute float size;
                uniform float time;
                uniform vec2 mouse;
                varying vec3 vColor;
                
                void main() {
                    vColor = color;
                    
                    vec3 pos = position;
                    
                    // Quantum wave effect
                    pos.z += sin(pos.x * 0.01 + time) * 10.0;
                    pos.y += cos(pos.z * 0.01 + time) * 5.0;
                    
                    // Mouse interaction
                    float mouseDistance = distance(pos.xy, mouse * 100.0);
                    pos.z += (100.0 / (mouseDistance + 1.0)) * 2.0;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float r = distance(gl_PointCoord, vec2(0.5));
                    if (r > 0.5) discard;
                    
                    float alpha = 1.0 - (r * 2.0);
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });
        
        const points = new THREE.Points(geometry, material);
        this.scene.add(points);
        this.quantumField = { points, material };
    }
    
    /**
     * Create DNA helix structure
     */
    createDNAHelix() {
        const helixGroup = new THREE.Group();
        const radius = 30;
        const height = 200;
        const segments = 100;
        
        // Create double helix
        for (let strand = 0; strand < 2; strand++) {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(segments * 3);
            
            for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * Math.PI * 8 + (strand * Math.PI);
                const y = (i / segments - 0.5) * height;
                
                positions[i * 3] = Math.cos(angle) * radius;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = Math.sin(angle) * radius;
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const material = new THREE.LineBasicMaterial({
                color: strand === 0 ? 0x3B82F6 : 0x06FFA5,
                transparent: true,
                opacity: 0.6
            });
            
            const line = new THREE.Line(geometry, material);
            helixGroup.add(line);
        }
        
        helixGroup.position.set(200, 0, -100);
        helixGroup.scale.set(0.5, 0.5, 0.5);
        this.scene.add(helixGroup);
        this.dnaHelix = helixGroup;
    }
    
    /**
     * Create floating code elements in 3D space
     */
    createFloatingCode() {
        const codeFragments = [
            'const future = await innovate();',
            'quantum.reality.render();',
            'AI.consciousness.evolve();',
            'neural.network.expand();',
            'reality.compile();</>'
        ];
        
        const loader = new THREE.FontLoader();
        
        // Note: In a real implementation, you'd load a font file
        // For now, we'll create simple text sprites
        codeFragments.forEach((text, index) => {
            this.createTextSprite(text, {
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 200,
                z: (Math.random() - 0.5) * 300
            }, index);
        });
    }
    
    /**
     * Create text sprite for floating code
     */
    createTextSprite(text, position, index) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const fontSize = 16;
        
        context.font = `${fontSize}px 'JetBrains Mono', monospace`;
        const textWidth = context.measureText(text).width;
        
        canvas.width = textWidth + 20;
        canvas.height = fontSize + 10;
        
        // Clear and draw text
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = `${fontSize}px 'JetBrains Mono', monospace`;
        context.fillStyle = '#06FFA5';
        context.textAlign = 'center';
        context.fillText(text, canvas.width / 2, fontSize);
        
        // Create texture and material
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.8
        });
        
        const sprite = new THREE.Sprite(material);
        sprite.position.set(position.x, position.y, position.z);
        sprite.scale.set(canvas.width * 0.5, canvas.height * 0.5, 1);
        
        this.scene.add(sprite);
        
        // Store for animation
        if (!this.codeSprites) this.codeSprites = [];
        this.codeSprites.push({ sprite, originalPosition: position, index });
    }
    
    /**
     * Create neural network visualization
     */
    createNeuralNetwork() {
        const nodes = [];
        const connections = [];
        const nodeCount = 20;
        
        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            const geometry = new THREE.SphereGeometry(2, 8, 8);
            const material = new THREE.MeshBasicMaterial({
                color: 0x8B5CF6,
                transparent: true,
                opacity: 0.7
            });
            
            const node = new THREE.Mesh(geometry, material);
            node.position.set(
                (Math.random() - 0.5) * 300,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 100
            );
            
            this.scene.add(node);
            nodes.push(node);
        }
        
        // Create connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (Math.random() < 0.3) { // 30% chance of connection
                    const geometry = new THREE.BufferGeometry();
                    const positions = new Float32Array([
                        nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
                        nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
                    ]);
                    
                    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                    
                    const material = new THREE.LineBasicMaterial({
                        color: 0x8B5CF6,
                        transparent: true,
                        opacity: 0.3
                    });
                    
                    const line = new THREE.Line(geometry, material);
                    this.scene.add(line);
                    connections.push(line);
                }
            }
        }
        
        this.neuralNetwork = { nodes, connections };
    }
    
    /**
     * Create reality distortion effects
     */
    createRealityDistortion() {
        const geometry = new THREE.PlaneGeometry(500, 500, 32, 32);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2() }
            },
            vertexShader: `
                uniform float time;
                uniform vec2 mouse;
                varying vec2 vUv;
                
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    
                    // Reality distortion wave
                    pos.z += sin(pos.x * 0.02 + time) * cos(pos.y * 0.02 + time) * 10.0;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                varying vec2 vUv;
                
                void main() {
                    vec2 uv = vUv;
                    
                    // Quantum interference pattern
                    float pattern = sin(uv.x * 20.0 + time) * cos(uv.y * 20.0 + time);
                    vec3 color = vec3(0.2, 0.4, 1.0) * pattern * 0.1;
                    
                    gl_FragColor = vec4(color, 0.3);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
        
        const plane = new THREE.Mesh(geometry, material);
        plane.position.z = -200;
        plane.rotation.x = -Math.PI / 4;
        this.scene.add(plane);
        
        this.realityDistortion = { plane, material };
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        // Performance monitoring
        window.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimation();
            } else {
                this.resumeAnimation();
            }
        });
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        if (!this.camera || !this.renderer) return;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    /**
     * Handle mouse movement for interactions
     */
    handleMouseMove(event) {
        this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Update micro-ecosystem
        document.documentElement.style.setProperty('--mouse-x', `${event.clientX / window.innerWidth * 100}%`);
        document.documentElement.style.setProperty('--mouse-y', `${event.clientY / window.innerHeight * 100}%`);
    }
    
    /**
     * Animation loop
     */
    animate() {
        if (!this.isInitialized) return;
        
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        
        const time = Date.now() * 0.001;
        
        // Update quantum field
        if (this.quantumField) {
            this.quantumField.material.uniforms.time.value = time;
            this.quantumField.material.uniforms.mouse.value.set(this.mouseX, this.mouseY);
            this.quantumField.points.rotation.y += 0.001;
        }
        
        // Animate DNA helix
        if (this.dnaHelix) {
            this.dnaHelix.rotation.y += 0.01;
            this.dnaHelix.rotation.x = Math.sin(time * 0.5) * 0.1;
        }
        
        // Animate floating code
        if (this.codeSprites) {
            this.codeSprites.forEach((item, index) => {
                const sprite = item.sprite;
                const original = item.originalPosition;
                
                sprite.position.y = original.y + Math.sin(time + index) * 20;
                sprite.position.x = original.x + Math.cos(time * 0.5 + index) * 10;
                sprite.material.opacity = 0.6 + Math.sin(time * 2 + index) * 0.2;
            });
        }
        
        // Animate neural network
        if (this.neuralNetwork) {
            this.neuralNetwork.nodes.forEach((node, index) => {
                node.material.opacity = 0.5 + Math.sin(time * 2 + index) * 0.3;
                node.scale.setScalar(1 + Math.sin(time * 3 + index) * 0.2);
            });
        }
        
        // Update reality distortion
        if (this.realityDistortion) {
            this.realityDistortion.material.uniforms.time.value = time;
            this.realityDistortion.material.uniforms.mouse.value.set(this.mouseX, this.mouseY);
        }
        
        // Camera movement
        this.camera.position.x = Math.sin(time * 0.1) * 10;
        this.camera.position.y = Math.cos(time * 0.15) * 5;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * Start animation loop
     */
    startAnimation() {
        this.animate();
    }
    
    /**
     * Pause animation
     */
    pauseAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    /**
     * Resume animation
     */
    resumeAnimation() {
        if (!this.animationId) {
            this.animate();
        }
    }
    
    /**
     * Get appropriate particle count based on device capabilities
     */
    getParticleCount() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = navigator.hardwareConcurrency < 4;
        
        if (isMobile || isLowEnd) {
            return 500;
        } else if (navigator.hardwareConcurrency >= 8) {
            return 2000;
        } else {
            return 1000;
        }
    }
    
    /**
     * Check WebGL support and capabilities
     */
    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!gl;
        } catch (e) {
            return false;
        }
    }
    
    /**
     * Cleanup resources
     */
    dispose() {
        this.pauseAnimation();
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        if (this.scene) {
            this.scene.clear();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('mousemove', this.handleMouseMove);
    }
}

// Export for use in other modules
window.QuantumEngine = QuantumEngine;