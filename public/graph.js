// Graph visualization using D3.js

// Utility function to query link labels from backend
async function getLinkLabel(source, target) {
    try {
        const response = await fetch('/api/link-label', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source,
                target
            })
        });
        
        const data = await response.json();
        if (data.success) {
            return data.label;
        }
        return null;
    } catch (error) {
        console.error('Error fetching link label:', error);
        return null;
    }
}

// Node description popup functionality
class NodePopup {
    constructor() {
        this.popup = document.getElementById('nodePopup');
        this.overlay = document.getElementById('popupOverlay');
        this.title = document.getElementById('popupTitle');
        this.content = document.getElementById('popupContent');
        this.closeBtn = document.getElementById('popupClose');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close popup when close button is clicked
        this.closeBtn.addEventListener('click', () => this.hide());
        
        // Close popup when overlay is clicked
        this.overlay.addEventListener('click', () => this.hide());
        
        // Close popup when Escape key is pressed
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hide();
        });
    }

    async show(nodeId, nodeName) {
        try {
            // Try to load the description HTML file
            const response = await fetch(`/descriptions/${nodeId}.html`);
            
            if (response.ok) {
                const htmlContent = await response.text();
                this.title.textContent = nodeName;
                this.content.innerHTML = htmlContent;
                this.showPopup();
            } else {
                // If description file doesn't exist, don't show popup
                console.log(`No description available for node: ${nodeId}`);
                return false;
            }
        } catch (error) {
            console.error('Error loading node description:', error);
            return false;
        }
        return true;
    }

    showPopup() {
        this.overlay.classList.add('active');
        this.popup.classList.add('active');
    }

    hide() {
        this.overlay.classList.remove('active');
        this.popup.classList.remove('active');
        this.content.innerHTML = '';
    }
}

class GraphVisualization {
    constructor() {
        this.width = document.getElementById('graph').clientWidth;
        this.height = 600;
        this.nodes = [];
        this.links = [];
        this.simulation = null;
        this.svg = null;
        this.devMode = window.DEV_MODE === 'true'; // Enable dev mode only if environment variable is set
        this.nodePositions = {}; // Store loaded node positions
        this.nodePopup = new NodePopup(); // Initialize node popup
        this.init();
    }

    async init() {
        // Clear existing content
        d3.select('#graph').selectAll('*').remove();

        // Create SVG container
        this.svg = d3.select('#graph')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        // Add arrow markers for directional links
        this.addArrowMarkers();

        // Create main group for zooming
        this.mainGroup = this.svg.append('g');

        // Add zoom behavior to the main group
        const zoom = d3.zoom()
            .on('zoom', (event) => {
                this.mainGroup.attr('transform', event.transform);
            });

        this.svg.call(zoom);

        // Add dev mode controls if enabled
        if (this.devMode) {
            this.addDevControls();
        }

        // Load node positions first, then initialize graph
        await this.loadNodePositions();
        this.generateSampleGraph();
        this.render();
    }

    addDevControls() {
        // Create a control panel above the graph
        const controls = d3.select('#graph')
            .insert('div', 'svg')
            .attr('class', 'dev-controls')
            .style('position', 'absolute')
            .style('top', '10px')
            .style('left', '10px')
            .style('z-index', '1000')
            .style('background', 'rgba(255, 255, 255, 0.9)')
            .style('padding', '10px')
            .style('border-radius', '5px')
            .style('border', '1px solid #ccc')
            .style('font-family', 'Arial, sans-serif')
            .style('font-size', '12px');

        // Add dev mode indicator
        controls.append('div')
            .style('font-weight', 'bold')
            .style('color', '#4ecdc4')
            .style('margin-bottom', '5px')
            .text('DEV MODE');

        // Add export button
        controls.append('button')
            .text('Export Node Positions')
            .style('background', '#4ecdc4')
            .style('color', 'white')
            .style('border', 'none')
            .style('padding', '5px 10px')
            .style('border-radius', '3px')
            .style('cursor', 'pointer')
            .style('margin-right', '5px')
            .on('click', () => this.exportNodePositions());

        // Add reload positions button
        controls.append('button')
            .text('Reload Positions')
            .style('background', '#9b59b6')
            .style('color', 'white')
            .style('border', 'none')
            .style('padding', '5px 10px')
            .style('border-radius', '3px')
            .style('cursor', 'pointer')
            .style('margin-right', '5px')
            .on('click', async () => {
                await this.loadNodePositions();
                this.applyNodePositions();
                this.render();
            });

        // Add toggle button
        controls.append('button')
            .text('Toggle Dev Mode')
            .style('background', '#f49c13')
            .style('color', 'white')
            .style('border', 'none')
            .style('padding', '5px 10px')
            .style('border-radius', '3px')
            .style('cursor', 'pointer')
            .on('click', () => this.toggleDevMode());
    }

