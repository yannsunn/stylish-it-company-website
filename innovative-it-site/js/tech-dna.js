// ==========================================================================
// Tech DNA Storytelling JavaScript
// ==========================================================================

class TechDNAStorytelling {
    constructor() {
        this.svg = null;
        this.width = 0;
        this.height = 0;
        this.currentYear = 2024;
        this.isAnimating = false;
        this.selectedNode = null;
        
        this.techData = {
            2015: [
                { id: 'react15', name: 'React', category: 'frontend', x: 200, y: 100, color: '#61dafb', icon: '⚛️' },
                { id: 'node15', name: 'Node.js', category: 'backend', x: 400, y: 150, color: '#68a063', icon: '🟢' },
                { id: 'mongo15', name: 'MongoDB', category: 'database', x: 600, y: 200, color: '#4db33d', icon: '🍃' }
            ],
            2016: [
                { id: 'react15', name: 'React', category: 'frontend', x: 180, y: 120, color: '#61dafb', icon: '⚛️' },
                { id: 'node15', name: 'Node.js', category: 'backend', x: 380, y: 160, color: '#68a063', icon: '🟢' },
                { id: 'mongo15', name: 'MongoDB', category: 'database', x: 580, y: 180, color: '#4db33d', icon: '🍃' },
                { id: 'vue16', name: 'Vue.js', category: 'frontend', x: 220, y: 180, color: '#4fc08d', icon: '🎋' },
                { id: 'express16', name: 'Express', category: 'backend', x: 420, y: 220, color: '#ffffff', icon: '🚂' }
            ],
            2017: [
                { id: 'react15', name: 'React', category: 'frontend', x: 160, y: 140, color: '#61dafb', icon: '⚛️' },
                { id: 'node15', name: 'Node.js', category: 'backend', x: 360, y: 170, color: '#68a063', icon: '🟢' },
                { id: 'mongo15', name: 'MongoDB', category: 'database', x: 560, y: 160, color: '#4db33d', icon: '🍃' },
                { id: 'vue16', name: 'Vue.js', category: 'frontend', x: 200, y: 200, color: '#4fc08d', icon: '🎋' },
                { id: 'express16', name: 'Express', category: 'backend', x: 400, y: 240, color: '#ffffff', icon: '🚂' },
                { id: 'docker17', name: 'Docker', category: 'devops', x: 700, y: 150, color: '#0db7ed', icon: '🐳' },
                { id: 'graphql17', name: 'GraphQL', category: 'backend', x: 450, y: 300, color: '#e10098', icon: '📊' }
            ],
            2018: [
                { id: 'react15', name: 'React', category: 'frontend', x: 140, y: 160, color: '#61dafb', icon: '⚛️' },
                { id: 'node15', name: 'Node.js', category: 'backend', x: 340, y: 180, color: '#68a063', icon: '🟢' },
                { id: 'mongo15', name: 'MongoDB', category: 'database', x: 540, y: 140, color: '#4db33d', icon: '🍃' },
                { id: 'vue16', name: 'Vue.js', category: 'frontend', x: 180, y: 220, color: '#4fc08d', icon: '🎋' },
                { id: 'express16', name: 'Express', category: 'backend', x: 380, y: 260, color: '#ffffff', icon: '🚂' },
                { id: 'docker17', name: 'Docker', category: 'devops', x: 680, y: 130, color: '#0db7ed', icon: '🐳' },
                { id: 'graphql17', name: 'GraphQL', category: 'backend', x: 430, y: 320, color: '#e10098', icon: '📊' },
                { id: 'k8s18', name: 'Kubernetes', category: 'devops', x: 720, y: 200, color: '#326ce5', icon: '⚙️' },
                { id: 'tensorflow18', name: 'TensorFlow', category: 'ai', x: 600, y: 300, color: '#ff6f00', icon: '🧠' }
            ],
            2019: [
                { id: 'react15', name: 'React', category: 'frontend', x: 120, y: 180, color: '#61dafb', icon: '⚛️' },
                { id: 'node15', name: 'Node.js', category: 'backend', x: 320, y: 190, color: '#68a063', icon: '🟢' },
                { id: 'mongo15', name: 'MongoDB', category: 'database', x: 520, y: 120, color: '#4db33d', icon: '🍃' },
                { id: 'vue16', name: 'Vue.js', category: 'frontend', x: 160, y: 240, color: '#4fc08d', icon: '🎋' },
                { id: 'express16', name: 'Express', category: 'backend', x: 360, y: 280, color: '#ffffff', icon: '🚂' },
                { id: 'docker17', name: 'Docker', category: 'devops', x: 660, y: 110, color: '#0db7ed', icon: '🐳' },
                { id: 'graphql17', name: 'GraphQL', category: 'backend', x: 410, y: 340, color: '#e10098', icon: '📊' },
                { id: 'k8s18', name: 'Kubernetes', category: 'devops', x: 700, y: 180, color: '#326ce5', icon: '⚙️' },
                { id: 'tensorflow18', name: 'TensorFlow', category: 'ai', x: 580, y: 320, color: '#ff6f00', icon: '🧠' },
                { id: 'svelte19', name: 'Svelte', category: 'frontend', x: 100, y: 120, color: '#ff3e00', icon: '🔥' },
                { id: 'deno19', name: 'Deno', category: 'backend', x: 300, y: 350, color: '#000000', icon: '🦕' }
            ],
            2020: [
                { id: 'react15', name: 'React', category: 'frontend', x: 100, y: 200, color: '#61dafb', icon: '⚛️' },
                { id: 'node15', name: 'Node.js', category: 'backend', x: 300, y: 200, color: '#68a063', icon: '🟢' },
                { id: 'mongo15', name: 'MongoDB', category: 'database', x: 500, y: 100, color: '#4db33d', icon: '🍃' },
                { id: 'vue16', name: 'Vue.js', category: 'frontend', x: 140, y: 260, color: '#4fc08d', icon: '🎋' },
                { id: 'express16', name: 'Express', category: 'backend', x: 340, y: 300, color: '#ffffff', icon: '🚂' },
                { id: 'docker17', name: 'Docker', category: 'devops', x: 640, y: 90, color: '#0db7ed', icon: '🐳' },
                { id: 'graphql17', name: 'GraphQL', category: 'backend', x: 390, y: 360, color: '#e10098', icon: '📊' },
                { id: 'k8s18', name: 'Kubernetes', category: 'devops', x: 680, y: 160, color: '#326ce5', icon: '⚙️' },
                { id: 'tensorflow18', name: 'TensorFlow', category: 'ai', x: 560, y: 340, color: '#ff6f00', icon: '🧠' },
                { id: 'svelte19', name: 'Svelte', category: 'frontend', x: 80, y: 140, color: '#ff3e00', icon: '🔥' },
                { id: 'deno19', name: 'Deno', category: 'backend', x: 280, y: 370, color: '#000000', icon: '🦕' },
                { id: 'nextjs20', name: 'Next.js', category: 'frontend', x: 150, y: 80, color: '#000000', icon: '▲' },
                { id: 'flutter20', name: 'Flutter', category: 'mobile', x: 750, y: 250, color: '#02569b', icon: '📱' }
            ],
            2021: [
                { id: 'react15', name: 'React', category: 'frontend', x: 80, y: 220, color: '#61dafb', icon: '⚛️' },
                { id: 'node15', name: 'Node.js', category: 'backend', x: 280, y: 210, color: '#68a063', icon: '🟢' },
                { id: 'mongo15', name: 'MongoDB', category: 'database', x: 480, y: 80, color: '#4db33d', icon: '🍃' },
                { id: 'vue16', name: 'Vue.js', category: 'frontend', x: 120, y: 280, color: '#4fc08d', icon: '🎋' },
                { id: 'express16', name: 'Express', category: 'backend', x: 320, y: 320, color: '#ffffff', icon: '🚂' },
                { id: 'docker17', name: 'Docker', category: 'devops', x: 620, y: 70, color: '#0db7ed', icon: '🐳' },
                { id: 'graphql17', name: 'GraphQL', category: 'backend', x: 370, y: 380, color: '#e10098', icon: '📊' },
                { id: 'k8s18', name: 'Kubernetes', category: 'devops', x: 660, y: 140, color: '#326ce5', icon: '⚙️' },
                { id: 'tensorflow18', name: 'TensorFlow', category: 'ai', x: 540, y: 360, color: '#ff6f00', icon: '🧠' },
                { id: 'svelte19', name: 'Svelte', category: 'frontend', x: 60, y: 160, color: '#ff3e00', icon: '🔥' },
                { id: 'deno19', name: 'Deno', category: 'backend', x: 260, y: 390, color: '#000000', icon: '🦕' },
                { id: 'nextjs20', name: 'Next.js', category: 'frontend', x: 130, y: 60, color: '#000000', icon: '▲' },
                { id: 'flutter20', name: 'Flutter', category: 'mobile', x: 730, y: 270, color: '#02569b', icon: '📱' },
                { id: 'vite21', name: 'Vite', category: 'frontend', x: 40, y: 100, color: '#646cff', icon: '⚡' },
                { id: 'remix21', name: 'Remix', category: 'frontend', x: 170, y: 120, color: '#000000', icon: '💿' }
            ],
            2022: [
                { id: 'react15', name: 'React', category: 'frontend', x: 60, y: 240, color: '#61dafb', icon: '⚛️' },
                { id: 'node15', name: 'Node.js', category: 'backend', x: 260, y: 220, color: '#68a063', icon: '🟢' },
                { id: 'mongo15', name: 'MongoDB', category: 'database', x: 460, y: 60, color: '#4db33d', icon: '🍃' },
                { id: 'vue16', name: 'Vue.js', category: 'frontend', x: 100, y: 300, color: '#4fc08d', icon: '🎋' },
                { id: 'express16', name: 'Express', category: 'backend', x: 300, y: 340, color: '#ffffff', icon: '🚂' },
                { id: 'docker17', name: 'Docker', category: 'devops', x: 600, y: 50, color: '#0db7ed', icon: '🐳' },
                { id: 'graphql17', name: 'GraphQL', category: 'backend', x: 350, y: 400, color: '#e10098', icon: '📊' },
                { id: 'k8s18', name: 'Kubernetes', category: 'devops', x: 640, y: 120, color: '#326ce5', icon: '⚙️' },
                { id: 'tensorflow18', name: 'TensorFlow', category: 'ai', x: 520, y: 380, color: '#ff6f00', icon: '🧠' },
                { id: 'svelte19', name: 'Svelte', category: 'frontend', x: 40, y: 180, color: '#ff3e00', icon: '🔥' },
                { id: 'deno19', name: 'Deno', category: 'backend', x: 240, y: 410, color: '#000000', icon: '🦕' },
                { id: 'nextjs20', name: 'Next.js', category: 'frontend', x: 110, y: 40, color: '#000000', icon: '▲' },
                { id: 'flutter20', name: 'Flutter', category: 'mobile', x: 710, y: 290, color: '#02569b', icon: '📱' },
                { id: 'vite21', name: 'Vite', category: 'frontend', x: 20, y: 120, color: '#646cff', icon: '⚡' },
                { id: 'remix21', name: 'Remix', category: 'frontend', x: 150, y: 100, color: '#000000', icon: '💿' },
                { id: 'solidjs22', name: 'SolidJS', category: 'frontend', x: 80, y: 80, color: '#2c4f7c', icon: '💎' },
                { id: 'tauri22', name: 'Tauri', category: 'desktop', x: 780, y: 180, color: '#ffc131', icon: '🦀' }
            ],
            2023: [
                { id: 'react15', name: 'React', category: 'frontend', x: 40, y: 260, color: '#61dafb', icon: '⚛️' },
                { id: 'node15', name: 'Node.js', category: 'backend', x: 240, y: 230, color: '#68a063', icon: '🟢' },
                { id: 'mongo15', name: 'MongoDB', category: 'database', x: 440, y: 40, color: '#4db33d', icon: '🍃' },
                { id: 'vue16', name: 'Vue.js', category: 'frontend', x: 80, y: 320, color: '#4fc08d', icon: '🎋' },
                { id: 'express16', name: 'Express', category: 'backend', x: 280, y: 360, color: '#ffffff', icon: '🚂' },
                { id: 'docker17', name: 'Docker', category: 'devops', x: 580, y: 30, color: '#0db7ed', icon: '🐳' },
                { id: 'graphql17', name: 'GraphQL', category: 'backend', x: 330, y: 420, color: '#e10098', icon: '📊' },
                { id: 'k8s18', name: 'Kubernetes', category: 'devops', x: 620, y: 100, color: '#326ce5', icon: '⚙️' },
                { id: 'tensorflow18', name: 'TensorFlow', category: 'ai', x: 500, y: 400, color: '#ff6f00', icon: '🧠' },
                { id: 'svelte19', name: 'Svelte', category: 'frontend', x: 20, y: 200, color: '#ff3e00', icon: '🔥' },
                { id: 'deno19', name: 'Deno', category: 'backend', x: 220, y: 430, color: '#000000', icon: '🦕' },
                { id: 'nextjs20', name: 'Next.js', category: 'frontend', x: 90, y: 20, color: '#000000', icon: '▲' },
                { id: 'flutter20', name: 'Flutter', category: 'mobile', x: 690, y: 310, color: '#02569b', icon: '📱' },
                { id: 'vite21', name: 'Vite', category: 'frontend', x: 10, y: 140, color: '#646cff', icon: '⚡' },
                { id: 'remix21', name: 'Remix', category: 'frontend', x: 130, y: 80, color: '#000000', icon: '💿' },
                { id: 'solidjs22', name: 'SolidJS', category: 'frontend', x: 60, y: 60, color: '#2c4f7c', icon: '💎' },
                { id: 'tauri22', name: 'Tauri', category: 'desktop', x: 760, y: 160, color: '#ffc131', icon: '🦀' },
                { id: 'astro23', name: 'Astro', category: 'frontend', x: 160, y: 30, color: '#ff5d01', icon: '🚀' },
                { id: 'chatgpt23', name: 'ChatGPT', category: 'ai', x: 600, y: 400, color: '#10a37f', icon: '🤖' }
            ],
            2024: [
                { id: 'react15', name: 'React', category: 'frontend', x: 30, y: 280, color: '#61dafb', icon: '⚛️' },
                { id: 'node15', name: 'Node.js', category: 'backend', x: 220, y: 240, color: '#68a063', icon: '🟢' },
                { id: 'mongo15', name: 'MongoDB', category: 'database', x: 420, y: 20, color: '#4db33d', icon: '🍃' },
                { id: 'vue16', name: 'Vue.js', category: 'frontend', x: 70, y: 340, color: '#4fc08d', icon: '🎋' },
                { id: 'express16', name: 'Express', category: 'backend', x: 260, y: 380, color: '#ffffff', icon: '🚂' },
                { id: 'docker17', name: 'Docker', category: 'devops', x: 560, y: 10, color: '#0db7ed', icon: '🐳' },
                { id: 'graphql17', name: 'GraphQL', category: 'backend', x: 310, y: 440, color: '#e10098', icon: '📊' },
                { id: 'k8s18', name: 'Kubernetes', category: 'devops', x: 600, y: 80, color: '#326ce5', icon: '⚙️' },
                { id: 'tensorflow18', name: 'TensorFlow', category: 'ai', x: 480, y: 420, color: '#ff6f00', icon: '🧠' },
                { id: 'svelte19', name: 'Svelte', category: 'frontend', x: 10, y: 220, color: '#ff3e00', icon: '🔥' },
                { id: 'deno19', name: 'Deno', category: 'backend', x: 200, y: 450, color: '#000000', icon: '🦕' },
                { id: 'nextjs20', name: 'Next.js', category: 'frontend', x: 80, y: 10, color: '#000000', icon: '▲' },
                { id: 'flutter20', name: 'Flutter', category: 'mobile', x: 670, y: 330, color: '#02569b', icon: '📱' },
                { id: 'vite21', name: 'Vite', category: 'frontend', x: 5, y: 160, color: '#646cff', icon: '⚡' },
                { id: 'remix21', name: 'Remix', category: 'frontend', x: 110, y: 60, color: '#000000', icon: '💿' },
                { id: 'solidjs22', name: 'SolidJS', category: 'frontend', x: 50, y: 40, color: '#2c4f7c', icon: '💎' },
                { id: 'tauri22', name: 'Tauri', category: 'desktop', x: 740, y: 140, color: '#ffc131', icon: '🦀' },
                { id: 'astro23', name: 'Astro', category: 'frontend', x: 140, y: 20, color: '#ff5d01', icon: '🚀' },
                { id: 'chatgpt23', name: 'ChatGPT', category: 'ai', x: 580, y: 420, color: '#10a37f', icon: '🤖' },
                { id: 'bun24', name: 'Bun', category: 'backend', x: 180, y: 400, color: '#f0db4f', icon: '🥟' },
                { id: 'claude24', name: 'Claude', category: 'ai', x: 650, y: 450, color: '#D97706', icon: '🎭' }
            ]
        };
        
        this.techConnections = {
            'react15': ['vue16', 'nextjs20', 'remix21'],
            'node15': ['express16', 'deno19', 'bun24'],
            'vue16': ['react15', 'svelte19'],
            'docker17': ['k8s18'],
            'tensorflow18': ['chatgpt23', 'claude24'],
            'svelte19': ['solidjs22'],
            'nextjs20': ['remix21', 'astro23'],
            'vite21': ['astro23']
        };
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupVisualization();
        this.updateTimeline(this.currentYear);
    }
    
