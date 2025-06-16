// ==========================================================================
// Virtual Office Experience JavaScript
// ==========================================================================

class VirtualOfficeExperience {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.canvas = null;
        this.currentArea = 'entrance';
        this.isMoving = false;
        this.mouse = { x: 0, y: 0 };
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2();
        this.interactableObjects = [];
        this.teamMembers = [];
        this.ambientParticles = [];
        
        this.officeAreas = {
            entrance: {
                name: 'エントランス',
                description: 'InnovateTechのバーチャルオフィスへようこそ！私たちの企業文化と価値観を感じてください。',
                position: { x: 0, y: 0, z: 0 },
                features: [
                    {
                        icon: '🎨',
                        title: 'ビジョンウォール',
                        description: '私たちのミッションとビジョンを視覚的に展示しています。'
                    },
                    {
                        icon: '🏆',
                        title: '受賞歴',
                        description: 'これまでの技術的成果と受賞歴をご覧いただけます。'
                    },
                    {
                        icon: '📈',
                        title: '成長の軌跡',
                        description: '会社の成長過程と今後のロードマップを紹介しています。'
                    }
                ]
            },
            'dev-area': {
                name: '開発エリア',
                description: 'エンジニアたちが革新的なソリューションを生み出すクリエイティブな空間です。',
                position: { x: -50, y: 0, z: -30 },
                features: [
                    {
                        icon: '💻',
                        title: 'コーディングスペース',
                        description: '最新の開発環境で効率的にコーディングを行います。'
                    },
                    {
                        icon: '🔍',
                        title: 'コードレビューエリア',
                        description: 'チームでコードレビューを行い、品質を高めています。'
                    },
                    {
                        icon: '🚀',
                        title: 'デプロイメントセンター',
                        description: 'CI/CDパイプラインを使った自動デプロイを管理します。'
                    }
                ]
            },
            meeting: {
                name: '会議室',
                description: 'チームコラボレーションとクリエイティブなブレインストーミングの場所です。',
                position: { x: 50, y: 0, z: -30 },
                features: [
                    {
                        icon: '🧠',
                        title: 'ブレインストーミング',
                        description: 'アイデア出しと創造的な議論を行います。'
                    },
                    {
                        icon: '📊',
                        title: 'プレゼンテーション',
                        description: 'プロジェクトの進捗や成果を共有します。'
                    },
                    {
                        icon: '🤝',
                        title: 'チームビルディング',
                        description: 'チームの結束を深める活動を行います。'
                    }
                ]
            },
            lounge: {
                name: 'ラウンジ',
                description: 'リラックスした雰囲気の中でカジュアルなコミュニケーションを楽しめます。',
                position: { x: 0, y: 0, z: 50 },
                features: [
                    {
                        icon: '☕',
                        title: 'カフェスペース',
                        description: 'コーヒーを飲みながらリラックスできます。'
                    },
                    {
                        icon: '🎮',
                        title: 'ゲームコーナー',
                        description: '息抜きにゲームを楽しむことができます。'
                    },
                    {
                        icon: '📚',
                        title: 'ライブラリー',
                        description: '技術書や専門書を自由に読むことができます。'
                    }
                ]
            }
        };
        
        this.teamMemberData = [
            {
                name: '田中 太郎',
                role: 'フロントエンドエンジニア',
                avatar: 'T',
                area: 'dev-area',
                position: { x: -40, y: 5, z: -25 },
                messages: [
                    'React と TypeScript で堅牢なフロントエンドを構築しています！',
                    'ユーザビリティを重視したUIデザインが得意です。',
                    '新しい技術の習得が大好きです！'
                ]
            },
            {
                name: '佐藤 花子',
                role: 'バックエンドエンジニア',
                avatar: 'S',
                area: 'dev-area',
                position: { x: -60, y: 5, z: -35 },
                messages: [
                    'スケーラブルなAPIアーキテクチャを設計しています。',
                    'パフォーマンス最適化が私の専門分野です。',
                    'クリーンなコードを書くことを心がけています。'
                ]
            },
            {
                name: '鈴木 次郎',
                role: 'プロダクトマネージャー',
                avatar: 'S',
                area: 'meeting',
                position: { x: 40, y: 5, z: -25 },
                messages: [
                    'ユーザーのニーズを技術に橋渡しします。',
                    'アジャイル開発でスピード感を重視しています。',
                    'チームの生産性向上に取り組んでいます。'
                ]
            },
            {
                name: '山田 美咲',
                role: 'UIUXデザイナー',
                avatar: 'Y',
                area: 'lounge',
                position: { x: -10, y: 5, z: 40 },
                messages: [
                    'ユーザー中心のデザインを追求しています。',
                    '美しく使いやすいインターフェースを創造します。',
                    'デザインシステムの構築が得意です。'
                ]
            }
        ];
        
