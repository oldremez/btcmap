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
            nodes: [
                // Central Bitcoin nodes
                { id: "btc-000", name: "BTC 000", group: 1, size: 30, type: "central", x: 400, y: 400 },
                { id: "bitcoin-001", name: "Bitcoin 001", group: 1, size: 25, type: "central", x: 300, y: 600 },
                
                // Major Bridge Protocols
                { id: "babylon-002", name: "Babylon 002", group: 2, size: 22, type: "bridge", x: 250, y: 300 },
                { id: "bitgo-003", name: "BitGo 003", group: 2, size: 22, type: "bridge", x: 550, y: 300 },
                { id: "wbtc-eth-004", name: "WBTC (Ethereum) 004", group: 2, size: 22, type: "bridge", x: 550, y: 200 },
                { id: "coinbase-005", name: "Coinbase 005", group: 2, size: 22, type: "bridge", x: 600, y: 500 },
                { id: "ethereum-006", name: "Ethereum 006", group: 2, size: 22, type: "bridge", x: 200, y: 200 },
                { id: "lido-007", name: "Lido 007", group: 2, size: 22, type: "bridge", x: 200, y: 100 },
                
                // Wrapped BTC Tokens
                { id: "ebtc-009", name: "eBTC 009", group: 3, size: 20, type: "wrapped", x: 100, y: 50 },
                { id: "cbbtc-010", name: "cbBTC 010", group: 3, size: 20, type: "wrapped", x: 700, y: 400 },
                { id: "tbtc-011", name: "tBTC 011", group: 3, size: 20, type: "wrapped", x: 650, y: 350 },
                { id: "solvbtc-012", name: "SolvBTC 012", group: 3, size: 20, type: "wrapped", x: 800, y: 200 },
                { id: "fbtc-013", name: "FBTC 013", group: 3, size: 20, type: "wrapped", x: 750, y: 500 },
                { id: "btcn-014", name: "BTCN 014", group: 3, size: 20, type: "wrapped", x: 900, y: 250 },
                { id: "lbtc-016", name: "LBTC 016", group: 3, size: 20, type: "wrapped", x: 200, y: 250 },
                { id: "pumpbtc-018", name: "pumpBTC 018", group: 3, size: 20, type: "wrapped", x: 350, y: 150 },
                { id: "unibtc-020", name: "uniBTC 020", group: 3, size: 20, type: "wrapped", x: 450, y: 150 },
                { id: "wbtc-osmosis-021", name: "WBTC (Osmosis) 021", group: 3, size: 20, type: "wrapped", x: 800, y: 600 },
                { id: "nomic-022", name: "Nomic 022", group: 3, size: 20, type: "wrapped", x: 650, y: 650 },
                { id: "allbtc-023", name: "allBTC 023", group: 3, size: 20, type: "wrapped", x: 950, y: 650 },
                { id: "persistence-024", name: "Persistence 024", group: 3, size: 20, type: "wrapped", x: 200, y: 400 },
                { id: "ybtc-025", name: "yBTC 025", group: 3, size: 20, type: "wrapped", x: 50, y: 400 },
                { id: "axelar-026", name: "Axelar 026", group: 3, size: 20, type: "wrapped", x: 800, y: 350 },
                { id: "internet-computer-027", name: "Internet Computer 027", group: 3, size: 20, type: "wrapped", x: 650, y: 700 },
                { id: "ckbtc-osmosis-028", name: "ckBTC (Osmosis) 028", group: 3, size: 20, type: "wrapped", x: 800, y: 750 },
                { id: "nbtc-029", name: "nBTC 029", group: 3, size: 20, type: "wrapped", x: 800, y: 600 },
                { id: "allbtc-030", name: "allBTC 030", group: 3, size: 20, type: "wrapped", x: 1100, y: 600 },
                { id: "pendle-031", name: "Pendle 031", group: 3, size: 20, type: "wrapped", x: 500, y: 50 },
                { id: "solvbtc-bbn-032", name: "SolvBTC.BBN 032", group: 3, size: 20, type: "wrapped", x: 500, y: 100 },
                { id: "dolomite-033", name: "Dolomite 033", group: 3, size: 20, type: "wrapped", x: 750, y: 50 },
                { id: "dbtc-034", name: "dBTC 034", group: 3, size: 20, type: "wrapped", x: 650, y: 50 },
                { id: "corn-035", name: "Corn 035", group: 3, size: 20, type: "wrapped", x: 350, y: 50 },
                { id: "zerolend-036", name: "Zerolend 036", group: 3, size: 20, type: "wrapped", x: 150, y: 50 },
                { id: "symbiotic-037", name: "Symbiotic 037", group: 3, size: 20, type: "wrapped", x: 1000, y: 250 },
                
                // Special nodes
                { id: "stbtc-lorenzo", name: "stBTC (Lorenzo)", group: 4, size: 18, type: "special", x: 150, y: 300 },
                { id: "enzobtc-lorenzo", name: "enzoBTC (Lorenzo)", group: 4, size: 18, type: "special", x: 50, y: 550 },
                { id: "renbtc", name: "renBTC", group: 4, size: 18, type: "special", x: 650, y: 800 },
                { id: "wbtc-arbitrum", name: "WBTC (Arbitrum)", group: 4, size: 18, type: "special", x: 850, y: 100 },
                { id: "wbtc-eth-axl", name: "WBTC.eth.axl 026", group: 4, size: 18, type: "special", x: 800, y: 550 }
            ],
            links: [
                // Central connections
                { source: "bitcoin-001", target: "btc-000", value: 3, type: "central", text: "Core" },
                
                // Bridge connections from BTC
                { source: "btc-000", target: "babylon-002", value: 2, type: "bridge", text: "Babylon Bridge" },
                { source: "btc-000", target: "bitgo-003", value: 2, type: "bridge", text: null },
                { source: "btc-000", target: "coinbase-005", value: 2, type: "bridge", text: null },
                { source: "btc-000", target: "internet-computer-027", value: 2, type: "bridge", text: null },
                { source: "btc-000", target: "nomic-022", value: 2, type: "bridge", text: null },
                { source: "btc-000", target: "enzobtc-lorenzo", value: 2, type: "bridge", text: null },
                { source: "btc-000", target: "renbtc", value: 2, type: "bridge", text: null },
                
                // Bridge to wrapped tokens
                { source: "babylon-002", target: "lbtc-016", value: 1, type: "bridge", text: null },
                { source: "babylon-002", target: "pumpbtc-018", value: 1, type: "bridge", text: null },
                { source: "babylon-002", target: "unibtc-020", value: 1, type: "bridge", text: null },
                { source: "babylon-002", target: "persistence-024", value: 1, type: "bridge", text: null },
                { source: "babylon-002", target: "solvbtc-bbn-032", value: 1, type: "bridge", text: null },
                { source: "babylon-002", target: "stbtc-lorenzo", value: 1, type: "bridge", text: null },
                
                { source: "bitgo-003", target: "wbtc-eth-004", value: 1, type: "bridge", text: async (link) => {
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
                { source: "bitgo-003", target: "wbtc-osmosis-021", value: 1, type: "bridge", text: null },
                { source: "bitgo-003", target: "wbtc-arbitrum", value: 1, type: "bridge", text: null },
                
                { source: "coinbase-005", target: "tbtc-011", value: 1, type: "bridge", text: null },
                
                // Ethereum ecosystem
                { source: "ethereum-006", target: "lido-007", value: 1, type: "ecosystem", text: null },
                { source: "lido-007", target: "ebtc-009", value: 1, type: "ecosystem", text: null },
                { source: "wbtc-eth-004", target: "solvbtc-012", value: 1, type: "ecosystem", text: null },
                { source: "wbtc-eth-004", target: "axelar-026", value: 1, type: "ecosystem", text: null },
                { source: "wbtc-eth-004", target: "symbiotic-037", value: 1, type: "ecosystem", text: null },
                
                // Cross-chain connections
                { source: "tbtc-011", target: "solvbtc-012", value: 1, type: "cross-chain", text: null },
                { source: "cbbtc-010", target: "solvbtc-012", value: 1, type: "cross-chain", text: null },
                { source: "fbtc-013", target: "solvbtc-012", value: 1, type: "cross-chain", text: null },
                { source: "cbbtc-010", target: "btcn-014", value: 1, type: "cross-chain", text: null },
                { source: "wbtc-eth-004", target: "btcn-014", value: 1, type: "cross-chain", text: null },
                
                // Osmosis ecosystem
                { source: "wbtc-osmosis-021", target: "allbtc-023", value: 1, type: "ecosystem", text: null },
                { source: "internet-computer-027", target: "ckbtc-osmosis-028", value: 1, type: "ecosystem", text: null },
                { source: "ckbtc-osmosis-028", target: "allbtc-023", value: 1, type: "ecosystem", text: null },
                { source: "nbtc-029", target: "allbtc-023", value: 1, type: "ecosystem", text: null },
                { source: "allbtc-023", target: "allbtc-030", value: 1, type: "ecosystem", text: null },
                
                // Axelar bridge
                { source: "axelar-026", target: "wbtc-eth-axl", value: 1, type: "bridge", text: null },
                { source: "wbtc-eth-axl", target: "allbtc-023", value: 1, type: "bridge", text: null },
                
                // DeFi connections
                { source: "lbtc-016", target: "pendle-031", value: 1, type: "defi", text: null },
                { source: "ebtc-009", target: "pendle-031", value: 1, type: "defi", text: null },
                { source: "pumpbtc-018", target: "pendle-031", value: 1, type: "defi", text: null },
                { source: "unibtc-020", target: "pendle-031", value: 1, type: "defi", text: null },
                { source: "solvbtc-bbn-032", target: "pendle-031", value: 1, type: "defi", text: null },
                { source: "stbtc-lorenzo", target: "pendle-031", value: 1, type: "defi", text: null },
                
                // Zerolend connections
                { source: "ebtc-009", target: "zerolend-036", value: 1, type: "defi", text: null },
                { source: "zerolend-036", target: "pendle-031", value: 1, type: "defi", text: null },
                
                // Corn connections
                { source: "ebtc-009", target: "corn-035", value: 1, type: "defi", text: null },
                { source: "pumpbtc-018", target: "corn-035", value: 1, type: "defi", text: null },
                { source: "unibtc-020", target: "corn-035", value: 1, type: "defi", text: null },
                { source: "lbtc-016", target: "corn-035", value: 1, type: "defi", text: null },
                { source: "solvbtc-bbn-032", target: "corn-035", value: 1, type: "defi", text: null },
                { source: "corn-035", target: "pendle-031", value: 1, type: "defi", text: null },
                { source: "zerolend-036", target: "pendle-031", value: 1, type: "defi", text: null },
                
                // Nomic to BTCN (dashed connection)
                { source: "corn-035", target: "btcn-014", value: 1, type: "dashed", text: null },
                { source: "solvbtc-bbn-032", target: "solvbtc-012", value: 1, type: "dashed", text: null },
                
                // Weighted connections (with specific values)
                { source: "btc-000", target: "tbtc-011", value: 5, type: "weighted", text: (link) => `High Value: ${link.value}` },
                { source: "wbtc-eth-004", target: "symbiotic-037", value: 14, type: "weighted", text: (link) => `Max Value: ${link.value}` },
                { source: "tbtc-011", target: "symbiotic-037", value: 7.3, type: "weighted", text: (link) => `${link.type}: ${link.value}` },
                { source: "lbtc-016", target: "symbiotic-037", value: 16.5, type: "defi", text: null },
                { source: "pumpbtc-018", target: "symbiotic-037", value: 16.5, type: "defi", text: null },
                
                // Additional connections
                { source: "persistence-024", target: "ybtc-025", value: 1, type: "bridge", text: null },
                { source: "dbtc-034", target: "dolomite-033", value: 1, type: "bridge", text: null },
                { source: "wbtc-arbitrum", target: "dolomite-033", value: 1, type: "bridge", text: null },
                { source: "dolomite-033", target: "dbtc-034", value: 1, type: "bridge", text: null },
                { source: "solvbtc-bbn-032", target: "dolomite-033", value: 1, type: "bridge", text: null }
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
            links: []
        };
    }
}
