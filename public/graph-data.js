// Bitcoin Liquidity Map - Graph data definitions
// Link text property can be:
// - null/undefined: No text displayed
// - string: Static text displayed
// - function: Custom function that returns text (receives link object as parameter)
// - async function: Async function that can query external data (blockchain, APIs, etc.)

// Utility function to query link labels from backend
async function getLinkLabel(linkType, source, target, linkData = {}) {
    try {
        const response = await fetch('/api/link-label', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                linkType,
                source,
                target,
                linkData
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

class GraphData {
    static getSampleGraph() {
        return {
            frames: [
                {
                    id: "ethereum-frame",
                    label: "Ethereum",
                    nodes: ["wbtc-eth", "tbtc", "solvbtc", "btcn", "fbtc", "cbbtc"],
                    color: "#4ecdc4",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "osmosis-frame", 
                    label: "Osmosis",
                    nodes: ["wbtc-osmosis", "ckbtc-osmosis", "allbtc", "nbtc", "wbtc-eth-axl"],
                    color: "#45b7d1",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "bitcoin-frame", 
                    label: "Bitcoin",
                    nodes: ["btc", "bitcoin"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "solana-frame", 
                    label: "Solana",
                    nodes: ["wbtc-solana", "wbtc-axl-solana"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "base-frame", 
                    label: "Base",
                    nodes: ["wbtc-base"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "kava-frame", 
                    label: "Kava",
                    nodes: ["wbtc-kava"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "neutron-frame", 
                    label: "Neutron",
                    nodes: ["wbtc-eureka-neutron", "wbtc-axl-neutron"],
                    color: "#9b59b6",
                    strokeWidth: 2,
                    padding: 20
                }
            ],
            nodes: [
                // Central Bitcoin nodes
                { id: "btc", name: "BTC", type: "central" },
                { id: "bitcoin", name: "Bitcoin", type: "central" },
                
                // Major Bridge Protocols
                { id: "babylon", name: "Babylon", type: "bridge" },
                { id: "bitgo", name: "BitGo", type: "bridge" },

                { id: "wbtc-eth", name: "WBTC (Ethereum)", type: "bridge" },
                { id: "wbtc-osmosis", name: "WBTC (Osmosis)", type: "wrapped" },
                { id: "wbtc-solana", name: "WBTC (Solana)", type: "wrapped" },
                { id: "wbtc-base", name: "WBTC (Base)", type: "wrapped" },
                { id: "wbtc-kava", name: "WBTC (Kava)", type: "wrapped" },

                { id: "coinbase", name: "Coinbase", type: "bridge" },
                
                // Wrapped BTC Tokens
                { id: "cbbtc", name: "cbBTC", type: "wrapped" },
                { id: "tbtc", name: "tBTC", type: "wrapped" },
                { id: "solvbtc", name: "SolvBTC", type: "wrapped" },
                { id: "fbtc", name: "FBTC", type: "wrapped" },
                { id: "btcn", name: "BTCN", type: "wrapped" },
                { id: "allbtc", name: "allBTC", type: "wrapped" },
                { id: "axelar", name: "Axelar", type: "wrapped" },
                { id: "internet-computer", name: "Internet Computer", type: "wrapped" },
                { id: "ckbtc-osmosis", name: "ckBTC (Osmosis)", type: "wrapped" },
                { id: "nbtc", name: "nBTC", type: "wrapped" },
                { id: "solvbtc-bbn", name: "SolvBTC.BBN", type: "wrapped" },
                
                // Special nodes
                { id: "wbtc-eth-axl", name: "WBTC.eth.axl", type: "special" },
                { id: "portal-bridge", name: "Portal Bridge", type: "bridge" },
                { id: "wbtc-axl-solana", name: "WBTC.axl (Solana)", type: "wrapped" },
                
                // Eureka node (outside all frames)
                { id: "eureka", name: "Eureka", type: "bridge" },
                
                // Neutron nodes
                { id: "wbtc-eureka-neutron", name: "WBTC (Eureka Neutron)", type: "wrapped" },
                { id: "wbtc-axl-neutron", name: "WBTC (Axelar Neutron)", type: "wrapped" }
            ],
            links: [
                // Central connections
                { source: "bitcoin", target: "btc", text: async (link) => {
                    return await getLinkLabel('btc-supply', link.source, link.target);
                }},
                
                // Bridge connections from BTC
                { source: "btc", target: "babylon", text: async (link) => {
                    return await getLinkLabel('babylon-staked-btc', link.source, link.target);
                }},
                { source: "btc", target: "bitgo" },
                { source: "btc", target: "coinbase" },
                { source: "btc", target: "internet-computer" },
                
                // Bridge to wrapped tokens
                { source: "babylon", target: "solvbtc-bbn" },
                
                { source: "bitgo", target: "wbtc-eth", text: async (link) => {
                    return await getLinkLabel('wbtc-supply', link.source, link.target);
                }},
                { source: "bitgo", target: "wbtc-osmosis", text: async (link) => {
                    return await getLinkLabel('osmosis-wbtc-supply', link.source, link.target);
                }},
                { source: "bitgo", target: "wbtc-solana", text: async (link) => {
                    return await getLinkLabel('solana-wbtc-supply', link.source, link.target);
                }},
                
                { source: "coinbase", target: "cbbtc", text: async (link) => {
                    return await getLinkLabel('cbbtc-supply', link.source, link.target);
                }},
                
                // Ethereum ecosystem
                { source: "wbtc-eth", target: "solvbtc" },
                { source: "wbtc-eth", target: "axelar", text: async (link) => {
                    return await getLinkLabel('wbtc-balance', link.source, link.target);
                }},
                
                // Cross-chain connections
                { source: "tbtc", target: "solvbtc" },
                { source: "cbbtc", target: "solvbtc" },
                { source: "fbtc", target: "solvbtc" },
                { source: "cbbtc", target: "btcn" },
                { source: "wbtc-eth", target: "btcn" },
                
                // Osmosis ecosystem
                { source: "wbtc-osmosis", target: "allbtc" },
                { source: "internet-computer", target: "ckbtc-osmosis" },
                { source: "ckbtc-osmosis", target: "allbtc" },
                { source: "nbtc", target: "allbtc" },
                
                // Axelar bridge
                { source: "axelar", target: "wbtc-eth-axl", text: async (link) => {
                    return await getLinkLabel('osmosis-ibc-supply', link.source, link.target);
                }},
                { source: "wbtc-eth-axl", target: "allbtc" },
                
                // Weighted connections (with specific values)
                { source: "btc", target: "tbtc", text: async (link) => {
                    return await getLinkLabel('tbtc-supply', link.source, link.target);
                }},
                
                // Additional connections
                { source: "solvbtc-bbn", target: "solvbtc" },
                
                // Portal Bridge routes
                { source: "wbtc-eth", target: "portal-bridge" },
                { source: "portal-bridge", target: "wbtc-axl-solana", text: async (link) => {
                    return await getLinkLabel('wbtc-axl-solana-supply', link.source, link.target, { token: '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh' });
                }},
                
                // New routes for Neutron
                { source: "wbtc-eth", target: "eureka" },
                { source: "eureka", target: "wbtc-eureka-neutron" },
                { source: "axelar", target: "wbtc-axl-neutron" }
            ]
        };
    }

    static generateRandomGraph() {
        // For now, return the BTC map instead of random data
        return this.getSampleGraph();
    }

    static getEmptyGraph() {
        return {
            nodes: [],
            links: [],
            frames: []
        };
    }
}
