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
                    nodes: ["wbtc-eth", "tbtc-eth", "solvbtc-eth", "fbtc-eth", "cbbtc-eth", "aave-eth", "morpho-eth", "compound-eth", "solvbtc-bbn", "lbtc-eth", "btc-plus-eth", "kbtc-eth"],
                    color: "#4ecdc4",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "osmosis-frame", 
                    label: "Osmosis",
                    nodes: ["wbtc-osmosis", "ckbtc-osmosis", "allbtc-osmosis", "nbtc-osmosis", "wbtc-eth-axl-osmo", "wbtc-eth-eureka-osmo", "btc-int3-osmosis"],
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
                    nodes: ["wbtc-solana", "wbtc-eth-portal-solana", "tbtc-eth-portal-solana", "jupiter-perps", "drift", "orca", "kamino", "marginifi", "cbbtc-solana"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "arbitrum-frame", 
                    label: "Arbitrum",
                    nodes: ["wbtc-eth-arbitrum", "cbbtc-arbitrum", "solvbtc-arbitrum", "xsolvbtc-arbitrum", "btc-plus-arbitrum"],
                    color: "#28a745",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "polygon-frame",
                    label: "Polygon",
                    nodes: ["wbtc-eth-polygon"],
                    color: "#6f42c1",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "optimism-frame", 
                    label: "Optimism",
                    nodes: ["wbtc-eth-optimism", "kbtc-optimism"],
                    color: "#dc3545",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "bsc-frame", 
                    label: "Binance Smart Chain",
                    nodes: ["lbtc-bsc", "solvbtc-bsc", "xsolvbtc-bsc", "btc-plus-bsc", "btcb-bsc"],
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
                    nodes: ["wbtc-eth-eureka-neutron", "wbtc-eth-axl-neutron", "btc-int3-neutron"],
                    color: "#9b59b6",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "portal-frame", 
                    label: "Portal",
                    nodes: ["wbtc-eth-portal", "tbtc-eth-portal"],
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
                    nodes: ["solvbtc-avalanche", "xsolvbtc-avalanche", "btc-plus-avalanche", "btc.b-avalanche"],
                    color: "#E84142",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "mantle-frame", 
                    label: "Mantle",
                    nodes: ["solvbtc-mantle", "xsolvbtc-mantle", "fbtc-mantle"],
                    color: "#000000",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "bob-frame", 
                    label: "BOB",
                    nodes: ["solvbtc-bob", "xsolvbtc-bob", "btc-plus-bob", "wbtc-eth-bob-bob", "wbtc-eth-stargate-bob"],
                    color: "#FF6B35",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "base-frame", 
                    label: "Base",
                    nodes: ["wbtc-base", "lbtc-base", "cbbtc-base", "solvbtc-base", "xsolvbtc-base", "btc-plus-base", "tbtc-eth-base"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "linea-frame", 
                    label: "Linea",
                    nodes: ["solvbtc-linea", "xsolvbtc-linea", "wbtc-eth-linea-linea"],
                    color: "#61D9FA",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "rootstock-frame", 
                    label: "Rootstock",
                    nodes: ["solvbtc-rootstock", "xsolvbtc-rootstock", "rbtc-rootstock"],
                    color: "#00C851",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "soneium-frame", 
                    label: "Soneium",
                    nodes: ["solvbtc-soneium", "xsolvbtc-soneium", "wbtc-eth-stargate-soneium"],
                    color: "#8B5CF6",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "ink-frame", 
                    label: "Ink",
                    nodes: ["solvbtc-ink", "xsolvbtc-ink", "kbtc-ink"],
                    color: "#1A1A1A",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "bera-frame", 
                    label: "Bera",
                    nodes: ["solvbtc-bera", "xsolvbtc-bera", "btc-plus-bera", "wbtc-eth-stargate-berachain"],
                    color: "#00D4AA",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "hyperevm-frame", 
                    label: "HyperEVM",
                    nodes: ["solvbtc-hyperevm", "xsolvbtc-hyperevm", "btc-plus-hyperevm", "ubtc-hyperliquid"],
                    color: "#FF6B6B",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "merlin-frame", 
                    label: "Merlin",
                    nodes: ["xsolvbtc-merlin"],
                    color: "#FF6B6B",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "unichain-frame", 
                    label: "Unichain",
                    nodes: ["kbtc-unichain"],
                    color: "#9B59B6",
                    strokeWidth: 2,
                    padding: 20
                }
            ],
            nodes: [
                // Central Bitcoin nodes
                { id: "btc", name: "BTC", type: "token" },
                { id: "bitcoin", name: "Bitcoin", type: "issuer" },
                
                // Kraken
                { id: "kraken",         name: "Kraken", type: "issuer" },
                { id: "kbtc-eth",       name: "kBTC", type: "token" },
                { id: "kbtc-optimism",  name: "kBTC", type: "token" },
                { id: "kbtc-unichain",  name: "kBTC", type: "token" },
                { id: "kbtc-ink",       name: "kBTC", type: "token" },
                
                // WBTC
                { id: "bitgo", name: "BitGo", type: "issuer" },
                // Native WBTC
                { id: "wbtc-eth",       name: "WBTC", type: "token" },
                { id: "wbtc-osmosis",   name: "WBTC", type: "token" },
                { id: "wbtc-solana",    name: "WBTC", type: "token" },
                { id: "wbtc-base",      name: "WBTC", type: "token" },
                { id: "wbtc-kava",      name: "WBTC", type: "token" },
                // Bridged WBTC
                { id: "wbtc-eth-arbitrum",              name: "WBTC", type: "token" },
                { id: "wbtc-eth-polygon",               name: "WBTC", type: "token" },
                { id: "wbtc-eth-optimism",              name: "WBTC", type: "token" },
                { id: "wbtc-eth-eureka-neutron",        name: "WBTC (Eureka)", type: "token" },
                { id: "wbtc-eth-axl-neutron",           name: "WBTC (Axelar)", type: "token" },
                { id: "wbtc-eth-portal-solana",         name: "WBTC.portal", type: "token" },
                { id: "wbtc-eth-axl-osmo",              name: "WBTC.eth.axl", type: "token" },
                { id: "wbtc-eth-eureka-osmo",           name: "WBTC.eth.atom", type: "token" },
                { id: "wbtc-eth-portal",                name: "WBTC", type: "issuer" },
                { id: "wbtc-eth-stargate-soneium",      name: "WBTC", type: "token" },
                { id: "wbtc-eth-stargate-berachain",    name: "WBTC", type: "token" },
                { id: "wbtc-eth-bob-bob",               name: "WBTC (old)", type: "token" },
                { id: "wbtc-eth-stargate-bob",          name: "WBTC", type: "token" },
                { id: "wbtc-eth-linea-linea",           name: "WBTC", type: "token" },

                // cbBTC
                { id: "coinbase",       name: "Coinbase", type: "issuer" },
                { id: "cbbtc-eth",      name: "cbBTC", type: "token" },
                { id: "cbbtc-solana",   name: "cbBTC", type: "token" },
                { id: "cbbtc-base",     name: "cbBTC", type: "token" },
                { id: "cbbtc-arbitrum", name: "cbBTC", type: "token" },

                // LBTC
                { id: "lombard",        name: "Lombard", type: "issuer" },
                { id: "lbtc-eth",       name: "LBTC", type: "token" },
                { id: "lbtc-base",      name: "LBTC", type: "token" },
                { id: "lbtc-bsc",       name: "LBTC", type: "token" },
                { id: "lbtc-sui",       name: "LBTC", type: "token" },
                { id: "lbtc-sonic",     name: "LBTC", type: "token" },
                { id: "lbtc-katana",    name: "LBTC", type: "token" },

                // tBTC
                { id: "tbtc-eth",               name: "tBTC", type: "token" },
                { id: "tbtc-eth-portal-solana", name: "tBTC", type: "token" },
                { id: "tbtc-eth-base",          name: "tBTC", type: "token" },
                { id: "tbtc-eth-portal",        name: "tBTC", type: "issuer" },

                // Ethereum protocols
                { id: "aave-eth", name: "AAVE", type: "protocol" },
                { id: "morpho-eth", name: "Morpho", type: "protocol" },
                { id: "compound-eth", name: "Compound", type: "protocol" },

                // Solana protocols
                { id: "jupiter-perps", name: "Jupiter Perps", type: "protocol" },
                { id: "drift", name: "Drift", type: "protocol" },
                { id: "orca", name: "Orca", type: "protocol" },
                { id: "kamino", name: "Kamino", type: "protocol" },
                { id: "marginifi", name: "Marginifi", type: "protocol" },

                // SolvBTC
                { id: "solvbtc",            name: "SolvBTC", type: "issuer" },
                { id: "solvbtc-bsc",        name: "SolvBTC", type: "token" },
                { id: "solvbtc-arbitrum",   name: "SolvBTC", type: "token" },
                { id: "solvbtc-avalanche",  name: "SolvBTC", type: "token" },
                { id: "solvbtc-mantle",     name: "SolvBTC", type: "token" },
                { id: "solvbtc-bob",        name: "SolvBTC", type: "token" },
                { id: "solvbtc-base",       name: "SolvBTC", type: "token" },
                { id: "solvbtc-linea",      name: "SolvBTC", type: "token" },
                { id: "solvbtc-rootstock",  name: "SolvBTC", type: "token" },
                { id: "solvbtc-soneium",    name: "SolvBTC", type: "token" },
                { id: "solvbtc-ink",        name: "SolvBTC", type: "token" },
                { id: "solvbtc-bera",       name: "SolvBTC", type: "token" },
                { id: "solvbtc-hyperevm",   name: "SolvBTC", type: "token" },
                { id: "solvbtc-eth",        name: "SolvBTC", type: "token" },

                { id: "xsolvbtc",           name: "xSolvBTC", type: "issuer" },
                { id: "xsolvbtc-bsc",       name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-arbitrum",  name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-avalanche", name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-mantle",    name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-bob",       name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-base",      name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-linea",     name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-rootstock", name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-soneium",   name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-hyperevm",  name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-ink",       name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-bera",      name: "xSolvBTC", type: "token" },
                { id: "xsolvbtc-merlin",    name: "xSolvBTC", type: "token" },

                { id: "btc-plus",           name: "BTC+", type: "issuer" },
                { id: "btc-plus-bsc",       name: "BTC+", type: "token" },
                { id: "btc-plus-arbitrum",  name: "BTC+", type: "token" },
                { id: "btc-plus-avalanche", name: "BTC+", type: "token" },
                { id: "btc-plus-bob",       name: "BTC+", type: "token" },
                { id: "btc-plus-base",      name: "BTC+", type: "token" },
                { id: "btc-plus-bera",      name: "BTC+", type: "token" },
                { id: "btc-plus-hyperevm",  name: "BTC+", type: "token" },
                { id: "btc-plus-eth",       name: "BTC+", type: "token" },


                // FBTC
                { id: "function",       name: "Function", type: "issuer" },
                { id: "fbtc-eth",       name: "FBTC", type: "token" },
                { id: "fbtc-mantle",    name: "FBTC", type: "token" },

                // nBTC
                { id: "nomic", name: "Nomic", type: "issuer" },
                { id: "nbtc-osmosis", name: "nBTC", type: "token" },

                // Babylon
                { id: "babylon", name: "Babylon", type: "issuer" },

                // Alloyed BTC on Osmosis
                { id: "allbtc-osmosis-issuer", name: "allBTC", type: "issuer" },
                { id: "allbtc-osmosis", name: "allBTC", type: "token" },

                // Token bridges
                { id: "eureka-wbtc-eth", name: "Eureka", type: "issuer" },
                { id: "axelar-wbtc-eth", name: "Axelar", type: "issuer" },
                { id: "stargate-wbtc-eth", name: "Stargate (LayerZero)", type: "issuer" },
                { id: "bob-bridge", name: "BOB Bridge (?)", type: "issuer" },
                { id: "linea-bridge-wbtc-eth", name: "Linea Bridge", type: "issuer" },

                // BTC bridges
                { id: "int3face", name: "Int3Face (BitFrost)", type: "issuer" },
                { id: "powpeg", name: "PowPeg", type: "issuer" },
                { id: "unit", name: "Unit", type: "issuer" },

                // ckBTC
                { id: "internet-computer", name: "Internet Computer", type: "issuer" },
                { id: "ckbtc-icp",      name: "ckBTC", type: "token" }, 
                { id: "ckbtc-osmosis",  name: "ckBTC", type: "token" },

                // BTC.b
                { id: "binance", name: "Binance", type: "issuer" },
                { id: "btcb-bsc", name: "BTCB", type: "token" },

                // BTC.b
                { id: "btc.b-avalanche", name: "BTC.b", type: "token" },

                { id: "btc-int3-osmosis", name: "BTC.int3", type: "token" },
                { id: "btc-int3-neutron", name: "BTC.int3", type: "token" },


                { id: "rbtc-rootstock", name: "RBTC", type: "token" },

                { id: "ubtc-hyperliquid", name: "UBTC", type: "token" },
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
                { source: "btc", target: "kraken" },
                { source: "btc", target: "btc.b-avalanche", text: true },
                { source: "btc", target: "unit" },
                
                // Bridge to wrapped tokens
                { source: "babylon", target: "lombard", text: true },
                { source: "lombard", target: "lbtc-eth", text: true },
                { source: "lombard", target: "lbtc-base", text: true },
                { source: "lombard", target: "lbtc-bsc", text: true },
                { source: "lombard", target: "lbtc-sui", text: true },
                { source: "lombard", target: "lbtc-sonic", text: true },
                { source: "lombard", target: "lbtc-katana", text: true },
                
                { source: "bitgo", target: "wbtc-eth", text: true },
                { source: "bitgo", target: "wbtc-osmosis", text: true },
                { source: "bitgo", target: "wbtc-solana", text: true },
                { source: "bitgo", target: "wbtc-base", text: true },
                { source: "bitgo", target: "wbtc-kava", text: true },
                { source: "wbtc-eth", target: "wbtc-eth-arbitrum", text: true },
                { source: "wbtc-eth", target: "wbtc-eth-polygon", text: true },
                { source: "wbtc-eth", target: "wbtc-eth-optimism", text: true },
                
                // FBTC
                { source: "function", target: "fbtc-eth", text: true },
                { source: "function", target: "fbtc-mantle", text: true },
                
                { source: "coinbase", target: "cbbtc-eth", text: true },
                { source: "coinbase", target: "cbbtc-solana", text: true },
                { source: "coinbase", target: "cbbtc-base", text: true },
                { source: "cbbtc-solana", target: "kamino", text: true },
                { source: "coinbase", target: "cbbtc-arbitrum", text: true },
                
                { source: "wbtc-eth", target: "axelar-wbtc-eth", text: true },
                
                // SolvBTC backing
                { source: "wbtc-eth", target: "solvbtc", text: true },
                { source: "tbtc-eth", target: "solvbtc", text: true },
                { source: "cbbtc-eth", target: "solvbtc", text: true },
                { source: "fbtc-eth", target: "solvbtc", text: true },
                { source: "btcb-bsc", target: "solvbtc", text: true },
                { source: "wbtc-eth-arbitrum", target: "solvbtc", text: true },
                { source: "btc.b-avalanche", target: "solvbtc", text: true },
                { source: "fbtc-mantle", target: "solvbtc", text: true },
                { source: "wbtc-eth-stargate-bob", target: "solvbtc", text: true },
                { source: "tbtc-eth-base", target: "solvbtc", text: true },
                { source: "cbbtc-base", target: "solvbtc", text: true },
                { source: "wbtc-eth-linea-linea", target: "solvbtc", text: true },
                { source: "wbtc-eth-stargate-soneium", target: "solvbtc", text: true },
                { source: "kbtc-ink", target: "solvbtc", text: true },
                { source: "ubtc-hyperliquid", target: "solvbtc", text: true },
                { source: "wbtc-eth-stargate-berachain", target: "solvbtc", text: true },
                
                // Osmosis ecosystem
                { source: "wbtc-osmosis", target: "allbtc-osmosis-issuer", text: true },
                { source: "internet-computer", target: "ckbtc-osmosis", text: true },
                { source: "ckbtc-osmosis", target: "allbtc-osmosis-issuer", text: true },
                { source: "nbtc-osmosis", target: "allbtc-osmosis-issuer", text: true },
                { source: "nomic", target: "nbtc-osmosis", text: true },
                { source: "btc", target: "nomic" },
                { source: "allbtc-osmosis-issuer", target: "allbtc-osmosis", text: true },
                
                // Axelar bridge
                { source: "axelar-wbtc-eth", target: "wbtc-eth-axl-osmo", text: true },
                { source: "wbtc-eth-axl-osmo", target: "allbtc-osmosis-issuer", text: true },

                { source: "eureka-wbtc-eth", target: "wbtc-eth-eureka-osmo", text: true },
                { source: "wbtc-eth-eureka-osmo", target: "allbtc-osmosis-issuer", text: true },
                
                // Weighted connections (with specific values)
                { source: "btc", target: "tbtc-eth", text: true },
                
                // Portal Bridge routes
                { source: "wbtc-eth", target: "wbtc-eth-portal", text: true },
                { source: "wbtc-eth-portal", target: "wbtc-eth-portal-solana", text: true },
                
                // DeFi Protocol connections from WBTC-ETH
                { source: "wbtc-eth", target: "aave-eth", text: true },
                { source: "wbtc-eth", target: "morpho-eth", text: true },
                { source: "wbtc-eth", target: "compound-eth", text: true },
                
                { source: "tbtc-eth", target: "aave-eth", text: true },
                { source: "tbtc-eth", target: "tbtc-eth-portal", text: true },
                { source: "tbtc-eth-portal", target: "tbtc-eth-portal-solana", text: true },
                { source: "tbtc-eth-portal", target: "tbtc-eth-base", text: true },
                { source: "internet-computer", target: "ckbtc-icp", text: true },
                { source: "cbbtc-eth", target: "aave-eth", text: true },
                { source: "cbbtc-eth", target: "morpho-eth", text: true },

                { source: "fbtc-eth", target: "aave-eth", text: true },
                { source: "lbtc-eth", target: "aave-eth", text: true },
                
                // Solana ecosystem
                { source: "wbtc-eth-portal-solana", target: "jupiter-perps", text: true },
                { source: "wbtc-eth-portal-solana", target: "drift", text: true },
                { source: "wbtc-eth-portal-solana", target: "orca", text: true },
                { source: "wbtc-eth-portal-solana", target: "kamino", text: true },
                { source: "wbtc-eth-portal-solana", target: "marginifi", text: true },
                
                // New routes for Neutron
                { source: "wbtc-eth", target: "eureka-wbtc-eth" },
                { source: "eureka-wbtc-eth", target: "wbtc-eth-eureka-neutron" },
                { source: "axelar-wbtc-eth", target: "wbtc-eth-axl-neutron" },

                { source: "btc", target: "binance" },
                { source: "binance", target: "btcb-bsc", text: true },
                { source: "babylon", target: "xsolvbtc" },
                
                // Kraken kBTC connections
                { source: "kraken", target: "kbtc-eth", text: true },
                { source: "kraken", target: "kbtc-optimism", text: true },
                { source: "kraken", target: "kbtc-unichain", text: true },
                { source: "kraken", target: "kbtc-ink", text: true },
                
                // SolvBTC issuer connections to all networks
                { source: "solvbtc", target: "solvbtc-eth", text: true },
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
                { source: "xsolvbtc", target: "xsolvbtc-merlin", text: true },
                
                // BTC+ issuer connections to all networks
                { source: "btc-plus", target: "btc-plus-eth", text: true },
                { source: "btc-plus", target: "btc-plus-bsc", text: true },
                { source: "btc-plus", target: "btc-plus-arbitrum", text: true },
                { source: "btc-plus", target: "btc-plus-avalanche", text: true },
                { source: "btc-plus", target: "btc-plus-bob", text: true },
                { source: "btc-plus", target: "btc-plus-base", text: true },
                { source: "btc-plus", target: "btc-plus-bera", text: true },
                { source: "btc-plus", target: "btc-plus-hyperevm", text: true },

                { source: "stargate-wbtc-eth", target: "wbtc-eth-stargate-bob", text: true },
                { source: "wbtc-eth", target: "stargate-wbtc-eth", text: true },
                { source: "wbtc-eth", target: "bob-bridge" },
                { source: "bob-bridge", target: "wbtc-eth-bob-bob", text: true },
                { source: "linea-bridge-wbtc-eth", target: "wbtc-eth-linea-linea", text: true },
                { source: "wbtc-eth", target: "linea-bridge-wbtc-eth", text: true },

                { source: "btc", target: "int3face" },
                { source: "int3face", target: "btc-int3-osmosis", text: true },
                { source: "int3face", target: "btc-int3-neutron", text: true },
                { source: "btc-int3-osmosis", target: "allbtc-osmosis-issuer", text: true },

                { source: "powpeg", target: "rbtc-rootstock", text: true },
                { source: "rbtc-rootstock", target: "solvbtc", text: true },
                { source: "btc", target: "powpeg" },
                { source: "stargate-wbtc-eth", target: "wbtc-eth-stargate-soneium", text: true },
                { source: "stargate-wbtc-eth", target: "wbtc-eth-stargate-berachain", text: true },

                { source: "unit", target: "ubtc-hyperliquid", text: true },
            ]
        };
    }
}
