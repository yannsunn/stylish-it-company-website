// ==========================================================================
// Code Poetry Gallery JavaScript
// ==========================================================================

class CodePoetryGallery {
    constructor() {
        this.currentPoem = 'fibonacci';
        this.isPlaying = false;
        this.audioContext = null;
        this.oscillator = null;
        this.visualizationCanvas = null;
        this.visualizationCtx = null;
        this.animationId = null;
        
        this.codePoems = {
            fibonacci: {
                title: 'フィボナッチ詩',
                description: '数学の美しさをコードで表現した永遠の詩。黄金比が織りなす自然の調和を感じてください。',
                code: `// 🌟 フィボナッチ詩 - 自然の黄金比
const fibonacci = (n) => {
    if (n <= 1) return n;
    
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        [prev, curr] = [curr, prev + curr];
    }
    return curr;
};

// 💫 黄金比への収束の美しさ
const goldenRatio = (n) => {
    const fib_n = fibonacci(n);
    const fib_n1 = fibonacci(n - 1);
    return fib_n / fib_n1; // φ ≈ 1.618...
};

// 🎵 自然のリズムを刻む
for (let i = 1; i <= 20; i++) {
    const ratio = goldenRatio(i);
    console.log(\`Step \${i}: \${ratio.toFixed(6)}\`);
}`,
                frequency: [261.63, 329.63, 392.00, 523.25], // C, E, G, C
                colors: ['#FFD700', '#FFA500', '#FF6347', '#FF1493']
            },
            
            quicksort: {
                title: 'クイックソート舞踏',
                description: '分割統治法の優雅な舞踏。データが踊りながら美しく整列していく様子をお楽しみください。',
                code: `// 🎭 クイックソート舞踏 - 分割と征服の芸術
const quickSort = (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
        // 🎪 ピボットで舞台を分割
        const pivotIndex = partition(arr, low, high);
        
        // 💃 左の舞踏者たちを整列
        quickSort(arr, low, pivotIndex - 1);
        
        // 🕺 右の舞踏者たちを整列  
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
};

// 🎨 美しい分割の瞬間
const partition = (arr, low, high) => {
    const pivot = arr[high]; // 🌟 主役のピボット
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // 💫 エレガントな交換
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
};

// 🎼 ランダムな音符を美しく整列
const notes = [64, 23, 87, 45, 91, 12, 78];
const sortedNotes = quickSort([...notes]);
console.log('🎵 Before:', notes);
console.log('🎶 After:', sortedNotes);`,
                frequency: [220.00, 246.94, 277.18, 293.66], // A, B, C#, D
                colors: ['#8A2BE2', '#9370DB', '#BA55D3', '#DA70D6']
            },
            
            neural: {
                title: 'ニューラル交響曲',  
                description: '人工知能の学習過程を音楽的に表現。ニューロンのシナプスが織りなす知的な響きを体感してください。',
                code: `// 🧠 ニューラル交響曲 - 人工知能の詩
class NeuralNetwork {
    constructor(inputSize, hiddenSize, outputSize) {
        this.weights1 = this.randomMatrix(inputSize, hiddenSize);
        this.weights2 = this.randomMatrix(hiddenSize, outputSize);
        this.bias1 = this.randomMatrix(1, hiddenSize);
        this.bias2 = this.randomMatrix(1, outputSize);
    }
    
    // 🎼 シグモイド活性化 - 滑らかな音の波
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
    
    // 🎵 前向き伝播 - 思考の流れ
    forward(input) {
        // 🌊 第一層の響き
        const hidden = this.matrixAdd(
            this.matrixMultiply(input, this.weights1),
            this.bias1
        ).map(row => row.map(val => this.sigmoid(val)));
        
        // ✨ 最終出力の調和
        const output = this.matrixAdd(
            this.matrixMultiply(hidden, this.weights2),
            this.bias2
        ).map(row => row.map(val => this.sigmoid(val)));
        
        return { hidden, output };
    }
    
    // 🎯 学習の瞬間 - 知識の獲得
    train(input, target, learningRate = 0.1) {
        const { hidden, output } = this.forward(input);
        // 🧮 誤差逆伝播の美しきアルゴリズム...
        console.log('🎭 Learning in progress...');
    }
}

// 🎪 知能の誕生
const brain = new NeuralNetwork(3, 5, 2);
const thoughts = [[0.8, 0.3, 0.9]];
const wisdom = brain.forward(thoughts);
console.log('🧠 Neural Symphony:', wisdom);`,
                frequency: [174.61, 207.65, 246.94, 293.66], // F, G#, B, D
                colors: ['#00CED1', '#40E0D0', '#48D1CC', '#5F9EA0']
            },
            
            blockchain: {
                title: 'ブロックチェーン協奏曲',
                description: '分散台帳の革新的な仕組みを音楽で表現。信頼とセキュリティが紡ぎ出す未来の調べです。',
                code: `// ⛓️ ブロックチェーン協奏曲 - 信頼の連鎖
class Block {
    constructor(data, previousHash = '') {
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }
    
    // 🔐 暗号学的ハッシュ - 不変の印章
    calculateHash() {
        return require('crypto')
            .createHash('sha256')
            .update(this.previousHash + this.timestamp + 
                   JSON.stringify(this.data) + this.nonce)
            .digest('hex');
    }
    
    // ⛏️ プルーフオブワーク - 労働の証明
    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join('0');
        
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++; // 🎲 運命の数字を探して
            this.hash = this.calculateHash();
        }
        
        console.log(\`💎 Block mined: \${this.hash}\`);
    }
}

// ⛓️ 不滅のチェーン
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4; // 🏔️ 困難の山
    }
    
    // 🌅 創世記ブロック - すべての始まり
    createGenesisBlock() {
        return new Block('Genesis Block', '0');
    }
    
    // 🔗 新たなブロックを鍛造
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
}

// 🌟 分散的な未来の始まり
const innovateChain = new Blockchain();
innovateChain.addBlock(new Block({ transaction: 'Innovation' }));
console.log('⛓️ Blockchain Symphony Complete!');`,
                frequency: [130.81, 164.81, 196.00, 261.63], // C, E, G, C (octave lower)
                colors: ['#32CD32', '#228B22', '#006400', '#008000']
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupVisualization();
        this.displayPoem(this.currentPoem);
    }
    
    setupElements() {
        this.musicBtn = document.getElementById('play-music');
        this.codeSelector = document.getElementById('code-selector');
        this.poetryCode = document.getElementById('poetry-code');
        this.poemTitle = document.getElementById('poem-title');
        this.poemDescription = document.getElementById('poem-description');
        this.visualizationCanvas = document.getElementById('code-viz');
        
        if (this.visualizationCanvas) {
            this.visualizationCtx = this.visualizationCanvas.getContext('2d');
            this.resizeCanvas();
        }
    }
    
    setupEventListeners() {
        if (this.musicBtn) {
            this.musicBtn.addEventListener('click', () => this.toggleMusic());
        }
        
        if (this.codeSelector) {
            this.codeSelector.addEventListener('change', (e) => {
                this.displayPoem(e.target.value);
            });
        }
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    setupVisualization() {
        if (!this.visualizationCanvas) return;
        
        this.resizeCanvas();
        this.startVisualization();
    }
    
    resizeCanvas() {
        if (!this.visualizationCanvas) return;
        
        const container = this.visualizationCanvas.parentElement;
        this.visualizationCanvas.width = container.clientWidth - 32;
        this.visualizationCanvas.height = 400;
    }
    
    displayPoem(poemKey) {
        this.currentPoem = poemKey;
        const poem = this.codePoems[poemKey];
        
        if (!poem) return;
        
        // Update text content
        if (this.poemTitle) this.poemTitle.textContent = poem.title;
        if (this.poemDescription) this.poemDescription.textContent = poem.description;
        
        // Animate code display
        this.animateCodeDisplay(poem.code);
        
        // Update visualization
        this.updateVisualization(poem);
    }
    
    animateCodeDisplay(code) {
        if (!this.poetryCode) return;
        
        this.poetryCode.innerHTML = '';
        this.poetryCode.classList.add('loading-code');
        
        setTimeout(() => {
            this.poetryCode.classList.remove('loading-code');
            this.typewriterEffect(code);
        }, 500);
    }
    
    typewriterEffect(code) {
        const lines = code.split('\\n');
        this.poetryCode.innerHTML = '';
        
        lines.forEach((line, index) => {
            setTimeout(() => {
                const lineElement = document.createElement('div');
                lineElement.className = 'code-line';
                lineElement.innerHTML = this.highlightSyntax(line);
                this.poetryCode.appendChild(lineElement);
                
                // Add interactive hover effects
                lineElement.addEventListener('mouseenter', () => {
                    this.highlightRelatedCode(lineElement);
                });
            }, index * 100);
        });
    }
    
    highlightSyntax(line) {
        // Simple syntax highlighting
        return line
            .replace(/(const|let|var|function|class|if|else|for|while|return)/g, 
                    '<span class="token keyword">$1</span>')
            .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)(\\s*\\()/g, 
                    '<span class="token function">$1</span>$2')
            .replace(/(['\"`])(.*?)\\1/g, 
                    '<span class="token string">$1$2$1</span>')
            .replace(/(\\b\\d+\\.?\\d*\\b)/g, 
                    '<span class="token number">$1</span>');
    }
    
    highlightRelatedCode(element) {
        // Add glow effect to related code elements
        const text = element.textContent;
        if (text.includes('function') || text.includes('const')) {
            element.style.background = 'rgba(99, 102, 241, 0.2)';
            element.style.transform = 'translateX(10px)';
            element.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                element.style.background = '';
                element.style.transform = '';
            }, 2000);
        }
    }
    
    async toggleMusic() {
        if (this.isPlaying) {
            this.stopMusic();
        } else {
            await this.startMusic();
        }
    }
    
    async startMusic() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            await this.audioContext.resume();
            
            this.isPlaying = true;
            this.musicBtn.textContent = '⏸️ 音楽を停止';
            this.musicBtn.classList.add('playing');
            
            this.playCodeMusic();
            this.startMusicVisualization();
            
        } catch (error) {
            console.error('Audio context error:', error);
        }
    }
    