        this.init();
    }
    
    init() {
        this.checkWebGLSupport();
        this.setupElements();
        this.setupEventListeners();
        this.initThreeJS();
        this.createOfficeEnvironment();
        this.setupTeamMembers();
        this.updateAreaInfo('entrance');
        this.animate();
    }
    
    checkWebGLSupport() {
        if (!window.WebGLRenderingContext) {
            this.showWebGLFallback();
            return false;
        }
        
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
            this.showWebGLFallback();
            return false;
        }
        
        return true;
    }
    
    showWebGLFallback() {
        const noWebGL = document.querySelector('.no-webgl');
        const fallbackOffice = document.querySelector('.fallback-office');
        const officeCanvas = document.getElementById('office-canvas');
        
        if (noWebGL) noWebGL.classList.add('show');
        if (fallbackOffice) fallbackOffice.classList.add('show');
        if (officeCanvas) officeCanvas.style.display = 'none';
        
        this.setupFallbackInteractions();
    }
    
    setupFallbackInteractions() {
        const areaCards = document.querySelectorAll('.office-area-card');
        areaCards.forEach(card => {
            card.addEventListener('click', () => {
                const areaId = card.dataset.area;
                if (areaId && this.officeAreas[areaId]) {
                    this.updateAreaInfo(areaId);
                }
            });
        });
    }
    
    setupElements() {
        this.canvas = document.getElementById('office-canvas');
        this.interactionPanel = document.getElementById('interaction-panel');
        this.areaButtons = document.querySelectorAll('.area-btn');
        this.loadingOverlay = document.querySelector('.office-loading');
    }
    
    setupEventListeners() {
        // Area navigation buttons
        this.areaButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const area = btn.textContent.toLowerCase().replace(/[^a-z]/g, '');
                const areaMap = {
                    'エントランス': 'entrance',
                    'entrance': 'entrance',
                    '開発エリア': 'dev-area',
                    'devarea': 'dev-area',
                    '会議室': 'meeting',
                    'meeting': 'meeting',
                    'ラウンジ': 'lounge',
                    'lounge': 'lounge'
                };
                const mappedArea = areaMap[area] || area;
                this.moveToArea(mappedArea);
            });
        });
        
        // Mouse events for 3D interaction
        if (this.canvas) {
            this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
            this.canvas.addEventListener('click', (event) => this.onMouseClick(event));
            this.canvas.addEventListener('wheel', (event) => this.onMouseWheel(event));
        }
        
        // Keyboard controls
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        
        // Window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    initThreeJS() {
        if (!this.canvas) return;
        
        // Show loading
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.remove('hidden');
        }
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a202c);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 10, 20);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Lighting
        this.setupLighting();
        
        // Hide loading after setup
        setTimeout(() => {
            if (this.loadingOverlay) {
                this.loadingOverlay.classList.add('hidden');
            }
        }, 1000);
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Accent lights for different areas
        this.createAccentLights();
    }
    
    createAccentLights() {
        const accentLights = [
            { color: 0x6366f1, position: { x: 0, y: 15, z: 0 }, intensity: 0.3 },
            { color: 0x10b981, position: { x: -50, y: 15, z: -30 }, intensity: 0.4 },
            { color: 0x3b82f6, position: { x: 50, y: 15, z: -30 }, intensity: 0.4 },
            { color: 0x8b5cf6, position: { x: 0, y: 15, z: 50 }, intensity: 0.3 }
        ];
        
        accentLights.forEach(lightData => {
            const light = new THREE.PointLight(lightData.color, lightData.intensity, 100);
            light.position.set(lightData.position.x, lightData.position.y, lightData.position.z);
            this.scene.add(light);
        });
    }
    
    createOfficeEnvironment() {
        // Floor
        this.createFloor();
        
        // Walls
        this.createWalls();
        
        // Furniture and decorations
        this.createFurniture();
        
        // Interactive hotspots
        this.createHotspots();
        
        // Ambient particles
        this.createAmbientParticles();
    }
    
    createFloor() {
        const floorGeometry = new THREE.PlaneGeometry(200, 200);
        const floorMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2d3748,
            transparent: true,
            opacity: 0.8
        });
        
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        
        // Floor grid
        const gridHelper = new THREE.GridHelper(200, 50, 0x4a5568, 0x4a5568);
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
    }
    
    createWalls() {
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4a5568,
            transparent: true,
            opacity: 0.7
        });
        
        // Create area dividers
        const areas = ['entrance', 'dev-area', 'meeting', 'lounge'];
        areas.forEach((area, index) => {
            const areaData = this.officeAreas[area];
            
            // Create area boundary
            const boundaryGeometry = new THREE.BoxGeometry(2, 15, 2);
            const boundaryMaterial = new THREE.MeshLambertMaterial({ 
                color: this.getAreaColor(area),
                transparent: true,
                opacity: 0.6
            });
            
            const boundary = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
            boundary.position.set(
                areaData.position.x - 20,
                7.5,
                areaData.position.z - 20
            );
            boundary.castShadow = true;
            this.scene.add(boundary);
        });
    }
    
    createFurniture() {
        Object.keys(this.officeAreas).forEach(areaKey => {
            const area = this.officeAreas[areaKey];
            this.createAreaFurniture(areaKey, area);
        });
    }
    
    createAreaFurniture(areaKey, area) {
        const furnitureColor = this.getAreaColor(areaKey);
        
        switch (areaKey) {
            case 'entrance':
                this.createReceptionDesk(area.position, furnitureColor);
                break;
            case 'dev-area':
                this.createDevelopmentSetup(area.position, furnitureColor);
                break;
            case 'meeting':
                this.createMeetingRoom(area.position, furnitureColor);
                break;
            case 'lounge':
                this.createLoungeArea(area.position, furnitureColor);
                break;
        }
    }
    
    createReceptionDesk(position, color) {
        const deskGeometry = new THREE.BoxGeometry(20, 3, 8);
        const deskMaterial = new THREE.MeshLambertMaterial({ color });
        
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.set(position.x, 1.5, position.z - 10);
        desk.castShadow = true;
        this.scene.add(desk);
        
        // Welcome sign
        const signGeometry = new THREE.PlaneGeometry(15, 5);
        const signMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.9
        });
        
        const sign = new THREE.Mesh(signGeometry, signMaterial);
        sign.position.set(position.x, 8, position.z - 15);
        this.scene.add(sign);
    }
    
    createDevelopmentSetup(position, color) {
        // Desks
        for (let i = 0; i < 3; i++) {
            const deskGeometry = new THREE.BoxGeometry(12, 2, 6);
            const deskMaterial = new THREE.MeshLambertMaterial({ color });
            
            const desk = new THREE.Mesh(deskGeometry, deskMaterial);
            desk.position.set(
                position.x + (i - 1) * 15,
                1,
                position.z
            );
            desk.castShadow = true;
            this.scene.add(desk);
            
            // Monitors
            const monitorGeometry = new THREE.BoxGeometry(8, 5, 1);
            const monitorMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            
            const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
            monitor.position.set(
                position.x + (i - 1) * 15,
                4.5,
                position.z - 2
            );
            this.scene.add(monitor);
        }
    }
    
    createMeetingRoom(position, color) {
        // Conference table
        const tableGeometry = new THREE.BoxGeometry(20, 2, 10);
        const tableMaterial = new THREE.MeshLambertMaterial({ color });
        
        const table = new THREE.Mesh(tableGeometry, tableMaterial);
        table.position.set(position.x, 1, position.z);
        table.castShadow = true;
        this.scene.add(table);
        
        // Chairs around table
        for (let i = 0; i < 8; i++) {
            const chairGeometry = new THREE.BoxGeometry(2, 4, 2);
            const chairMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
            
            const chair = new THREE.Mesh(chairGeometry, chairMaterial);
            const angle = (i / 8) * Math.PI * 2;
            chair.position.set(
                position.x + Math.cos(angle) * 15,
                2,
                position.z + Math.sin(angle) * 8
            );
            chair.castShadow = true;
            this.scene.add(chair);
        }
    }
    
    createLoungeArea(position, color) {
        // Sofas
        const sofaGeometry = new THREE.BoxGeometry(15, 3, 6);
        const sofaMaterial = new THREE.MeshLambertMaterial({ color });
        
        const sofa1 = new THREE.Mesh(sofaGeometry, sofaMaterial);
        sofa1.position.set(position.x - 10, 1.5, position.z);
        sofa1.castShadow = true;
        this.scene.add(sofa1);
        
        const sofa2 = new THREE.Mesh(sofaGeometry, sofaMaterial);
        sofa2.position.set(position.x + 10, 1.5, position.z);
        sofa2.castShadow = true;
        this.scene.add(sofa2);
        
        // Coffee table
        const coffeeTableGeometry = new THREE.BoxGeometry(8, 1, 4);
        const coffeeTableMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        
        const coffeeTable = new THREE.Mesh(coffeeTableGeometry, coffeeTableMaterial);
        coffeeTable.position.set(position.x, 0.5, position.z);
        coffeeTable.castShadow = true;
        this.scene.add(coffeeTable);
    }
    
    createHotspots() {
        Object.keys(this.officeAreas).forEach(areaKey => {
            const area = this.officeAreas[areaKey];
            
            const hotspotGeometry = new THREE.SphereGeometry(1, 16, 16);
            const hotspotMaterial = new THREE.MeshBasicMaterial({ 
                color: this.getAreaColor(areaKey),
                transparent: true,
                opacity: 0.7
            });
            
            const hotspot = new THREE.Mesh(hotspotGeometry, hotspotMaterial);
            hotspot.position.set(
                area.position.x,
                2,
                area.position.z
            );
            hotspot.userData = { type: 'hotspot', area: areaKey };
            
            this.scene.add(hotspot);
            this.interactableObjects.push(hotspot);
        });
    }
    
    createAmbientParticles() {
        const particleCount = 50;
        const particleGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.1
        });
        
        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 200,
                Math.random() * 20 + 5,
                (Math.random() - 0.5) * 200
            );
            
            particle.userData = {
                originalY: particle.position.y,
                floatSpeed: Math.random() * 0.02 + 0.01
            };
            
            this.scene.add(particle);
            this.ambientParticles.push(particle);
        }
    }
    
    setupTeamMembers() {
        this.teamMemberData.forEach(memberData => {
            const memberGeometry = new THREE.CylinderGeometry(1.5, 1.5, 5, 8);
            const memberMaterial = new THREE.MeshLambertMaterial({ 
                color: this.getAreaColor(memberData.area)
            });
            
            const member = new THREE.Mesh(memberGeometry, memberMaterial);
            member.position.set(
                memberData.position.x,
                memberData.position.y,
                memberData.position.z
            );
            member.userData = { 
                type: 'team-member',
                data: memberData
            };
            member.castShadow = true;
            
            this.scene.add(member);
            this.interactableObjects.push(member);
            this.teamMembers.push(member);
        });
    }
    
    getAreaColor(areaKey) {
        const colors = {
            entrance: 0x6366f1,
            'dev-area': 0x10b981,
            meeting: 0x3b82f6,
            lounge: 0x8b5cf6
        };
        return colors[areaKey] || 0x6366f1;
    }
    
    moveToArea(areaKey) {
        if (!this.officeAreas[areaKey] || this.isMoving) return;
        
        this.isMoving = true;
        this.currentArea = areaKey;
        const targetArea = this.officeAreas[areaKey];
        
        // Update UI
        this.updateAreaButtons(areaKey);
        this.updateAreaInfo(areaKey);
        
        // Animate camera to new position
        const targetPosition = {
            x: targetArea.position.x,
            y: 15,
            z: targetArea.position.z + 30
        };
        
        this.animateCamera(targetPosition, () => {
            this.isMoving = false;
        });
    }
    
    animateCamera(targetPosition, onComplete) {
        const startPosition = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };
        
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-in-out function
            const easeProgress = progress < 0.5 
                ? 2 * progress * progress 
                : -1 + (4 - 2 * progress) * progress;
            
            this.camera.position.x = startPosition.x + (targetPosition.x - startPosition.x) * easeProgress;
            this.camera.position.y = startPosition.y + (targetPosition.y - startPosition.y) * easeProgress;
            this.camera.position.z = startPosition.z + (targetPosition.z - startPosition.z) * easeProgress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else if (onComplete) {
                onComplete();
            }
        };
        
        animate();
    }
    
    updateAreaButtons(activeArea) {
        this.areaButtons.forEach(btn => {
            btn.classList.remove('active');
            const btnText = btn.textContent.toLowerCase();
            
            const areaMap = {
                'エントランス': 'entrance',
                '開発エリア': 'dev-area',
                '会議室': 'meeting',
                'ラウンジ': 'lounge'
            };
            
            if (areaMap[btn.textContent] === activeArea) {
                btn.classList.add('active');
            }
        });
    }
    
    updateAreaInfo(areaKey) {
        if (!this.interactionPanel || !this.officeAreas[areaKey]) return;
        
        const area = this.officeAreas[areaKey];
        
        this.interactionPanel.innerHTML = `
            <h3>${area.name}</h3>
            <p>${area.description}</p>
            
            <div class="area-features">
                ${area.features.map(feature => `
                    <div class="feature-card">
                        <span class="feature-icon">${feature.icon}</span>
                        <div class="feature-title">${feature.title}</div>
                        <div class="feature-description">${feature.description}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    onMouseMove(event) {
        if (!this.canvas) return;
        
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.updateRaycaster();
        this.checkHover();
    }
    
    onMouseClick(event) {
        if (this.isMoving) return;
        
        this.updateRaycaster();
        const intersects = this.raycaster.intersectObjects(this.interactableObjects);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            this.handleObjectClick(object);
        }
    }
    
    onMouseWheel(event) {
        event.preventDefault();
        
        const zoomSpeed = 0.1;
        const zoomDirection = event.deltaY > 0 ? 1 : -1;
        
        this.camera.position.z += zoomDirection * zoomSpeed * 10;
        this.camera.position.z = Math.max(5, Math.min(50, this.camera.position.z));
    }
    
    onKeyDown(event) {
        if (this.isMoving) return;
        
        const moveSpeed = 2;
        
        switch (event.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                this.camera.position.z -= moveSpeed;
                break;
            case 's':
            case 'arrowdown':
                this.camera.position.z += moveSpeed;
                break;
            case 'a':
            case 'arrowleft':
                this.camera.position.x -= moveSpeed;
                break;
            case 'd':
            case 'arrowright':
                this.camera.position.x += moveSpeed;
                break;
        }
    }
    
    updateRaycaster() {
        this.mouseVector.set(this.mouse.x, this.mouse.y);
        this.raycaster.setFromCamera(this.mouseVector, this.camera);
    }
    
    checkHover() {
        const intersects = this.raycaster.intersectObjects(this.interactableObjects);
        
        // Reset all objects
        this.interactableObjects.forEach(obj => {
            if (obj.material.emissive) {
                obj.material.emissive.setHex(0x000000);
            }
        });
        
        // Highlight hovered object
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.material.emissive) {
                object.material.emissive.setHex(0x333333);
            }
            this.canvas.style.cursor = 'pointer';
        } else {
            this.canvas.style.cursor = 'crosshair';
        }
    }
    
    handleObjectClick(object) {
        const userData = object.userData;
        
        if (userData.type === 'hotspot') {
            this.moveToArea(userData.area);
        } else if (userData.type === 'team-member') {
            this.showTeamMemberInfo(userData.data);
        }
    }
    
    showTeamMemberInfo(memberData) {
        const randomMessage = memberData.messages[
            Math.floor(Math.random() * memberData.messages.length)
        ];
        
        // Create or update chat bubble
        let chatBubble = document.querySelector('.chat-bubble');
        if (!chatBubble) {
            chatBubble = document.createElement('div');
            chatBubble.className = 'chat-bubble';
            this.interactionPanel.appendChild(chatBubble);
        }
        
        chatBubble.innerHTML = `
            <div class="chat-author">${memberData.name} - ${memberData.role}</div>
            <div class="chat-message">${randomMessage}</div>
        `;
        
        chatBubble.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            chatBubble.classList.remove('show');
        }, 5000);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Animate ambient particles
        this.ambientParticles.forEach(particle => {
            const time = Date.now() * particle.userData.floatSpeed;
            particle.position.y = particle.userData.originalY + Math.sin(time) * 2;
        });
        
        // Animate hotspots
        this.interactableObjects.forEach(object => {
            if (object.userData.type === 'hotspot') {
                object.rotation.y += 0.01;
                const time = Date.now() * 0.001;
                object.position.y = 2 + Math.sin(time * 2) * 0.5;
            }
        });
        
        // Render scene
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    onWindowResize() {
        if (!this.camera || !this.renderer || !this.canvas) return;
        
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }
}

// Global function for area navigation (called from HTML)
function moveToArea(areaKey) {
    if (window.virtualOffice) {
        window.virtualOffice.moveToArea(areaKey);
    }
}

// Initialize Virtual Office Experience when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is available
    if (typeof THREE !== 'undefined') {
        window.virtualOffice = new VirtualOfficeExperience();
    } else {
        console.warn('Three.js not loaded, falling back to 2D interface');
        const noWebGL = document.querySelector('.no-webgl');
        if (noWebGL) noWebGL.classList.add('show');
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VirtualOfficeExperience;
}