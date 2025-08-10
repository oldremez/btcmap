// Graph visualization using D3.js
class GraphVisualization {
    constructor() {
        this.width = document.getElementById('graph').clientWidth;
        this.height = 600;
        this.nodes = [];
        this.links = [];
        this.simulation = null;
        this.svg = null;
        this.init();
    }

    init() {
        // Clear existing content
        d3.select('#graph').selectAll('*').remove();

        // Create SVG container
        this.svg = d3.select('#graph')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        // Create main group for zooming
        this.mainGroup = this.svg.append('g');

        // Add zoom behavior to the main group
        const zoom = d3.zoom()
            .on('zoom', (event) => {
                this.mainGroup.attr('transform', event.transform);
            });

        this.svg.call(zoom);

        // Initialize with a simple graph
        this.generateSampleGraph();
        this.render();
    }

    generateSampleGraph() {
        const graphData = GraphData.getSampleGraph();
        this.nodes = graphData.nodes;
        this.links = graphData.links;
    }

    generateRandomGraph() {
        const graphData = GraphData.generateRandomGraph();
        this.nodes = graphData.nodes;
        this.links = graphData.links;
        this.render();
    }

    render() {
        // Clear existing elements from the main group
        this.mainGroup.selectAll('*').remove();

        // Color scale for groups
        const color = d3.scaleOrdinal(d3.schemeCategory10);

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
            .force('collision', d3.forceCollide().radius(d => d.size + 8))
            .force('x', d3.forceX(this.width / 2).strength(0.1))
            .force('y', d3.forceY(this.height / 2).strength(0.1));

        // Create links
        const link = this.mainGroup.append('g')
            .selectAll('line')
            .data(this.links)
            .enter().append('line')
            .attr('stroke', d => {
                // Different colors for different connection types
                switch(d.type) {
                    case 'central': return '#ff6b35';      // Orange for central connections
                    case 'bridge': return '#4ecdc4';       // Teal for bridge connections
                    case 'ecosystem': return '#45b7d1';    // Blue for ecosystem connections
                    case 'cross-chain': return '#96ceb4';  // Green for cross-chain
                    case 'defi': return '#feca57';         // Yellow for DeFi
                    case 'weighted': return '#ff9ff3';     // Pink for weighted connections
                    case 'dashed': return '#54a0ff';       // Blue for dashed connections
                    default: return '#999';
                }
            })
            .attr('stroke-opacity', 0.8)
            .attr('stroke-width', d => Math.sqrt(d.value) * 2)
            .attr('stroke-dasharray', d => d.type === 'dashed' ? '5,5' : 'none');

        // Add tooltips to links
        link.append('title')
            .text(d => `Connection: ${d.source.name || d.source} → ${d.target.name || d.target}\nType: ${d.type}\nValue: ${d.value}`);

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
            .text(d => {
                // Handle different text types: null (no text), string (static text), or function (custom text)
                if (d.text === null || d.text === undefined) {
                    return ''; // No text
                } else if (typeof d.text === 'string') {
                    return d.text; // Static text
                } else if (typeof d.text === 'function') {
                    return d.text(d); // Custom function
                } else {
                    return ''; // Fallback to no text
                }
            });

        // Create nodes
        const node = this.mainGroup.append('g')
            .selectAll('g')
            .data(this.nodes)
            .enter().append('g');

        // Add circles to nodes
        node.append('circle')
            .attr('r', d => d.size)
            .attr('fill', d => {
                // Different colors for different node types
                switch(d.type) {
                    case 'central': return '#ff6b35';      // Orange for central Bitcoin nodes
                    case 'bridge': return '#4ecdc4';       // Teal for bridge protocols
                    case 'wrapped': return '#45b7d1';      // Blue for wrapped tokens
                    case 'special': return '#feca57';      // Yellow for special nodes
                    default: return color(d.group);
                }
            })
            .attr('stroke', '#fff')
            .attr('stroke-width', 2);

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
            .text(d => `${d.name}\nType: ${d.type}\nGroup: ${d.group}`);

        // Update positions on simulation tick
        this.simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            // Update link label positions (center of each link)
            linkLabels
                .attr('x', d => (d.source.x + d.target.x) / 2)
                .attr('y', d => (d.source.y + d.target.y) / 2);

            node
                .attr('transform', d => `translate(${d.x},${d.y})`);
        });
    }



    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    clearGraph() {
        const graphData = GraphData.getEmptyGraph();
        this.nodes = graphData.nodes;
        this.links = graphData.links;
        this.render();
    }
}

// Initialize the graph when the page loads
let graph;

document.addEventListener('DOMContentLoaded', () => {
    graph = new GraphVisualization();
});

// Global functions for buttons
function generateRandomGraph() {
    if (graph) {
        graph.generateRandomGraph();
    }
}

function clearGraph() {
    if (graph) {
        graph.clearGraph();
    }
}