    addArrowMarkers() {
        // Define arrow markers for directional links
        const defs = this.svg.append('defs');
        
        // Single arrow marker for all links
        defs.append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 10)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .append('path')
            .attr('d', 'M0,-3L10,0L0,3')
            .attr('fill', '#999')
            .attr('stroke-opacity', 0.8);
    }

    exportNodePositions() {
        const positions = {};
        this.nodes.forEach(node => {
            positions[node.id] = {
                x: Math.round(node.x || node.fx || 0),
                y: Math.round(node.y || node.fy || 0)
            };
        });

        const dataStr = JSON.stringify(positions, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'node-positions.json';
        link.click();
        
        console.log('Node positions exported:', positions);
    }

    async loadNodePositions() {
        try {
            const response = await fetch('/node-positions.json');
            if (response.ok) {
                this.nodePositions = await response.json();
                console.log('Node positions loaded:', this.nodePositions);
                return true;
            } else {
                console.warn('Could not load node-positions.json, using default positions');
                return false;
            }
        } catch (error) {
            console.warn('Error loading node positions:', error);
            return false;
        }
    }

    applyNodePositions() {
        this.nodes.forEach(node => {
            if (this.nodePositions[node.id]) {
                const pos = this.nodePositions[node.id];
                node.x = pos.x;
                node.y = pos.y;
                node.fx = pos.x; // Fix position for dev mode
                node.fy = pos.y;
            } else {
                // Set default positions if none loaded - use a grid-like pattern
                const index = this.nodes.indexOf(node);
                const cols = Math.ceil(Math.sqrt(this.nodes.length));
                const row = Math.floor(index / cols);
                const col = index % cols;
                
                node.x = (col + 1) * (this.width / (cols + 1));
                node.y = (row + 1) * (this.height / (cols + 1));
                
                console.warn(`No position found for node ${node.id}, using default position: (${node.x}, ${node.y})`);
            }
        });
    }

    toggleDevMode() {
        this.devMode = !this.devMode;
        if (this.devMode) {
            // Re-enable dragging
            this.enableDragging();
            d3.select('.dev-controls').style('display', 'block');
        } else {
            // Disable dragging
            this.disableDragging();
            d3.select('.dev-controls').style('display', 'none');
        }
    }

    enableDragging() {
        if (this.nodeGroups) {
            this.nodeGroups.call(d3.drag()
                .on('start', this.dragstarted.bind(this))
                .on('drag', this.dragged.bind(this))
                .on('end', this.dragended.bind(this)));
        }
    }

    disableDragging() {
        if (this.nodeGroups) {
            this.nodeGroups.on('.drag', null);
        }
    }

    dragstarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        // Keep the fixed position for dev mode
        if (this.devMode) {
            d.fx = d.x;
            d.fy = d.y;
        } else {
            d.fx = null;
            d.fy = null;
        }
    }

    generateSampleGraph() {
        const graphData = GraphData.getSampleGraph();
        this.nodes = graphData.nodes;
        this.links = graphData.links;
        this.frames = graphData.frames;
        
        // Apply loaded node positions
        this.applyNodePositions();
    }

    render() {
        // Clear existing elements from the main group
        this.mainGroup.selectAll('*').remove();

        // Create frames first (so they appear behind nodes)
        if (this.frames && this.frames.length > 0) {
            this.frames.forEach(frame => {
                // Find the nodes that belong to this frame
                const frameNodes = this.nodes.filter(node => frame.nodes.includes(node.id));
                
                if (frameNodes.length > 0) {
                    // Calculate frame bounds
                    const xCoords = frameNodes.map(n => n.x || 0);
                    const yCoords = frameNodes.map(n => n.y || 0);
                    
                    const minX = Math.min(...xCoords) - frame.padding;
                    const maxX = Math.max(...xCoords) + frame.padding;
                    const minY = Math.min(...yCoords) - frame.padding;
                    const maxY = Math.max(...yCoords) + frame.padding;
                    
                    const width = maxX - minX;
                    const height = maxY - minY;
                    
                    // Create frame rectangle
                    const frameGroup = this.mainGroup.append('g')
                        .attr('class', 'frame')
                        .attr('data-frame-id', frame.id);
                    
                    // Add rounded rectangle
                    frameGroup.append('rect')
                        .attr('x', minX)
                        .attr('y', minY)
                        .attr('width', width)
                        .attr('height', height)
                        .attr('rx', 15) // Rounded corners
                        .attr('ry', 15)
                        .attr('fill', 'none')
                        .attr('stroke', frame.color)
                        .attr('stroke-width', frame.strokeWidth)
                        .attr('stroke-dasharray', '5,5')
                        .attr('opacity', 0.6);
                    
                    // Add frame label
                    frameGroup.append('text')
                        .attr('x', minX + 10)
                        .attr('y', minY - 5)
                        .attr('font-size', '12px')
                        .attr('font-weight', 'bold')
                        .attr('fill', frame.color)
                        .attr('background-color', 'white')
                        .text(frame.label);
                }
            });
        }

        // Set initial positions for nodes that have coordinates
        this.nodes.forEach(node => {
            if (node.x !== undefined && node.y !== undefined) {
                node.fx = node.x;
                node.fy = node.y;
            }
        });

        // Create force simulation
        this.simulation = d3.forceSimulation(this.nodes)
            .force('link', d3.forceLink(this.links).id(d => d.id).distance(80))
            .force('charge', d3.forceManyBody().strength(-200))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(d => this.getNodeSize(d) + 8))
            .force('x', d3.forceX(this.width / 2).strength(0.1))
            .force('y', d3.forceY(this.height / 2).strength(0.1));

        // Create links
        const link = this.mainGroup.append('g')
            .selectAll('line')
            .data(this.links)
            .enter().append('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.8)
            .attr('stroke-width', d => {
                // Make links slightly thicker to accommodate arrows
                return 2.5;
            })
            .attr('marker-end', 'url(#arrowhead)');

        // Add tooltips to links
        link.append('title')
            .text(d => `Connection: ${d.source.name || d.source} → ${d.target.name || d.target}`);

        // Create link labels
        const linkLabels = this.mainGroup.append('g')
            .selectAll('text')
            .data(this.links)
            .enter().append('text')
            .attr('class', 'link-label')
            .attr('text-anchor', 'middle')
            .attr('font-size', '9px')
            .attr('fill', '#666')
            .attr('pointer-events', 'none')
            .text('Loading...'); // Initial text while async functions load

        // Process link text asynchronously
        this.links.forEach(async (link, index) => {
            if (link.text === true) {
                try {
                    const result = await getLinkLabel(link.source, link.target);
                    if (result && typeof result === 'string') {
                        // Update the specific label with the result
                        linkLabels.filter((d, i) => i === index)
                            .text(result);
                    }
                } catch (error) {
                    console.error('Error processing link text:', error);
                    linkLabels.filter((d, i) => i === index)
                        .text('Error');
                }
            } else if (typeof link.text === 'string') {
                // Update static text immediately
                linkLabels.filter((d, i) => i === index)
                    .text(link.text);
            } else {
                // No text
                linkLabels.filter((d, i) => i === index)
                    .text('');
            }
        });

        // Create nodes
        this.nodeGroups = this.mainGroup.append('g')
            .selectAll('g')
            .data(this.nodes)
            .enter().append('g')
            .attr('class', 'node-group')
            .on('click', (event, d) => {
                // Handle node click to show description
                this.nodePopup.show(d.id, d.name);
            });

        // Enable dragging in dev mode
        if (this.devMode) {
            this.nodeGroups.call(d3.drag()
                .on('start', this.dragstarted.bind(this))
                .on('drag', this.dragged.bind(this))
                .on('end', this.dragended.bind(this)));
        }

        const node = this.nodeGroups;

        // Add circles to nodes
        node.append('circle')
            .attr('r', d => this.getNodeSize(d))
            .attr('fill', d => {
                // Different colors for different node types
                switch(d.type) {
                    case 'issuer': return '#ff6b35';
                    case 'token': return '#45b7d1';
                    case 'protocol': return '#9b59b6'; // Purple for protocol nodes
                    default: return '#999';
                }
            })
            .attr('stroke', d => {
                // Different stroke styles for different node types
                switch(d.type) {
                    case 'protocol': return '#6c5ce7'; // Darker purple stroke for protocol nodes
                    default: return '#fff';
                }
            })
            .attr('stroke-width', d => {
                // Different stroke widths for different node types
                switch(d.type) {
                    case 'protocol': return 3; // Thicker stroke for protocol nodes
                    default: return 2;
                }
            });

        // Add additional visual elements for protocol nodes
        node.filter(d => d.type === 'protocol')
            .append('circle')
            .attr('r', d => this.getNodeSize(d) + 4)
            .attr('fill', 'none')
            .attr('stroke', '#a29bfe')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '3,3')
            .attr('opacity', 0.6);

        // Add labels to nodes
        node.append('text')
            .text(d => d.name)
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr('font-size', '10px')
            .attr('fill', '#333')
            .attr('font-weight', 'bold');

        // Add tooltips
        node.append('title')
            .text(d => `${d.name}\nType: ${d.type}`);

        // Update positions on simulation tick
        this.simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => {
                    const arrowEnd = this.calculateArrowEndPosition(d.source, d.target);
                    return arrowEnd.x;
                })
                .attr('y2', d => {
                    const arrowEnd = this.calculateArrowEndPosition(d.source, d.target);
                    return arrowEnd.y;
                });

            // Update link label positions (center of each link)
            linkLabels
                .attr('x', d => {
                    const arrowEnd = this.calculateArrowEndPosition(d.source, d.target);
                    return (d.source.x + arrowEnd.x) / 2;
                })
                .attr('y', d => {
                    const arrowEnd = this.calculateArrowEndPosition(d.source, d.target);
                    return (d.source.y + arrowEnd.y) / 2;
                });

            this.nodeGroups
                .attr('transform', d => `translate(${d.x},${d.y})`);

            // Update frame positions
            if (this.frames && this.frames.length > 0) {
                this.frames.forEach(frame => {
                    const frameNodes = this.nodes.filter(node => frame.nodes.includes(node.id));
                    
                    if (frameNodes.length > 0) {
                        const xCoords = frameNodes.map(n => n.x || 0);
                        const yCoords = frameNodes.map(n => n.y || 0);
                        
                        const minX = Math.min(...xCoords) - frame.padding;
                        const maxX = Math.max(...xCoords) + frame.padding;
                        const minY = Math.min(...yCoords) - frame.padding;
                        const maxY = Math.max(...yCoords) + frame.padding;
                        
                        const width = maxX - minX;
                        const height = maxY - minY;
                        
                        // Update frame rectangle
                        this.mainGroup.select(`[data-frame-id="${frame.id}"] rect`)
                            .attr('x', minX)
                            .attr('y', minY)
                            .attr('width', width)
                            .attr('height', height);
                        
                        // Update frame label
                        this.mainGroup.select(`[data-frame-id="${frame.id}"] text`)
                            .attr('x', minX + 10)
                            .attr('y', minY - 5);
                    }
                });
            }
        });
    }

    getNodeSize(node) {
        // Provide default sizes based on node types to maintain visual consistency
        switch(node.type) {
            case 'issuer': return 25;
            case 'token': return 22;
            case 'protocol': return 28; // Larger size for protocol nodes to make them stand out
            default: return 20;
        }
    }

    calculateArrowEndPosition(source, target) {
        // Calculate the position where the arrow should end (before the target node's border)
        const targetSize = this.getNodeSize(target);
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            // Calculate the point just before the node's border
            // Add a small offset to ensure the arrow doesn't overlap with the node
            const ratio = (distance - targetSize + 3) / distance;
            return {
                x: source.x + dx * ratio,
                y: source.y + dy * ratio
            };
        }
        return { x: target.x, y: target.y };
    }
}

// Initialize the graph when the page loads
let graph;

document.addEventListener('DOMContentLoaded', async () => {
    graph = new GraphVisualization();
    // Note: init() is called automatically in constructor, but it's async
});
