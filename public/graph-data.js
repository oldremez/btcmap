// Graph data definitions
class GraphData {
    static getSampleGraph() {
        return {
            nodes: [
                { id: 0, name: "Node A", group: 1, size: 20 },
                { id: 1, name: "Node B", group: 1, size: 15 },
                { id: 2, name: "Node C", group: 2, size: 25 },
                { id: 3, name: "Node D", group: 2, size: 18 },
                { id: 4, name: "Node E", group: 3, size: 22 },
                { id: 5, name: "Node F", group: 3, size: 16 },
                { id: 6, name: "Node G", group: 1, size: 19 },
                { id: 7, name: "Node H", group: 2, size: 21 }
            ],
            links: [
                { source: 0, target: 1, value: 1 },
                { source: 0, target: 2, value: 2 },
                { source: 1, target: 3, value: 1 },
                { source: 2, target: 4, value: 3 },
                { source: 3, target: 5, value: 2 },
                { source: 4, target: 6, value: 1 },
                { source: 5, target: 7, value: 2 },
                { source: 6, target: 0, value: 1 },
                { source: 7, target: 1, value: 1 }
            ]
        };
    }

    static generateRandomGraph() {
        const numNodes = Math.floor(Math.random() * 15) + 8;
        const numLinks = Math.floor(numNodes * 1.5);

        // Generate random nodes
        const nodes = Array.from({ length: numNodes }, (_, i) => ({
            id: i,
            name: `Node ${String.fromCharCode(65 + i)}`,
            group: Math.floor(Math.random() * 4) + 1,
            size: Math.floor(Math.random() * 20) + 10
        }));

        // Generate random links
        const links = [];
        for (let i = 0; i < numLinks; i++) {
            const source = Math.floor(Math.random() * numNodes);
            let target = Math.floor(Math.random() * numNodes);
            while (target === source) {
                target = Math.floor(Math.random() * numNodes);
            }
            links.push({
                source: source,
                target: target,
                value: Math.floor(Math.random() * 3) + 1
            });
        }

        return { nodes, links };
    }

    static getEmptyGraph() {
        return {
            nodes: [],
            links: []
        };
    }
}
