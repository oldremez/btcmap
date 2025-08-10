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

        // Create force simulation
        this.simulation = d3.forceSimulation(this.nodes)
            .force('link', d3.forceLink(this.links).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(d => d.size + 5));

        // Create links
        const link = this.mainGroup.append('g')
            .selectAll('line')
            .data(this.links)
            .enter().append('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', d => Math.sqrt(d.value) * 2);

        // Create nodes
        const node = this.mainGroup.append('g')
            .selectAll('g')
            .data(this.nodes)
            .enter().append('g')
            .call(d3.drag()
                .on('start', this.dragstarted.bind(this))
                .on('drag', this.dragged.bind(this))
                .on('end', this.dragended.bind(this)));

        // Add circles to nodes
        node.append('circle')
            .attr('r', d => d.size)
            .attr('fill', d => color(d.group))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2);

        // Add labels to nodes
        node.append('text')
            .text(d => d.name)
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr('font-size', '12px')
            .attr('fill', '#333')
            .attr('font-weight', 'bold');

        // Update positions on simulation tick
        this.simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('transform', d => `translate(${d.x},${d.y})`);
        });
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
