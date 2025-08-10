// Bitcoin Liquidity Map - Graph data definitions
// Link text property can be:
// - null/undefined: No text displayed
// - string: Static text displayed
// - function: Custom function that returns text (receives link object as parameter)
// - async function: Async function that can query external data (blockchain, APIs, etc.)

// Utility functions for blockchain data
const BlockchainUtils = {
    // Query ERC20 total supply
    async getERC20TotalSupply(contractAddress, rpcUrl = 'https://eth.llamarpc.com') {
        try {
            const totalSupplySignature = '0x18160ddd';
            const response = await fetch(rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_call',
                    params: [{
                        to: contractAddress,
                        data: totalSupplySignature
                    }, 'latest'],
                    id: 1
                })
            });
            
            const data = await response.json();
            if (data.result) {
                return parseInt(data.result, 16);
            }
            return null;
        } catch (error) {
            console.error('Error fetching ERC20 supply:', error);
            return null;
        }
    },

    // Query ERC20 balance for a specific address
    async getERC20Balance(contractAddress, walletAddress, rpcUrl = 'https://eth.llamarpc.com') {
        try {
            const balanceOfSignature = '0x70a08231';
            const paddedAddress = '0x000000000000000000000000' + walletAddress.slice(2);
            
            const response = await fetch(rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_call',
                    params: [{
                        to: contractAddress,
                        data: balanceOfSignature + paddedAddress
                    }, 'latest'],
                    id: 1
                })
            });
            
            const data = await response.json();
            if (data.result) {
                return parseInt(data.result, 16);
            }
            return null;
        } catch (error) {
            console.error('Error fetching ERC20 balance:', error);
            return null;
        }
    }
};

