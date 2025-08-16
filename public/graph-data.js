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
                    nodes: ["wbtc-solana", "wbtc-portal-solana", "tbtc-portal-solana", "jupiter-perps", "drift", "orca", "kamino", "marginifi", "cbbtc-solana"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "base-frame", 
                    label: "Base",
                    nodes: ["wbtc-base", "lbtc-base", "cbbtc-base"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                                {
                    id: "arbitrum-frame", 
                    label: "Arbitrum",
                    nodes: ["wbtc-arbitrum", "cbbtc-arbitrum", "solvbtc-arbitrum", "xsolvbtc-arbitrum", "btc-plus-arbitrum"],
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
                    nodes: ["lbtc-bsc", "solvbtc-bsc", "xsolvbtc-bsc", "btc-plus-bsc"],
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
                },
                {
                    id: "icp-frame", 
                    label: "Internet Computer",
                    nodes: ["ckbtc-icp"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "solvbtc-frame", 
                    label: "SolvBTC",
                    nodes: ["solvbtc", "xsolvbtc", "btc-plus"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "avalanche-frame", 
                    label: "Avalanche",
                    nodes: ["solvbtc-avalanche", "xsolvbtc-avalanche", "btc-plus-avalanche"],
                    color: "#E84142",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "mantle-frame", 
                    label: "Mantle",
                    nodes: ["solvbtc-mantle", "xsolvbtc-mantle", "btc-plus-mantle"],
                    color: "#000000",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "bob-frame", 
                    label: "BOB",
                    nodes: ["solvbtc-bob", "xsolvbtc-bob", "btc-plus-bob"],
                    color: "#FF6B35",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "base-frame", 
                    label: "Base",
                    nodes: ["wbtc-base", "lbtc-base", "cbbtc-base", "solvbtc-base", "xsolvbtc-base", "btc-plus-base"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "linea-frame", 
                    label: "Linea",
                    nodes: ["solvbtc-linea", "xsolvbtc-linea", "btc-plus-linea"],
                    color: "#61D9FA",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "rootstock-frame", 
                    label: "Rootstock",
                    nodes: ["solvbtc-rootstock", "xsolvbtc-rootstock", "btc-plus-rootstock"],
                    color: "#00C851",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "soneium-frame", 
                    label: "Soneium",
                    nodes: ["solvbtc-soneium", "xsolvbtc-soneium", "btc-plus-soneium"],
                    color: "#8B5CF6",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "ink-frame", 
                    label: "Ink",
                    nodes: ["solvbtc-ink", "xsolvbtc-ink", "btc-plus-ink"],
                    color: "#1A1A1A",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "bera-frame", 
                    label: "Bera",
                    nodes: ["solvbtc-bera", "xsolvbtc-bera", "btc-plus-bera"],
                    color: "#00D4AA",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "hyperevm-frame", 
                    label: "HyperEVM",
                    nodes: ["solvbtc-hyperevm", "xsolvbtc-hyperevm", "btc-plus-hyperevm"],
                    color: "#FF6B6B",
                    strokeWidth: 2,
                    padding: 20
                }
            ],
            nodes: [
                // Central Bitcoin nodes
                { id: "btc", name: "BTC", type: "token" },
                { id: "bitcoin", name: "Bitcoin", type: "issuer" },
                
                // WBTC
                { id: "bitgo", name: "BitGo", type: "issuer" },
                { id: "wbtc-eth", name: "WBTC", type: "token" },
                { id: "wbtc-osmosis", name: "WBTC", type: "token" },
                { id: "wbtc-solana", name: "WBTC", type: "token" },
                { id: "wbtc-base", name: "WBTC", type: "token" },
                { id: "wbtc-kava", name: "WBTC", type: "token" },
                { id: "wbtc-arbitrum", name: "WBTC", type: "token" },
                { id: "wbtc-polygon", name: "WBTC", type: "token" },
                { id: "wbtc-optimism", name: "WBTC", type: "token" },
                { id: "wbtc-eureka-neutron", name: "WBTC (Eureka)", type: "token" },
                { id: "wbtc-axl-neutron", name: "WBTC (Axelar)", type: "token" },
                { id: "wbtc-portal-solana", name: "WBTC.portal", type: "token" },
                { id: "wbtc-eth-axl-osmo", name: "WBTC.eth.axl", type: "token" },
                { id: "wbtc-eth-eur-osmo", name: "WBTC.eth.atom", type: "token" },
                { id: "portal-bridge-wbtc", name: "WBTC", type: "issuer" },

                // cbBTC
                { id: "coinbase", name: "Coinbase", type: "issuer" },
                { id: "cbbtc", name: "cbBTC", type: "token" },
                { id: "cbbtc-solana", name: "cbBTC", type: "token" },
                { id: "cbbtc-base", name: "cbBTC", type: "token" },
                { id: "cbbtc-arbitrum", name: "cbBTC", type: "token" },

                // LBTC
                { id: "lombard", name: "Lombard", type: "issuer" },
                { id: "lbtc", name: "LBTC", type: "token" },
                { id: "lbtc-base", name: "LBTC", type: "token" },
                { id: "lbtc-bsc", name: "LBTC", type: "token" },
                { id: "lbtc-sui", name: "LBTC", type: "token" },
                { id: "lbtc-sonic", name: "LBTC", type: "token" },
                { id: "lbtc-katana", name: "LBTC", type: "token" },

                // tBTC
                { id: "tbtc", name: "tBTC", type: "token" },
                { id: "tbtc-portal-solana", name: "tBTC.portal", type: "token" },
                { id: "portal-bridge-tbtc", name: "tBTC", type: "issuer" },

                // Ethereum protocols
                { id: "aave", name: "AAVE", type: "protocol" },
                { id: "morpho", name: "Morpho", type: "protocol" },
                { id: "compound", name: "Compound", type: "protocol" },

                // Solana protocols
                { id: "jupiter-perps", name: "Jupiter Perps", type: "protocol" },
                { id: "drift", name: "Drift", type: "protocol" },
                { id: "orca", name: "Orca", type: "protocol" },
                { id: "kamino", name: "Kamino", type: "protocol" },
                { id: "marginifi", name: "Marginifi", type: "protocol" },

                // SolvBTC
                { id: "solvbtc", name: "SolvBTC", type: "issuer" },
                { id: "xsolvbtc", name: "xSolvBTC", type: "issuer" },
                { id: "btc-plus", name: "BTC+", type: "issuer" },
                
                // SolvBTC tokens for BSC
                { id: "solvbtc-bsc", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-bsc", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-bsc", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for Arbitrum
                { id: "solvbtc-arbitrum", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-arbitrum", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-arbitrum", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for Avalanche
                { id: "solvbtc-avalanche", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-avalanche", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-avalanche", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for Mantle
                { id: "solvbtc-mantle", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-mantle", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-mantle", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for BOB
                { id: "solvbtc-bob", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-bob", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-bob", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for Base
                { id: "solvbtc-base", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-base", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-base", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for Linea
                { id: "solvbtc-linea", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-linea", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-linea", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for Rootstock
                { id: "solvbtc-rootstock", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-rootstock", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-rootstock", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for Soneium
                { id: "solvbtc-soneium", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-soneium", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-soneium", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for Ink
                { id: "solvbtc-ink", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-ink", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-ink", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for Bera
                { id: "solvbtc-bera", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-bera", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-bera", name: "BTC+", type: "token" },
                
                // SolvBTC tokens for HyperEVM
                { id: "solvbtc-hyperevm", name: "SolvBTC", type: "token" },
                { id: "xsolvbtc-hyperevm", name: "xSolvBTC", type: "token" },
                { id: "btc-plus-hyperevm", name: "BTC+", type: "token" },

                { id: "function", name: "Function", type: "issuer" },
                { id: "nomic", name: "Nomic", type: "issuer" },
                { id: "babylon", name: "Babylon", type: "issuer" },
                { id: "solvbtc-eth", name: "SolvBTC", type: "token" },
                { id: "fbtc", name: "FBTC", type: "token" },
                { id: "allbtc-issuer", name: "allBTC", type: "issuer" },
                { id: "allbtc", name: "allBTC", type: "token" },
                { id: "axelar", name: "Axelar", type: "issuer" },
                { id: "internet-computer", name: "Internet Computer", type: "issuer" },
                { id: "ckbtc-icp", name: "ckBTC", type: "token" },
                { id: "ckbtc-osmosis", name: "ckBTC", type: "token" },
                { id: "nbtc", name: "nBTC", type: "token" },
                { id: "eureka", name: "Eureka", type: "issuer" },
                { id: "binance", name: "Binance", type: "issuer" },
                { id: "btcb", name: "BTCB", type: "token" }
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
                { source: "btc", target: "solvbtc" },
                
                // Bridge to wrapped tokens
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
                { source: "coinbase", target: "cbbtc-solana", text: true },
                { source: "coinbase", target: "cbbtc-base", text: true },
                { source: "cbbtc-solana", target: "kamino", text: true },
                { source: "coinbase", target: "cbbtc-arbitrum", text: true },
                
                { source: "wbtc-eth", target: "axelar", text: true },
                
                { source: "wbtc-eth", target: "solvbtc", text: true },
                { source: "tbtc", target: "solvbtc", text: true },
                { source: "cbbtc", target: "solvbtc", text: true },
                { source: "fbtc", target: "solvbtc", text: true },
                
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
                { source: "portal-bridge-tbtc", target: "tbtc-portal-solana", text: true },
                { source: "internet-computer", target: "ckbtc-icp", text: true },
                { source: "cbbtc", target: "aave", text: true },
                { source: "cbbtc", target: "morpho", text: true },

                { source: "fbtc", target: "aave", text: true },
                { source: "lbtc", target: "aave", text: true },
                
                // Solana ecosystem
                { source: "wbtc-portal-solana", target: "jupiter-perps", text: true },
                { source: "wbtc-portal-solana", target: "drift", text: true },
                { source: "wbtc-portal-solana", target: "orca", text: true },
                { source: "wbtc-portal-solana", target: "kamino", text: true },
                { source: "wbtc-portal-solana", target: "marginifi", text: true },
                
                // New routes for Neutron
                { source: "wbtc-eth", target: "eureka" },
                { source: "eureka", target: "wbtc-eureka-neutron" },
                { source: "axelar", target: "wbtc-axl-neutron" },

                { source: "btc", target: "binance" },
                { source: "binance", target: "btcb" },
                { source: "babylon", target: "xsolvbtc" },
                
                // SolvBTC issuer connections to all networks
                { source: "solvbtc", target: "solvbtc-bsc", text: true },
                { source: "solvbtc", target: "solvbtc-arbitrum", text: true },
                { source: "solvbtc", target: "solvbtc-avalanche", text: true },
                { source: "solvbtc", target: "solvbtc-mantle", text: true },
                { source: "solvbtc", target: "solvbtc-bob", text: true },
                { source: "solvbtc", target: "solvbtc-base", text: true },
                { source: "solvbtc", target: "solvbtc-linea", text: true },
                { source: "solvbtc", target: "solvbtc-rootstock", text: true },
                { source: "solvbtc", target: "solvbtc-soneium", text: true },
                { source: "solvbtc", target: "solvbtc-ink", text: true },
                { source: "solvbtc", target: "solvbtc-bera", text: true },
                { source: "solvbtc", target: "solvbtc-hyperevm", text: true },
                
                // xSolvBTC issuer connections to all networks
                { source: "xsolvbtc", target: "xsolvbtc-bsc", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-arbitrum", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-avalanche", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-mantle", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-bob", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-base", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-linea", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-rootstock", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-soneium", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-ink", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-bera", text: true },
                { source: "xsolvbtc", target: "xsolvbtc-hyperevm", text: true },
                
                // BTC+ issuer connections to all networks
                { source: "btc-plus", target: "btc-plus-bsc", text: true },
                { source: "btc-plus", target: "btc-plus-arbitrum", text: true },
                { source: "btc-plus", target: "btc-plus-avalanche", text: true },
                { source: "btc-plus", target: "btc-plus-mantle", text: true },
                { source: "btc-plus", target: "btc-plus-bob", text: true },
                { source: "btc-plus", target: "btc-plus-base", text: true },
                { source: "btc-plus", target: "btc-plus-linea", text: true },
                { source: "btc-plus", target: "btc-plus-rootstock", text: true },
                { source: "btc-plus", target: "btc-plus-soneium", text: true },
                { source: "btc-plus", target: "btc-plus-ink", text: true },
                { source: "btc-plus", target: "btc-plus-bera", text: true },
                { source: "btc-plus", target: "btc-plus-hyperevm", text: true }
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