    setupElements() {
        this.evolutionBtn = document.getElementById('animate-evolution');
        this.timelineSlider = document.getElementById('timeline-slider');
        this.timelineYear = document.getElementById('timeline-year');
        this.techDetails = document.getElementById('tech-details');
        this.svg = d3.select('#tech-tree');
        
        if (this.svg.node()) {
            const rect = this.svg.node().getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
        }
    }
    
    setupEventListeners() {
        if (this.evolutionBtn) {
            this.evolutionBtn.addEventListener('click', () => this.animateEvolution());
        }
        
        if (this.timelineSlider) {
            this.timelineSlider.addEventListener('input', (e) => {
                this.currentYear = parseInt(e.target.value);
                this.updateTimeline(this.currentYear);
            });
        }
        
        window.addEventListener('resize', () => this.handleResize());
    }
    
    setupVisualization() {
        if (!this.svg.node()) return;
        
        this.svg.selectAll('*').remove();
        
        // Create groups for different elements
        this.linksGroup = this.svg.append('g').attr('class', 'links');
        this.nodesGroup = this.svg.append('g').attr('class', 'nodes');
        this.evolutionGroup = this.svg.append('g').attr('class', 'evolution-paths');
        
        this.drawTechTree();
    }
    
    handleResize() {
        if (!this.svg.node()) return;
        
        const rect = this.svg.node().getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        
        this.setupVisualization();
    }
    