class GraphData {
    static getSampleGraph() {
        return {
            frames: [
                {
                    id: "ethereum-frame",
                    label: "Ethereum",
                    nodes: ["wbtc-eth", "tbtc", "ethereum", "lido", "ebtc", "solvbtc", "symbiotic", "btcn", "wbtc-arbitrum", "dolomite", "dbtc"],
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
                { id: "btc", name: "BTC", group: 1, size: 30, type: "central", x: 400, y: 400 },
                { id: "bitcoin", name: "Bitcoin", group: 1, size: 25, type: "central", x: 300, y: 600 },
                
                // Major Bridge Protocols
                { id: "babylon", name: "Babylon", group: 2, size: 22, type: "bridge", x: 250, y: 300 },
                { id: "bitgo", name: "BitGo", group: 2, size: 22, type: "bridge", x: 550, y: 300 },
                { id: "wbtc-eth", name: "WBTC (Ethereum)", group: 2, size: 22, type: "bridge", x: 550, y: 200 },
                { id: "coinbase", name: "Coinbase", group: 2, size: 22, type: "bridge", x: 600, y: 500 },
                { id: "ethereum", name: "Ethereum", group: 2, size: 22, type: "bridge", x: 200, y: 200 },
                { id: "lido", name: "Lido", group: 2, size: 22, type: "bridge", x: 200, y: 100 },
                
                // Wrapped BTC Tokens
                { id: "ebtc", name: "eBTC", group: 3, size: 20, type: "wrapped", x: 100, y: 50 },
                { id: "cbbtc", name: "cbBTC", group: 3, size: 20, type: "wrapped", x: 700, y: 400 },
                { id: "tbtc", name: "tBTC", group: 3, size: 20, type: "wrapped", x: 650, y: 350 },
                { id: "solvbtc", name: "SolvBTC", group: 3, size: 20, type: "wrapped", x: 800, y: 200 },
                { id: "fbtc", name: "FBTC", group: 3, size: 20, type: "wrapped", x: 750, y: 500 },
                { id: "btcn", name: "BTCN", group: 3, size: 20, type: "wrapped", x: 900, y: 250 },
                { id: "lbtc", name: "LBTC", group: 3, size: 20, type: "wrapped", x: 200, y: 250 },
                { id: "pumpbtc", name: "pumpBTC", group: 3, size: 20, type: "wrapped", x: 350, y: 150 },
                { id: "unibtc", name: "uniBTC", group: 3, size: 20, type: "wrapped", x: 450, y: 150 },
                { id: "wbtc-osmosis", name: "WBTC (Osmosis)", group: 3, size: 20, type: "wrapped", x: 800, y: 600 },
                { id: "nomic", name: "Nomic", group: 3, size: 20, type: "wrapped", x: 650, y: 650 },
                { id: "allbtc", name: "allBTC", group: 3, size: 20, type: "wrapped", x: 950, y: 650 },
                { id: "persistence", name: "Persistence", group: 3, size: 20, type: "wrapped", x: 200, y: 400 },
                { id: "ybtc", name: "yBTC", group: 3, size: 20, type: "wrapped", x: 50, y: 400 },
                { id: "axelar", name: "Axelar", group: 3, size: 20, type: "wrapped", x: 800, y: 450 },
                { id: "internet-computer", name: "Internet Computer", group: 3, size: 20, type: "wrapped", x: 650, y: 700 },
                { id: "ckbtc-osmosis", name: "ckBTC (Osmosis)", group: 3, size: 20, type: "wrapped", x: 800, y: 750 },
                { id: "nbtc", name: "nBTC", group: 3, size: 20, type: "wrapped", x: 800, y: 600 },
                { id: "pendle", name: "Pendle", group: 3, size: 20, type: "wrapped", x: 500, y: 50 },
                { id: "solvbtc-bbn", name: "SolvBTC.BBN", group: 3, size: 20, type: "wrapped", x: 500, y: 100 },
                { id: "dolomite", name: "Dolomite", group: 3, size: 20, type: "wrapped", x: 750, y: 50 },
                { id: "dbtc", name: "dBTC", group: 3, size: 20, type: "wrapped", x: 650, y: 50 },
                { id: "corn", name: "Corn", group: 3, size: 20, type: "wrapped", x: 350, y: 50 },
                { id: "zerolend", name: "Zerolend", group: 3, size: 20, type: "wrapped", x: 150, y: 50 },
                { id: "symbiotic", name: "Symbiotic", group: 3, size: 20, type: "wrapped", x: 1000, y: 250 },
                
                // Special nodes
                { id: "stbtc-lorenzo", name: "stBTC (Lorenzo)", group: 4, size: 18, type: "special", x: 150, y: 300 },
                { id: "enzobtc-lorenzo", name: "enzoBTC (Lorenzo)", group: 4, size: 18, type: "special", x: 50, y: 550 },
                { id: "renbtc", name: "renBTC", group: 4, size: 18, type: "special", x: 650, y: 800 },
                { id: "wbtc-arbitrum", name: "WBTC (Arbitrum)", group: 4, size: 18, type: "special", x: 850, y: 100 },
                { id: "wbtc-eth-axl", name: "WBTC.eth.axl", group: 4, size: 18, type: "special", x: 800, y: 550 }
            ],
            links: [
                // Central connections
                { source: "bitcoin", target: "btc", value: 3, type: "central", text: "Core" },
                
                // Bridge connections from BTC
                { source: "btc", target: "babylon", value: 2, type: "bridge", text: "Babylon Bridge" },
                { source: "btc", target: "bitgo", value: 2, type: "bridge", text: null },
                { source: "btc", target: "coinbase", value: 2, type: "bridge", text: null },
                { source: "btc", target: "internet-computer", value: 2, type: "bridge", text: null },
                { source: "btc", target: "nomic", value: 2, type: "bridge", text: null },
                { source: "btc", target: "enzobtc-lorenzo", value: 2, type: "bridge", text: null },
                { source: "btc", target: "renbtc", value: 2, type: "bridge", text: null },
                
                // Bridge to wrapped tokens
                { source: "babylon", target: "lbtc", value: 1, type: "bridge", text: null },
                { source: "babylon", target: "pumpbtc", value: 1, type: "bridge", text: null },
                { source: "babylon", target: "unibtc", value: 1, type: "bridge", text: null },
                { source: "babylon", target: "persistence", value: 1, type: "bridge", text: null },
                { source: "babylon", target: "solvbtc-bbn", value: 1, type: "bridge", text: null },
                { source: "babylon", target: "stbtc-lorenzo", value: 1, type: "bridge", text: null },
                
                { source: "bitgo", target: "wbtc-eth", value: 1, type: "bridge", text: async (link) => {
                    try {
                        const wbtcAddress = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
                        const totalSupply = await BlockchainUtils.getERC20TotalSupply(wbtcAddress);
                        
                        if (totalSupply !== null) {
                            // WBTC has 8 decimals
                            const wbtcSupply = totalSupply / 100000000;
                            return `WBTC Supply: ${wbtcSupply.toLocaleString()}`;
                        }
                        
                        return 'WBTC Supply: Loading...';
                    } catch (error) {
                        console.error('Error fetching WBTC supply:', error);
                        return 'WBTC Supply: Error';
                    }
                }},
                { source: "bitgo", target: "wbtc-osmosis", value: 1, type: "bridge", text: null },
                { source: "bitgo", target: "wbtc-arbitrum", value: 1, type: "bridge", text: null },
                
                { source: "coinbase", target: "tbtc", value: 1, type: "bridge", text: null },
                
                // Ethereum ecosystem
                { source: "ethereum", target: "lido", value: 1, type: "ecosystem", text: null },
                { source: "lido", target: "ebtc", value: 1, type: "ecosystem", text: null },
                { source: "wbtc-eth", target: "solvbtc", value: 1, type: "ecosystem", text: null },
                { source: "wbtc-eth", target: "axelar", value: 1, type: "ecosystem", text: null },
                { source: "wbtc-eth", target: "symbiotic", value: 1, type: "ecosystem", text: null },
                
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
                { source: "axelar", target: "wbtc-eth-axl", value: 1, type: "bridge", text: null },
                { source: "wbtc-eth-axl", target: "allbtc", value: 1, type: "bridge", text: null },
                
                // DeFi connections
                { source: "lbtc", target: "pendle", value: 1, type: "defi", text: null },
                { source: "ebtc", target: "pendle", value: 1, type: "defi", text: null },
                { source: "pumpbtc", target: "pendle", value: 1, type: "defi", text: null },
                { source: "unibtc", target: "pendle", value: 1, type: "defi", text: null },
                { source: "solvbtc-bbn", target: "pendle", value: 1, type: "defi", text: null },
                { source: "stbtc-lorenzo", target: "pendle", value: 1, type: "defi", text: null },
                
                // Zerolend connections
                { source: "ebtc", target: "zerolend", value: 1, type: "defi", text: null },
                { source: "zerolend", target: "pendle", value: 1, type: "defi", text: null },
                
                // Corn connections
                { source: "ebtc", target: "corn", value: 1, type: "defi", text: null },
                { source: "pumpbtc", target: "corn", value: 1, type: "defi", text: null },
                { source: "unibtc", target: "corn", value: 1, type: "defi", text: null },
                { source: "lbtc", target: "corn", value: 1, type: "defi", text: null },
                { source: "solvbtc-bbn", target: "corn", value: 1, type: "defi", text: null },
                { source: "corn", target: "pendle", value: 1, type: "defi", text: null },
                { source: "zerolend", target: "pendle", value: 1, type: "defi", text: null },
                
                // Nomic to BTCN (dashed connection)
                { source: "corn", target: "btcn", value: 1, type: "dashed", text: null },
                { source: "solvbtc-bbn", target: "solvbtc", value: 1, type: "dashed", text: null },
                
                // Weighted connections (with specific values)
                { source: "btc", target: "tbtc", value: 5, type: "weighted", text: (link) => `High Value: ${link.value}` },
                { source: "wbtc-eth", target: "symbiotic", value: 14, type: "weighted", text: (link) => `Max Value: ${link.value}` },
                { source: "tbtc", target: "symbiotic", value: 7.3, type: "weighted", text: (link) => `${link.type}: ${link.value}` },
                { source: "lbtc", target: "symbiotic", value: 16.5, type: "defi", text: null },
                { source: "pumpbtc", target: "symbiotic", value: 16.5, type: "defi", text: null },
                
                // Additional connections
                { source: "persistence", target: "ybtc", value: 1, type: "bridge", text: null },
                { source: "dbtc", target: "dolomite", value: 1, type: "bridge", text: null },
                { source: "wbtc-arbitrum", target: "dolomite", value: 1, type: "bridge", text: null },
                { source: "dolomite", target: "dbtc", value: 1, type: "bridge", text: null },
                { source: "solvbtc-bbn", target: "dolomite", value: 1, type: "bridge", text: null }
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
