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
                    nodes: ["wbtc-eth", "tbtc", "solvbtc", "btcn"],
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
                }
            ],
            nodes: [
                // Central Bitcoin nodes
                { id: "btc", name: "BTC", group: 1, size: 30, type: "central", x: 400, y: 500 },
                { id: "bitcoin", name: "Bitcoin", group: 1, size: 25, type: "central", x: 300, y: 600 },
                
                // Major Bridge Protocols
                { id: "babylon", name: "Babylon", group: 2, size: 22, type: "bridge", x: 250, y: 300 },
                { id: "bitgo", name: "BitGo", group: 2, size: 22, type: "bridge", x: 397, y: 423 },

                { id: "wbtc-eth", name: "WBTC (Ethereum)", group: 2, size: 22, type: "bridge", x: 397, y: 334 },
                { id: "wbtc-osmosis", name: "WBTC (Osmosis)", group: 3, size: 20, type: "wrapped", x: 797, y: 657 },
                { id: "wbtc-solana", name: "WBTC (Solana)", group: 3, size: 20, type: "wrapped", x: 93, y: 350 },
                { id: "wbtc-base", name: "WBTC (Base)", group: 3, size: 20, type: "wrapped", x: 97, y: 466 },
                { id: "wbtc-kava", name: "WBTC (Kava)", group: 3, size: 20, type: "wrapped", x: 800, y: 900 },

                { id: "coinbase", name: "Coinbase", group: 2, size: 22, type: "bridge", x: 687, y: 429 },
                
                // Wrapped BTC Tokens
                { id: "cbbtc", name: "cbBTC", group: 3, size: 20, type: "wrapped", x: 681, y: 352 },
                { id: "tbtc", name: "tBTC", group: 3, size: 20, type: "wrapped", x: 493, y: 348 },
                { id: "solvbtc", name: "SolvBTC", group: 3, size: 20, type: "wrapped", x: 452, y: 222 },
                { id: "fbtc", name: "FBTC", group: 3, size: 20, type: "wrapped", x: 818, y: 348 },
                { id: "btcn", name: "BTCN", group: 3, size: 20, type: "wrapped", x: 619, y: 212 },
                { id: "allbtc", name: "allBTC", group: 3, size: 20, type: "wrapped", x: 950, y: 657 },
                { id: "axelar", name: "Axelar", group: 3, size: 20, type: "wrapped", x: 587, y: 547 },
                { id: "internet-computer", name: "Internet Computer", group: 3, size: 20, type: "wrapped", x: 650, y: 700 },
                { id: "ckbtc-osmosis", name: "ckBTC (Osmosis)", group: 3, size: 20, type: "wrapped", x: 800, y: 750 },
                { id: "nbtc", name: "nBTC", group: 3, size: 20, type: "wrapped", x: 900, y: 550 },
                { id: "solvbtc-bbn", name: "SolvBTC.BBN", group: 3, size: 20, type: "wrapped", x: 447, y: 124 },
                
                // Special nodes
                { id: "renbtc", name: "renBTC", group: 4, size: 18, type: "special", x: 574, y: 351 },
                { id: "wbtc-eth-axl", name: "WBTC.eth.axl", group: 4, size: 18, type: "special", x: 794, y: 558 }
            ],
            links: [
                // Central connections
                { source: "bitcoin", target: "btc", value: 3, type: "central", text: async (link) => {
                    return await getLinkLabel('btc-supply', link.source, link.target);
                }},
                
                // Bridge connections from BTC
                { source: "btc", target: "babylon", value: 2, type: "bridge", text: async (link) => {
                    return await getLinkLabel('babylon-staked-btc', link.source, link.target);
                }},
                { source: "btc", target: "bitgo", value: 2, type: "bridge", text: null },
                { source: "btc", target: "coinbase", value: 2, type: "bridge", text: null },
                { source: "btc", target: "internet-computer", value: 2, type: "bridge", text: null },
                { source: "btc", target: "renbtc", value: 2, type: "bridge", text: null },
                
                // Bridge to wrapped tokens
                { source: "babylon", target: "solvbtc-bbn", value: 1, type: "bridge", text: null },
                
                { source: "bitgo", target: "wbtc-eth", value: 1, type: "bridge", text: async (link) => {
                    return await getLinkLabel('wbtc-supply', link.source, link.target);
                }},
                { source: "bitgo", target: "wbtc-osmosis", value: 1, type: "bridge", text: null },
                { source: "bitgo", target: "wbtc-solana", value: 1, type: "bridge", text: async (link) => {
                    return await getLinkLabel('solana-wbtc-supply', link.source, link.target);
                }},
                
                { source: "coinbase", target: "cbbtc", value: 1, type: "bridge", text: async (link) => {
                    return await getLinkLabel('cbbtc-supply', link.source, link.target);
                }},
                
                // Ethereum ecosystem
                { source: "wbtc-eth", target: "solvbtc", value: 1, type: "ecosystem", text: null },
                { source: "wbtc-eth", target: "axelar", value: 1, type: "ecosystem", text: async (link) => {
                    return await getLinkLabel('wbtc-balance', link.source, link.target);
                }},
                
                // Cross-chain connections
                { source: "tbtc", target: "solvbtc", value: 1, type: "cross-chain", text: null },
                { source: "cbbtc", target: "solvbtc", value: 1, type: "cross-chain", text: null },
                { source: "fbtc", target: "solvbtc", value: 1, type: "cross-chain", text: null },
                { source: "cbbtc", target: "btcn", value: 1, type: "cross-chain", text: null },
                { source: "wbtc-eth", target: "btcn", value: 1, type: "cross-chain", text: null },
                
                // Osmosis ecosystem
                { source: "wbtc-osmosis", target: "allbtc", value: 1, type: "ecosystem", text: null },
                { source: "internet-computer", target: "ckbtc-osmosis", value: 1, type: "ecosystem", text: null },
                { source: "ckbtc-osmosis", target: "allbtc", value: 1, type: "ecosystem", text: null },
                { source: "nbtc", target: "allbtc", value: 1, type: "ecosystem", text: null },
                
                // Axelar bridge
                { source: "axelar", target: "wbtc-eth-axl", value: 1, type: "bridge", text: async (link) => {
                    return await getLinkLabel('osmosis-ibc-supply', link.source, link.target);
                }},
                { source: "wbtc-eth-axl", target: "allbtc", value: 1, type: "bridge", text: null },
                
                // Weighted connections (with specific values)
                { source: "btc", target: "tbtc", value: 5, type: "weighted", text: async (link) => {
                    return await getLinkLabel('tbtc-supply', link.source, link.target);
                }},
                
                // Additional connections
                { source: "solvbtc-bbn", target: "solvbtc", value: 1, type: "dashed", text: null }
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