    stopMusic() {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator = null;
        }
        
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        this.isPlaying = false;
        this.musicBtn.textContent = '🎵 音楽と同期';
        this.musicBtn.classList.remove('playing');
        
        document.querySelector('.code-poetry-section').classList.remove('music-playing');
    }
    
    playCodeMusic() {
        const poem = this.codePoems[this.currentPoem];
        if (!poem || !this.audioContext) return;
        
        document.querySelector('.code-poetry-section').classList.add('music-playing');
        
        let noteIndex = 0;
        const playNote = () => {
            if (!this.isPlaying || !this.audioContext) return;
            
            if (this.oscillator) {
                this.oscillator.stop();
            }
            
            this.oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            this.oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            this.oscillator.frequency.setValueAtTime(
                poem.frequency[noteIndex % poem.frequency.length], 
                this.audioContext.currentTime
            );
            
            this.oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);
            
            this.oscillator.start();
            this.oscillator.stop(this.audioContext.currentTime + 1);
            
            noteIndex++;
            setTimeout(playNote, 1000);
        };
        
        playNote();
    }
    
    startVisualization() {
        if (!this.visualizationCtx) return;
        
        const animate = () => {
            this.drawVisualization();
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    drawVisualization() {
        if (!this.visualizationCtx) return;
        
        const ctx = this.visualizationCtx;
        const width = this.visualizationCanvas.width;
        const height = this.visualizationCanvas.height;
        
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        const poem = this.codePoems[this.currentPoem];
        const time = Date.now() * 0.001;
        
        // Draw animated patterns based on current poem
        this.drawPoemVisualization(ctx, width, height, time, poem);
    }
    
    drawPoemVisualization(ctx, width, height, time, poem) {
        const colors = poem.colors;
        
        switch (this.currentPoem) {
            case 'fibonacci':
                this.drawFibonacciSpiral(ctx, width, height, time, colors);
                break;
            case 'quicksort':
                this.drawSortingBars(ctx, width, height, time, colors);
                break;
            case 'neural':
                this.drawNeuralNetwork(ctx, width, height, time, colors);
                break;
            case 'blockchain':
                this.drawBlockchain(ctx, width, height, time, colors);
                break;
        }
    }
    
    drawFibonacciSpiral(ctx, width, height, time, colors) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 4;
        
        ctx.strokeStyle = colors[0];
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        let angle = 0;
        let r = 5;
        const spiralTightness = 0.1;
        
        for (let i = 0; i < 200; i++) {
            const x = centerX + r * Math.cos(angle + time);
            const y = centerY + r * Math.sin(angle + time);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            angle += spiralTightness;
            r += spiralTightness * 2;
            
            // Color gradient along spiral
            const colorIndex = Math.floor(i / 50) % colors.length;
            ctx.strokeStyle = colors[colorIndex];
        }
        
        ctx.stroke();
        
        // Add golden ratio rectangles
        this.drawGoldenRectangles(ctx, centerX, centerY, time, colors);
    }
    
    drawGoldenRectangles(ctx, centerX, centerY, time, colors) {
        const phi = 1.618033988749;
        let size = 20;
        
        for (let i = 0; i < 8; i++) {
            ctx.strokeStyle = colors[i % colors.length];
            ctx.lineWidth = 1;
            ctx.strokeRect(
                centerX - size / 2 + Math.sin(time + i) * 10,
                centerY - size / 2 + Math.cos(time + i) * 10,
                size,
                size / phi
            );
            size *= phi;
        }
    }
    
    drawSortingBars(ctx, width, height, time, colors) {
        const barCount = 20;
        const barWidth = width / barCount;
        
        for (let i = 0; i < barCount; i++) {
            const barHeight = (Math.sin(time + i * 0.5) * 0.5 + 0.5) * height * 0.8;
            const x = i * barWidth;
            const y = height - barHeight;
            
            const colorIndex = Math.floor(barHeight / (height * 0.2)) % colors.length;
            ctx.fillStyle = colors[colorIndex];
            
            ctx.fillRect(x, y, barWidth - 2, barHeight);
            
            // Add glow effect
            ctx.shadowColor = colors[colorIndex];
            ctx.shadowBlur = 10;
            ctx.fillRect(x, y, barWidth - 2, barHeight);
            ctx.shadowBlur = 0;
        }
    }
    
    drawNeuralNetwork(ctx, width, height, time, colors) {
        const nodes = [
            { x: width * 0.2, y: height * 0.3, layer: 0 },
            { x: width * 0.2, y: height * 0.5, layer: 0 },
            { x: width * 0.2, y: height * 0.7, layer: 0 },
            { x: width * 0.5, y: height * 0.2, layer: 1 },
            { x: width * 0.5, y: height * 0.4, layer: 1 },
            { x: width * 0.5, y: height * 0.6, layer: 1 },
            { x: width * 0.5, y: height * 0.8, layer: 1 },
            { x: width * 0.8, y: height * 0.4, layer: 2 },
            { x: width * 0.8, y: height * 0.6, layer: 2 }
        ];
        
        // Draw connections
        ctx.strokeStyle = colors[1];
        ctx.lineWidth = 1;
        nodes.forEach(node1 => {
            nodes.forEach(node2 => {
                if (Math.abs(node1.layer - node2.layer) === 1) {
                    const strength = Math.sin(time + node1.x + node2.y) * 0.5 + 0.5;
                    ctx.globalAlpha = strength;
                    ctx.beginPath();
                    ctx.moveTo(node1.x, node1.y);
                    ctx.lineTo(node2.x, node2.y);
                    ctx.stroke();
                }
            });
        });
        
        ctx.globalAlpha = 1;
        
        // Draw nodes
        nodes.forEach((node, index) => {
            const activation = Math.sin(time * 2 + index) * 0.5 + 0.5;
            const radius = 8 + activation * 5;
            
            ctx.fillStyle = colors[node.layer % colors.length];
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Add pulse effect
            ctx.strokeStyle = colors[node.layer % colors.length];
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius + activation * 10, 0, Math.PI * 2);
            ctx.globalAlpha = 1 - activation;
            ctx.stroke();
            ctx.globalAlpha = 1;
        });
    }
    
    drawBlockchain(ctx, width, height, time, colors) {
        const blockCount = 5;
        const blockWidth = width / (blockCount + 1);
        const blockHeight = 60;
        
        for (let i = 0; i < blockCount; i++) {
            const x = (i + 1) * blockWidth - blockWidth / 2;
            const y = height / 2 - blockHeight / 2 + Math.sin(time + i) * 10;
            
            // Draw block
            ctx.fillStyle = colors[i % colors.length];
            ctx.fillRect(x, y, blockWidth * 0.8, blockHeight);
            
            // Draw hash pattern
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '10px monospace';
            ctx.fillText('HASH', x + 10, y + 20);
            ctx.fillText(this.generateMockHash(i), x + 5, y + 35);
            
            // Draw connection to next block
            if (i < blockCount - 1) {
                ctx.strokeStyle = colors[(i + 1) % colors.length];
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x + blockWidth * 0.8, y + blockHeight / 2);
                ctx.lineTo(x + blockWidth, y + blockHeight / 2);
                ctx.stroke();
                
                // Add arrow
                const arrowX = x + blockWidth - 5;
                const arrowY = y + blockHeight / 2;
                ctx.beginPath();
                ctx.moveTo(arrowX, arrowY);
                ctx.lineTo(arrowX - 10, arrowY - 5);
                ctx.lineTo(arrowX - 10, arrowY + 5);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
    
    generateMockHash(seed) {
        const chars = '0123456789abcdef';
        let hash = '';
        for (let i = 0; i < 8; i++) {
            hash += chars[(seed * 7 + i * 3) % chars.length];
        }
        return hash;
    }
    
    startMusicVisualization() {
        if (!this.isPlaying) return;
        
        const createAudioBars = () => {
            const vizContainer = document.querySelector('.visualization-container');
            if (!vizContainer || vizContainer.querySelector('.audio-bars')) return;
            
            const audioBars = document.createElement('div');
            audioBars.className = 'audio-bars';
            
            for (let i = 0; i < 12; i++) {
                const bar = document.createElement('div');
                bar.className = 'audio-bar';
                bar.style.animationDelay = `${i * 0.1}s`;
                audioBars.appendChild(bar);
            }
            
            vizContainer.appendChild(audioBars);
        };
        
        createAudioBars();
        
        setTimeout(() => {
            const audioBars = document.querySelector('.audio-bars');
            if (audioBars && !this.isPlaying) {
                audioBars.remove();
            }
        }, 1000);
    }
    
    updateVisualization(poem) {
        // Update visualization overlay
        const vizOverlay = document.querySelector('.viz-overlay') || this.createVizOverlay();
        const vizTitle = vizOverlay.querySelector('.viz-title');
        const vizDescription = vizOverlay.querySelector('.viz-description');
        
        if (vizTitle) vizTitle.textContent = `${poem.title} - ライブビジュアライゼーション`;
        if (vizDescription) vizDescription.textContent = 'コードの実行と連動したリアルタイム可視化';
    }
    
    createVizOverlay() {
        const vizContainer = document.querySelector('.visualization-container');
        if (!vizContainer) return null;
        
        const overlay = document.createElement('div');
        overlay.className = 'viz-overlay';
        overlay.innerHTML = `
            <div class="viz-title"></div>
            <div class="viz-description"></div>
        `;
        
        vizContainer.appendChild(overlay);
        return overlay;
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize Code Poetry Gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CodePoetryGallery();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodePoetryGallery;
}