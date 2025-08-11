// Bitcoin Liquidity Map - Graph data definitions
// Link text property can be:
// - null/undefined: No text displayed
// - string: Static text displayed
// - true: Call getLinkLabel() to fetch dynamic text from backend
// - false: No text displayed

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
                { id: "btc", name: "BTC", type: "token" },
                { id: "bitcoin", name: "Bitcoin", type: "issuer" },
                
                // Major Bridge Protocols
                { id: "babylon", name: "Babylon", type: "issuer" },
                { id: "bitgo", name: "BitGo", type: "issuer" },

                { id: "wbtc-eth", name: "WBTC (Ethereum)", type: "token" },
                { id: "wbtc-osmosis", name: "WBTC (Osmosis)", type: "token" },
                { id: "wbtc-solana", name: "WBTC (Solana)", type: "token" },
                { id: "wbtc-base", name: "WBTC (Base)", type: "token" },
                { id: "wbtc-kava", name: "WBTC (Kava)", type: "token" },

                { id: "coinbase", name: "Coinbase", type: "issuer" },
                
                // Wrapped BTC Tokens
                { id: "cbbtc", name: "cbBTC", type: "token" },
                { id: "tbtc", name: "tBTC", type: "token" },
                { id: "solvbtc", name: "SolvBTC", type: "token" },
                { id: "fbtc", name: "FBTC", type: "token" },
                { id: "btcn", name: "BTCN", type: "token" },
                { id: "allbtc", name: "allBTC", type: "token" },
                { id: "axelar", name: "Axelar", type: "issuer" },
                { id: "internet-computer", name: "Internet Computer", type: "issuer" },
                { id: "ckbtc-osmosis", name: "ckBTC (Osmosis)", type: "token" },
                { id: "nbtc", name: "nBTC", type: "token" },
                { id: "solvbtc-bbn", name: "SolvBTC.BBN", type: "token" },
                
                // Special nodes
                { id: "wbtc-eth-axl", name: "WBTC.eth.axl", type: "token" },
                { id: "portal-bridge", name: "Portal Bridge", type: "issuer" },
                { id: "wbtc-axl-solana", name: "WBTC.axl (Solana)", type: "token" },
                
                // Eureka node (outside all frames)
                { id: "eureka", name: "Eureka", type: "issuer" },
                
                // Neutron nodes
                { id: "wbtc-eureka-neutron", name: "WBTC (Eureka Neutron)", type: "token" },
                { id: "wbtc-axl-neutron", name: "WBTC (Axelar Neutron)", type: "token" }
            ],
            links: [
                // Central connections
                { source: "bitcoin", target: "btc", text: true },
                
                // Bridge connections from BTC
                { source: "btc", target: "babylon", text: true },
                { source: "btc", target: "bitgo" },
                { source: "btc", target: "coinbase" },
                { source: "btc", target: "internet-computer" },
                
                // Bridge to wrapped tokens
                { source: "babylon", target: "solvbtc-bbn" },
                
                { source: "bitgo", target: "wbtc-eth", text: true },
                { source: "bitgo", target: "wbtc-osmosis", text: true },
                { source: "bitgo", target: "wbtc-solana", text: true },
                
                { source: "coinbase", target: "cbbtc", text: true },
                
                // Ethereum ecosystem
                { source: "wbtc-eth", target: "solvbtc" },
                { source: "wbtc-eth", target: "axelar", text: true },
                
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
                { source: "axelar", target: "wbtc-eth-axl", text: true },
                { source: "wbtc-eth-axl", target: "allbtc" },
                
                // Weighted connections (with specific values)
                { source: "btc", target: "tbtc", text: true },
                
                // Additional connections
                { source: "solvbtc-bbn", target: "solvbtc" },
                
                // Portal Bridge routes
                { source: "wbtc-eth", target: "portal-bridge" },
                { source: "portal-bridge", target: "wbtc-axl-solana", text: true },
                
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