    updateTimeline(year) {
        this.currentYear = year;
        if (this.timelineYear) {
            this.timelineYear.textContent = year;
        }
        this.drawTechTree();
    }
    
    drawTechTree() {
        if (!this.svg.node()) return;
        
        const currentData = this.techData[this.currentYear] || [];
        
        // Clear previous elements
        this.linksGroup.selectAll('*').remove();
        this.nodesGroup.selectAll('*').remove();
        
        // Draw connections first (so they appear behind nodes)
        this.drawConnections(currentData);
        
        // Draw nodes
        this.drawNodes(currentData);
    }
    
    drawConnections(data) {
        const connections = [];
        
        data.forEach(node => {
            const relatedIds = this.techConnections[node.id] || [];
            relatedIds.forEach(targetId => {
                const target = data.find(n => n.id === targetId);
                if (target) {
                    connections.push({
                        source: node,
                        target: target,
                        id: `${node.id}-${targetId}`
                    });
                }
            });
        });
        
        const links = this.linksGroup
            .selectAll('.tech-link')
            .data(connections)
            .enter()
            .append('line')
            .attr('class', 'tech-link')
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
            .attr('stroke', '#4a5568')
            .attr('stroke-width', 2)
            .attr('stroke-opacity', 0.6)
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .attr('stroke-width', 4)
                    .attr('stroke-opacity', 1)
                    .style('filter', 'drop-shadow(0 0 8px currentColor)');
            })
            .on('mouseout', function(event, d) {
                d3.select(this)
                    .attr('stroke-width', 2)
                    .attr('stroke-opacity', 0.6)
                    .style('filter', 'drop-shadow(0 0 3px currentColor)');
            });
    }
    
    drawNodes(data) {
        const nodeGroups = this.nodesGroup
            .selectAll('.tech-node')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'tech-node')
            .attr('transform', d => `translate(${d.x}, ${d.y})`)
            .style('cursor', 'pointer')
            .on('click', (event, d) => this.selectNode(d))
            .on('mouseover', function(event, d) {
                d3.select(this).select('circle')
                    .transition()
                    .duration(200)
                    .attr('r', 12)
                    .style('filter', 'drop-shadow(0 0 15px currentColor)');
            })
            .on('mouseout', function(event, d) {
                if (!d3.select(this).classed('selected')) {
                    d3.select(this).select('circle')
                        .transition()
                        .duration(200)
                        .attr('r', 8)
                        .style('filter', 'drop-shadow(0 0 5px currentColor)');
                }
            });
        
        // Add circles
        nodeGroups
            .append('circle')
            .attr('r', 8)
            .attr('fill', d => d.color)
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 2)
            .style('filter', 'drop-shadow(0 0 5px currentColor)');
        
        // Add icons
        nodeGroups
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('font-size', '12px')
            .text(d => d.icon);
        
        // Add labels
        nodeGroups
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('y', 20)
            .attr('font-size', '10px')
            .attr('fill', '#ffffff')
            .attr('font-weight', '600')
            .text(d => d.name);
        
        // Animate nodes entrance
        nodeGroups
            .style('opacity', 0)
            .style('transform', d => `translate(${d.x}, ${d.y}) scale(0)`)
            .transition()
            .duration(500)
            .delay((d, i) => i * 50)
            .style('opacity', 1)
            .style('transform', d => `translate(${d.x}, ${d.y}) scale(1)`);
    }
    
    selectNode(nodeData) {
        // Remove previous selection
        this.nodesGroup.selectAll('.tech-node').classed('selected', false);
        
        // Add selection to current node
        const selectedNode = this.nodesGroup
            .selectAll('.tech-node')
            .filter(d => d.id === nodeData.id)
            .classed('selected', true);
        
        selectedNode.select('circle')
            .attr('stroke-width', 3)
            .style('animation', 'selectedPulse 2s ease-in-out infinite');
        
        this.selectedNode = nodeData;
        this.displayTechDetails(nodeData);
        this.highlightConnections(nodeData);
    }
    
    displayTechDetails(nodeData) {
        if (!this.techDetails) return;
        
        const techInfo = this.getTechInfo(nodeData);
        
        this.techDetails.innerHTML = `
            <h3>
                <span class="tech-icon" style="background: ${nodeData.color}20; color: ${nodeData.color};">
                    ${nodeData.icon}
                </span>
                ${nodeData.name}
            </h3>
            <p>${techInfo.description}</p>
            
            <div class="tech-stats">
                <div class="stat-item">
                    <div class="stat-label">カテゴリ</div>
                    <div class="stat-value">${techInfo.category}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">初登場年</div>
                    <div class="stat-value">${techInfo.firstYear}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">関連技術数</div>
                    <div class="stat-value">${techInfo.connections}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">人気度</div>
                    <div class="stat-value">${techInfo.popularity}</div>
                </div>
            </div>
            
            <div class="tech-timeline">
                <h4>技術の進化</h4>
                ${techInfo.timeline.map(item => `
                    <div class="timeline-item">
                        <div class="timeline-year">${item.year}</div>
                        <div class="timeline-event">${item.event}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="tech-connections">
                <h4>関連技術</h4>
                ${techInfo.relatedTechs.map(tech => `
                    <div class="connection-item" onclick="window.techDNA.selectTechByName('${tech.name}')">
                        <div class="connection-icon" style="background: ${tech.color};">
                            ${tech.icon}
                        </div>
                        <span>${tech.name}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    getTechInfo(nodeData) {
        const techInfoDatabase = {
            'react15': {
                description: 'Facebookが開発したコンポーネントベースのJavaScriptライブラリ。仮想DOMとJSXによる宣言的なUI構築を特徴とする。',
                category: 'フロントエンド',
                firstYear: '2013',
                connections: 15,
                popularity: '★★★★★',
                timeline: [
                    { year: '2013', event: 'Facebook内部で開発開始' },
                    { year: '2015', event: 'React Nativeリリース' },
                    { year: '2016', event: 'ライセンス問題で議論' },
                    { year: '2017', event: 'MIT ライセンスに変更' },
                    { year: '2019', event: 'React Hooksの導入' }
                ],
                relatedTechs: [
                    { name: 'Next.js', color: '#000000', icon: '▲' },
                    { name: 'Vue.js', color: '#4fc08d', icon: '🎋' },
                    { name: 'Remix', color: '#000000', icon: '💿' }
                ]
            },
            'vue16': {
                description: 'プログレッシブフレームワークとして設計された直感的なJavaScriptフレームワーク。学習コストの低さと柔軟性が特徴。',
                category: 'フロントエンド',
                firstYear: '2014',
                connections: 8,
                popularity: '★★★★☆',
                timeline: [
                    { year: '2014', event: '個人プロジェクトとして開始' },
                    { year: '2016', event: 'Vue 2.0 リリース' },
                    { year: '2018', event: 'Vue CLI 3.0 リリース' },
                    { year: '2020', event: 'Vue 3.0 Composition API' },
                    { year: '2022', event: 'Viteとの統合強化' }
                ],
                relatedTechs: [
                    { name: 'React', color: '#61dafb', icon: '⚛️' },
                    { name: 'Svelte', color: '#ff3e00', icon: '🔥' },
                    { name: 'Vite', color: '#646cff', icon: '⚡' }
                ]
            },
            'node15': {
                description: 'V8エンジンをベースとしたサーバーサイドJavaScript実行環境。非同期I/Oとイベント駆動アーキテクチャが特徴。',
                category: 'バックエンド',
                firstYear: '2009',
                connections: 12,
                popularity: '★★★★★',
                timeline: [
                    { year: '2009', event: 'Ryan Dahlにより開発開始' },
                    { year: '2015', event: 'io.jsとの統合' },
                    { year: '2018', event: 'LTS版のサポート拡充' },
                    { year: '2020', event: 'ES modules サポート' },
                    { year: '2023', event: 'Node.js 20 LTS リリース' }
                ],
                relatedTechs: [
                    { name: 'Express', color: '#ffffff', icon: '🚂' },
                    { name: 'Deno', color: '#000000', icon: '🦕' },
                    { name: 'Bun', color: '#f0db4f', icon: '🥟' }
                ]
            }
        };
        
        return techInfoDatabase[nodeData.id] || {
            description: `${nodeData.name}に関する技術情報`,
            category: nodeData.category,
            firstYear: '不明',
            connections: 0,
            popularity: '★★★☆☆',
            timeline: [{ year: '現在', event: '継続的な開発' }],
            relatedTechs: []
        };
    }
    
    highlightConnections(nodeData) {
        // Reset all connections
        this.linksGroup.selectAll('.tech-link')
            .attr('stroke', '#4a5568')
            .attr('stroke-width', 2)
            .attr('stroke-opacity', 0.6)
            .classed('animated', false);
        
        // Highlight connections for selected node
        const relatedIds = this.techConnections[nodeData.id] || [];
        relatedIds.forEach(targetId => {
            this.linksGroup.selectAll('.tech-link')
                .filter(function() {
                    const classes = d3.select(this).attr('class');
                    return classes && (classes.includes(nodeData.id) && classes.includes(targetId));
                })
                .attr('stroke', nodeData.color)
                .attr('stroke-width', 4)
                .attr('stroke-opacity', 1)
                .classed('animated', true);
        });
    }
    
    animateEvolution() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.evolutionBtn.classList.add('animating');
        this.evolutionBtn.textContent = '🧬 進化中...';
        
        const years = Object.keys(this.techData).sort();
        let currentIndex = 0;
        
        const animateStep = () => {
            if (currentIndex >= years.length) {
                this.isAnimating = false;
                this.evolutionBtn.classList.remove('animating');
                this.evolutionBtn.textContent = '🧬 進化を再生';
                return;
            }
            
            const year = years[currentIndex];
            this.currentYear = parseInt(year);
            
            if (this.timelineSlider) {
                this.timelineSlider.value = this.currentYear;
            }
            if (this.timelineYear) {
                this.timelineYear.textContent = this.currentYear;
            }
            
            this.drawTechTree();
            this.drawEvolutionPath(currentIndex);
            
            currentIndex++;
            setTimeout(animateStep, 1500);
        };
        
        animateStep();
    }
    
    drawEvolutionPath(stepIndex) {
        // Create animated path showing technology evolution
        if (stepIndex === 0) {
            this.evolutionGroup.selectAll('*').remove();
            return;
        }
        
        const pathData = `M 100,250 Q 200,100 400,150 T 700,200`;
        
        const path = this.evolutionGroup
            .append('path')
            .attr('d', pathData)
            .attr('class', 'evolution-path')
            .attr('fill', 'none')
            .attr('stroke', '#fbbf24')
            .attr('stroke-width', 4)
            .attr('stroke-dasharray', '10,5')
            .style('filter', 'drop-shadow(0 0 10px #fbbf24)')
            .style('opacity', 0);
        
        path
            .transition()
            .duration(800)
            .style('opacity', 1)
            .transition()
            .delay(400)
            .duration(800)
            .style('opacity', 0)
            .remove();
    }
    
    selectTechByName(techName) {
        const currentData = this.techData[this.currentYear] || [];
        const tech = currentData.find(t => t.name === techName);
        if (tech) {
            this.selectNode(tech);
        }
    }
}

// Initialize Tech DNA Storytelling when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.techDNA = new TechDNAStorytelling();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechDNAStorytelling;
}