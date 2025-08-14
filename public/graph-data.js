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
                    nodes: ["wbtc-eth", "tbtc", "solvbtc-eth", "fbtc", "cbbtc", "aave", "morpho", "compound", "solvbtc-bbn", "lbtc"],
                    color: "#4ecdc4",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "osmosis-frame", 
                    label: "Osmosis",
                    nodes: ["wbtc-osmosis", "ckbtc-osmosis", "allbtc", "nbtc", "wbtc-eth-axl-osmo", "wbtc-eth-eur-osmo"],
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
                    nodes: ["wbtc-solana", "wbtc-portal-solana", "jupiter-perps"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "base-frame", 
                    label: "Base",
                    nodes: ["wbtc-base", "lbtc-base"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "arbitrum-frame",
                    label: "Arbitrum",
                    nodes: ["wbtc-arbitrum"],
                    color: "#28a745",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "polygon-frame",
                    label: "Polygon",
                    nodes: ["wbtc-polygon"],
                    color: "#6f42c1",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "optimism-frame",
                    label: "Optimism",
                    nodes: ["wbtc-optimism"],
                    color: "#dc3545",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "bsc-frame", 
                    label: "Binance Smart Chain",
                    nodes: ["lbtc-bsc"],
                    color: "#f39c12",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "sui-frame", 
                    label: "Sui",
                    nodes: ["lbtc-sui"],
                    color: "#e74c3c",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "sonic-frame", 
                    label: "Sonic",
                    nodes: ["lbtc-sonic"],
                    color: "#3498db",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "katana-frame", 
                    label: "Katana",
                    nodes: ["lbtc-katana"],
                    color: "#8e44ad",
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
                },
                {
                    id: "portal-frame", 
                    label: "Portal",
                    nodes: ["portal-bridge-wbtc", "portal-bridge-tbtc"],
                    color: "#f49c13",
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
                { id: "solvbtc", name: "SolvBTC", type: "issuer" },
                { id: "function", name: "Function", type: "issuer" },
                { id: "nomic", name: "Nomic", type: "issuer" },

                { id: "wbtc-eth", name: "WBTC", type: "token" },
                { id: "wbtc-osmosis", name: "WBTC", type: "token" },
                { id: "wbtc-solana", name: "WBTC", type: "token" },
                { id: "wbtc-portal-solana", name: "WBTC.portal", type: "token" },
                { id: "jupiter-perps", name: "Jupiter Perps", type: "protocol" },
                { id: "wbtc-base", name: "WBTC", type: "token" },
                { id: "wbtc-kava", name: "WBTC", type: "token" },
                { id: "wbtc-arbitrum", name: "WBTC", type: "token" },
                { id: "wbtc-polygon", name: "WBTC", type: "token" },
                { id: "wbtc-optimism", name: "WBTC", type: "token" },

                { id: "coinbase", name: "Coinbase", type: "issuer" },
                { id: "lombard", name: "Lombard", type: "issuer" },
                { id: "lbtc", name: "LBTC", type: "token" },
                { id: "lbtc-base", name: "LBTC", type: "token" },
                { id: "lbtc-bsc", name: "LBTC", type: "token" },
                { id: "lbtc-sui", name: "LBTC", type: "token" },
                { id: "lbtc-sonic", name: "LBTC", type: "token" },
                { id: "lbtc-katana", name: "LBTC", type: "token" },
                
                // Wrapped BTC Tokens
                { id: "cbbtc", name: "cbBTC", type: "token" },
                { id: "tbtc", name: "tBTC", type: "token" },
                { id: "solvbtc-eth", name: "SolvBTC", type: "token" },
                { id: "fbtc", name: "FBTC", type: "token" },
                { id: "allbtc-issuer", name: "allBTC", type: "issuer" },
                { id: "allbtc", name: "allBTC", type: "token" },
                { id: "axelar", name: "Axelar", type: "issuer" },
                { id: "internet-computer", name: "Internet Computer", type: "issuer" },
                { id: "ckbtc-osmosis", name: "ckBTC", type: "token" },
                { id: "nbtc", name: "nBTC", type: "token" },
                { id: "solvbtc-bbn", name: "SolvBTC.BBN", type: "token" },
                
                // Special nodes
                { id: "wbtc-eth-axl-osmo", name: "WBTC.eth.axl", type: "token" },
                { id: "wbtc-eth-eur-osmo", name: "WBTC.eth.atom", type: "token" },
                { id: "portal-bridge-wbtc", name: "WBTC", type: "issuer" },
                { id: "portal-bridge-tbtc", name: "tBTC", type: "issuer" },
                
                // DeFi Protocol nodes
                { id: "aave", name: "AAVE", type: "protocol" },
                { id: "morpho", name: "Morpho", type: "protocol" },
                { id: "compound", name: "Compound", type: "protocol" },
                
                // Eureka node (outside all frames)
                { id: "eureka", name: "Eureka", type: "issuer" },
                
                // Neutron nodes
                { id: "wbtc-eureka-neutron", name: "WBTC (Eureka)", type: "token" },
                { id: "wbtc-axl-neutron", name: "WBTC (Axelar)", type: "token" }
            ],
            links: [
                // Central connections
                { source: "bitcoin", target: "btc", text: true },
                
                // Bridge connections from BTC
                { source: "btc", target: "babylon", text: true },
                { source: "btc", target: "bitgo" },
                { source: "btc", target: "function" },
                { source: "btc", target: "coinbase" },
                { source: "btc", target: "internet-computer" },
                
                // Bridge to wrapped tokens
                { source: "babylon", target: "solvbtc-bbn" },
                { source: "babylon", target: "lombard", text: true },
                { source: "lombard", target: "lbtc", text: true },
                { source: "lombard", target: "lbtc-base", text: true },
                { source: "lombard", target: "lbtc-bsc", text: true },
                { source: "lombard", target: "lbtc-sui" },
                { source: "lombard", target: "lbtc-sonic" },
                { source: "lombard", target: "lbtc-katana" },
                
                { source: "bitgo", target: "wbtc-eth", text: true },
                { source: "bitgo", target: "wbtc-osmosis", text: true },
                { source: "bitgo", target: "wbtc-solana", text: true },
                { source: "bitgo", target: "wbtc-base", text: true },
                { source: "bitgo", target: "wbtc-kava", text: true },
                { source: "wbtc-eth", target: "wbtc-arbitrum", text: true },
                { source: "wbtc-eth", target: "wbtc-polygon", text: true },
                { source: "wbtc-eth", target: "wbtc-optimism", text: true },
                { source: "solvbtc", target: "solvbtc-eth", text: true },
                
                { source: "function", target: "fbtc", text: true },
                
                { source: "coinbase", target: "cbbtc", text: true },
                
                // Ethereum ecosystem
                { source: "wbtc-eth", target: "solvbtc" },
                { source: "wbtc-eth", target: "axelar", text: true },
                
                // Cross-chain connections
                { source: "tbtc", target: "solvbtc" },
                { source: "cbbtc", target: "solvbtc" },
                { source: "fbtc", target: "solvbtc" },
                
                // Osmosis ecosystem
                { source: "wbtc-osmosis", target: "allbtc-issuer", text: true },
                { source: "internet-computer", target: "ckbtc-osmosis", text: true },
                { source: "ckbtc-osmosis", target: "allbtc-issuer", text: true },
                { source: "nbtc", target: "allbtc-issuer", text: true },
                { source: "nomic", target: "nbtc", text: true },
                { source: "btc", target: "nomic" },
                { source: "allbtc-issuer", target: "allbtc", text: true },
                
                // Axelar bridge
                { source: "axelar", target: "wbtc-eth-axl-osmo", text: true },
                { source: "wbtc-eth-axl-osmo", target: "allbtc-issuer", text: true },

                { source: "eureka", target: "wbtc-eth-eur-osmo", text: true },
                { source: "wbtc-eth-eur-osmo", target: "allbtc-issuer", text: true },
                
                // Weighted connections (with specific values)
                { source: "btc", target: "tbtc", text: true },
                
                // Portal Bridge routes
                { source: "wbtc-eth", target: "portal-bridge-wbtc", text: true },
                { source: "portal-bridge-wbtc", target: "wbtc-portal-solana", text: true },
                
                // DeFi Protocol connections from WBTC-ETH
                { source: "wbtc-eth", target: "aave", text: true },
                { source: "wbtc-eth", target: "morpho", text: true },
                { source: "wbtc-eth", target: "compound", text: true },
                
                { source: "tbtc", target: "aave", text: true },
                { source: "tbtc", target: "portal-bridge-tbtc", text: true },
                
                { source: "cbbtc", target: "aave", text: true },
                { source: "cbbtc", target: "morpho", text: true },

                { source: "fbtc", target: "aave", text: true },
                { source: "lbtc", target: "aave", text: true },
                
                // Solana ecosystem
                { source: "wbtc-portal-solana", target: "jupiter-perps", text: true },
                
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
