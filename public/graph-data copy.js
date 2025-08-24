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
                    nodes: ["wbtc-eth", "tbtc", "solvbtc-eth", "fbtc", "cbbtc", "aave", "morpho", "compound", "solvbtc-bbn", "lbtc", "btc-plus-eth", "kbtc-eth"],
                    color: "#4ecdc4",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "osmosis-frame", 
                    label: "Osmosis",
                    nodes: ["wbtc-osmosis", "ckbtc-osmosis", "allbtc", "nbtc", "wbtc-eth-axl-osmo", "wbtc-eth-eur-osmo", "btc-int3-osmosis"],
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
                    nodes: ["wbtc-optimism", "kbtc-optimism"],
                    color: "#dc3545",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "bsc-frame", 
                    label: "Binance Smart Chain",
                    nodes: ["lbtc-bsc", "solvbtc-bsc", "xsolvbtc-bsc", "btc-plus-bsc", "btcb"],
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
                    nodes: ["wbtc-eureka-neutron", "wbtc-axl-neutron", "btc-int3-neutron"],
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
                    nodes: ["solvbtc-avalanche", "xsolvbtc-avalanche", "btc-plus-avalanche", "btc.b"],
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
                    nodes: ["solvbtc-bob", "xsolvbtc-bob", "btc-plus-bob", "wbtc-bob-old", "wbtc-bob"],
                    color: "#FF6B35",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "base-frame", 
                    label: "Base",
                    nodes: ["wbtc-base", "lbtc-base", "cbbtc-base", "solvbtc-base", "xsolvbtc-base", "btc-plus-base", "tbtc-base"],
                    color: "#f49c13",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "linea-frame", 
                    label: "Linea",
                    nodes: ["solvbtc-linea", "xsolvbtc-linea", "wbtc-linea"],
                    color: "#61D9FA",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "rootstock-frame", 
                    label: "Rootstock",
                    nodes: ["solvbtc-rootstock", "xsolvbtc-rootstock", "rbtc"],
                    color: "#00C851",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "soneium-frame", 
                    label: "Soneium",
                    nodes: ["solvbtc-soneium", "xsolvbtc-soneium", "wbtc-soneium"],
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
                    nodes: ["solvbtc-bera", "xsolvbtc-bera", "btc-plus-bera", "wbtc-berachain"],
                    color: "#00D4AA",
                    strokeWidth: 2,
                    padding: 20
                },
                {
                    id: "hyperevm-frame", 
                    label: "HyperEVM",
                    nodes: ["solvbtc-hyperevm", "xsolvbtc-hyperevm", "btc-plus-hyperevm", "ubtc"],
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
                { id: "wbtc-arbitrum",          name: "WBTC", type: "token" }, // TODO rename to wbtc-eth-arbitrum
                { id: "wbtc-polygon",           name: "WBTC", type: "token" }, // TODO rename to wbtc-eth-polygon
                { id: "wbtc-optimism",          name: "WBTC", type: "token" }, // TODO rename to wbtc-eth-optimism
                { id: "wbtc-eureka-neutron",    name: "WBTC (Eureka)", type: "token" }, // TODO rename to wbtc-eth-eureka-neutron
                { id: "wbtc-axl-neutron",       name: "WBTC (Axelar)", type: "token" }, // TODO rename to wbtc-eth-axl-neutron
                { id: "wbtc-portal-solana",     name: "WBTC.portal", type: "token" }, // TODO rename to wbtc-eth-portal-solana
                { id: "wbtc-eth-axl-osmo",      name: "WBTC.eth.axl", type: "token" },
                { id: "wbtc-eth-eur-osmo",      name: "WBTC.eth.atom", type: "token" }, // TODO rename to wbtc-eth-eureka-osmo
                { id: "portal-bridge-wbtc",     name: "WBTC", type: "issuer" }, // TODO rename to wbtc-eth-portal
                { id: "wbtc-soneium",           name: "WBTC", type: "token" }, // TODO rename to wbtc-eth-stargate-soneium
                { id: "wbtc-berachain",         name: "WBTC", type: "token" }, // TODO rename to wbtc-eth-stargate-berachain
                { id: "wbtc-bob-old",           name: "WBTC (old)", type: "token" }, // TODO rename to wbtc-eth-bob-bob
                { id: "wbtc-bob",               name: "WBTC", type: "token" }, // TODO rename to wbtc-eth-stargate-bob
                { id: "wbtc-linea",             name: "WBTC", type: "token" }, // TODO rename to wbtc-eth-linea-linea

                // cbBTC
                { id: "coinbase",       name: "Coinbase", type: "issuer" },
                { id: "cbbtc",          name: "cbBTC", type: "token" }, // TODO rename to cbbtc-eth
                { id: "cbbtc-solana",   name: "cbBTC", type: "token" },
                { id: "cbbtc-base",     name: "cbBTC", type: "token" },
                { id: "cbbtc-arbitrum", name: "cbBTC", type: "token" },

                // LBTC
                { id: "lombard",        name: "Lombard", type: "issuer" },
                { id: "lbtc",           name: "LBTC", type: "token" }, // TODO rename to lbtc-eth
                { id: "lbtc-base",      name: "LBTC", type: "token" },
                { id: "lbtc-bsc",       name: "LBTC", type: "token" },
                { id: "lbtc-sui",       name: "LBTC", type: "token" },
                { id: "lbtc-sonic",     name: "LBTC", type: "token" },
                { id: "lbtc-katana",    name: "LBTC", type: "token" },

                // tBTC
                { id: "tbtc",               name: "tBTC", type: "token" }, // TODO rename to tbtc-eth
                { id: "tbtc-portal-solana", name: "tBTC", type: "token" }, // TODO rename to tbtc-eth-portal-solana
                { id: "tbtc-base",          name: "tBTC", type: "token" }, // TODO rename to tbtc-eth-base
                { id: "portal-bridge-tbtc", name: "tBTC", type: "issuer" }, // TODO rename to tbtc-eth-portal

                // Ethereum protocols
                { id: "aave", name: "AAVE", type: "protocol" }, // TODO rename to aave-eth
                { id: "morpho", name: "Morpho", type: "protocol" }, // TODO rename to morpho-eth
                { id: "compound", name: "Compound", type: "protocol" }, // TODO rename to compound-eth

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
                { id: "fbtc",           name: "FBTC", type: "token" }, // TODO rename to fbtc-eth
                { id: "fbtc-mantle",    name: "FBTC", type: "token" },

                // nBTC
                { id: "nomic", name: "Nomic", type: "issuer" },
                { id: "nbtc", name: "nBTC", type: "token" }, // TODO rename to nbtc-osmosis

                // Babylon
                { id: "babylon", name: "Babylon", type: "issuer" },

                // Alloyed BTC on Osmosis
                { id: "allbtc-issuer", name: "allBTC", type: "issuer" }, // TODO rename to allbtc-osmosis-issuer
                { id: "allbtc", name: "allBTC", type: "token" }, // TODO rename to allbtc-osmosis

                // Token bridges
                { id: "eureka", name: "Eureka", type: "issuer" }, // TODO rename to eureka-wbtc-eth
                { id: "axelar", name: "Axelar", type: "issuer" }, // TODO rename to axelar-wbtc-eth
                { id: "stargate", name: "Stargate (LayerZero)", type: "issuer" }, // TODO rename to stargate-wbtc-eth
                { id: "bob-bridge", name: "BOB Bridge (?)", type: "issuer" },
                { id: "linea-bridge", name: "Linea Bridge", type: "issuer" }, // TODO rename to linea-bridge-wbtc-eth

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
                { id: "btcb", name: "BTCB", type: "token" }, // TODO rename to btcb-bsc

                // BTC.b
                { id: "btc.b", name: "BTC.b", type: "token" }, // TODO rename to btc.b-avalanche

                { id: "btc-int3-osmosis", name: "BTC.in3", type: "token" },
                { id: "btc-int3-neutron", name: "BTC.in3", type: "token" },


                { id: "rbtc", name: "RBTC", type: "token" }, // TODO rename to rbtc-rootstock

                { id: "ubtc", name: "UBTC", type: "token" }, // TODO rename to ubtc-hyperliquid
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
                { source: "btc", target: "btc.b", text: true },
                { source: "btc", target: "unit" },
                
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
                
                // FBTC
                { source: "function", target: "fbtc", text: true },
                { source: "function", target: "fbtc-mantle", text: true },
                
                { source: "coinbase", target: "cbbtc", text: true },
                { source: "coinbase", target: "cbbtc-solana", text: true },
                { source: "coinbase", target: "cbbtc-base", text: true },
                { source: "cbbtc-solana", target: "kamino", text: true },
                { source: "coinbase", target: "cbbtc-arbitrum", text: true },
                
                { source: "wbtc-eth", target: "axelar", text: true },
                
                // SolvBTC backing
                { source: "wbtc-eth", target: "solvbtc", text: true },
                { source: "tbtc", target: "solvbtc", text: true },
                { source: "cbbtc", target: "solvbtc", text: true },
                { source: "fbtc", target: "solvbtc", text: true },
                { source: "btcb", target: "solvbtc", text: true },
                { source: "wbtc-arbitrum", target: "solvbtc", text: true },
                { source: "btc.b", target: "solvbtc", text: true },
                { source: "fbtc-mantle", target: "solvbtc", text: true },
                { source: "wbtc-bob", target: "solvbtc", text: true },
                { source: "tbtc-base", target: "solvbtc", text: true },
                { source: "cbbtc-base", target: "solvbtc", text: true },
                { source: "wbtc-linea", target: "solvbtc", text: true },
                { source: "wbtc-soneium", target: "solvbtc", text: true },
                { source: "kbtc-ink", target: "solvbtc", text: true },
                { source: "ubtc", target: "solvbtc", text: true },
                { source: "wbtc-berachain", target: "solvbtc", text: true },
                
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
                { source: "portal-bridge-tbtc", target: "tbtc-base", text: true },
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
                { source: "binance", target: "btcb", text: true },
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

                { source: "stargate", target: "wbtc-bob", text: true },
                { source: "wbtc-eth", target: "stargate", text: true },
                { source: "wbtc-eth", target: "bob-bridge" },
                { source: "bob-bridge", target: "wbtc-bob-old", text: true },
                { source: "linea-bridge", target: "wbtc-linea", text: true },
                { source: "wbtc-eth", target: "linea-bridge", text: true },

                { source: "btc", target: "int3face" },
                { source: "int3face", target: "btc-int3-osmosis", text: true },
                { source: "int3face", target: "btc-int3-neutron", text: true },
                { source: "btc-int3-osmosis", target: "allbtc-issuer", text: true },

                { source: "powpeg", target: "rbtc", text: true },
                { source: "rbtc", target: "solvbtc", text: true },
                { source: "btc", target: "powpeg" },
                { source: "stargate", target: "wbtc-soneium", text: true },
                { source: "stargate", target: "wbtc-berachain", text: true },

                { source: "unit", target: "ubtc", text: true },
            ]
        };
    }
}
