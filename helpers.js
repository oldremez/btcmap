const fetch = require('node-fetch');

// Blockchain utility functions moved from frontend
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
            throw new Error('Invalid response from RPC endpoint');
        } catch (error) {
            console.error('Error fetching ERC20 supply:', error);
            throw new Error(`Failed to fetch ERC20 supply: ${error.message}`);
        }
    },

    // Query ERC20 balance for a specific address
    async getERC20Balance(contractAddress, walletAddress, rpcUrl = 'https://eth.llamarpc.com') {
        try {
            const balanceOfSignature = '0x70a08231';
            const paddedAddress = '000000000000000000000000' + walletAddress.slice(2);
            
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
            throw new Error('Invalid response from RPC endpoint');
        } catch (error) {
            console.error('Error fetching ERC20 balance:', error);
            throw new Error(`Failed to fetch ERC20 balance: ${error.message}`);
        }
    }
};

// Generic token supply handlers
// Utility function for consistent number formatting
const formatNumber = (number) => {
    if (number === null || number === undefined || isNaN(number)) {
        return 'Error';
    }
    return Number(number).toFixed(2);
};

const TokenHandlers = {
    // Chain RPC URL mapping
    chainRpcUrls: {
        'ethereum': 'https://eth.llamarpc.com',
        'base': 'https://mainnet.base.org',
        'bsc': 'https://bsc-dataseed1.binance.org',
        'arbitrum': 'https://arb1.arbitrum.io/rpc',
        'polygon': 'https://polygon-rpc.com',
        'optimism': 'https://mainnet.optimism.io',
        'sonic': 'https://sonic.drpc.org',
        'katana': 'https://rpc.katana.network',
        'kava': 'https://evm.kava.io',
        'avalanche': 'https://api.avax.network/ext/bc/C/rpc',
        'mantle': 'https://rpc.mantle.xyz',
        'bob': 'https://rpc.gobob.xyz/',
        'linea': 'https://rpc.linea.build',
        'rootstock': 'https://public-node.rsk.co',
        'soneium': 'https://rpc.soneium.org/',
        'inkonchain': 'https://rpc.inkonchain.com',
        'bera': 'https://rpc.berachain.com',
        'hyperevm': 'https://hyperliquid.drpc.org',
        'ink': 'https://ink.drpc.org/',
        'merlin': 'https://merlin.drpc.org/',
        'unichain': 'https://unichain-rpc.publicnode.com'
    },

    // Generic ERC20 token supply handler
    async handleERC20Supply(contractAddress, decimals = 8, chainName = 'ethereum') {
        try {
            const rpcUrl = this.chainRpcUrls[chainName] || this.chainRpcUrls['ethereum'];
            const supply = await BlockchainUtils.getERC20TotalSupply(contractAddress, rpcUrl);
            const tokenSupply = supply / Math.pow(10, decimals);
            return formatNumber(tokenSupply);
        } catch (error) {
            console.error('Error in handleERC20Supply:', error);
            throw error;
        }
    },

    // Sui token supply handler
    async handleSuiSupply(coinType) {
        try {
            const response = await fetch('https://sui-rpc.publicnode.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'suix_getCoinMetadata',
                    params: [coinType],
                    id: 1
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.result && data.result.total_supply) {
                    const supply = parseInt(data.result.total_supply);
                    const decimals = data.result.decimals || 8;
                    const tokenSupply = supply / Math.pow(10, decimals);
                    return formatNumber(tokenSupply);
                }
            }
            throw new Error('Invalid response from Sui RPC endpoint');
        } catch (error) {
            console.error('Error fetching Sui token supply:', error);
            throw new Error(`Failed to fetch Sui token supply: ${error.message}`);
        }
    },

    // Generic Solana token supply handler
    async handleSolanaSupply(tokenMint) {
        try {
            const response = await fetch('https://api.mainnet-beta.solana.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'getTokenSupply',
                    params: [tokenMint],
                    id: 1
                })
            });
            
            const data = await response.json();
            if (data.result && data.result.value) {
                const supply = data.result.value.amount;
                const decimals = data.result.value.decimals;
                const tokenSupply = supply / Math.pow(10, decimals);
                return formatNumber(tokenSupply);
            }
            throw new Error('Invalid response from Solana RPC endpoint');
        } catch (error) {
            console.error(`Error fetching ${tokenMint} supply:`, error);
            throw new Error(`Failed to fetch Solana token supply: ${error.message}`);
        }
    },

    // Generic Cosmos/IBC token supply handler
    async handleCosmosSupply(denom, decimals = 6) {
        try {
            const endpoint = `https://lcd.osmosis.zone/cosmos/bank/v1beta1/supply/by_denom?denom=${encodeURIComponent(denom)}`;
            const response = await fetch(endpoint);
            if (response.ok) {
                const data = await response.json();
                if (data.amount && data.amount.amount) {
                    const supply = parseInt(data.amount.amount);
                    const tokenSupply = supply / Math.pow(10, decimals);
                    return formatNumber(tokenSupply);
                }
            }
            throw new Error('Invalid response from Cosmos LCD endpoint');
        } catch (error) {
            console.error(`Error fetching ${denom} supply:`, error);
            throw new Error(`Failed to fetch Cosmos token supply: ${error.message}`);
        }
    },

    // Generic Cosmos/IBC token balance handler for a specific address
    async handleCosmosBalance(denom, address, decimals = 6) {
        try {
            const endpoint = `https://lcd.osmosis.zone/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=${encodeURIComponent(denom)}`;
            const response = await fetch(endpoint);
            if (response.ok) {
                const data = await response.json();
                if (data.balance && data.balance.amount) {
                    const balance = parseInt(data.balance.amount);
                    const tokenBalance = balance / Math.pow(10, decimals);
                    return formatNumber(tokenBalance);
                }
            }
            throw new Error('Invalid response from Cosmos LCD endpoint');
        } catch (error) {
            console.error(`Error fetching ${denom} balance for ${address}:`, error);
            throw new Error(`Failed to fetch Cosmos token balance: ${error.message}`);
        }
    },

    // Generic Solana token balance handler
    async handleSolanaBalance(tokenAccount) {
        try {
            const response = await fetch('https://api.mainnet-beta.solana.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'getTokenAccountBalance',
                    params: [tokenAccount],
                    id: 1
                })
            });
            
            const data = await response.json();
            if (data.result && data.result.value) {
                const balance = data.result.value.amount;
                const decimals = data.result.value.decimals;
                const tokenBalance = balance / Math.pow(10, decimals);
                return formatNumber(tokenBalance);
            }
            throw new Error('Invalid response from Solana RPC endpoint');
        } catch (error) {
            console.error(`Error fetching ${tokenAccount} balance:`, error);
            throw new Error(`Failed to fetch Solana token balance: ${error.message}`);
        }
    },

    // Generic ERC20 token balance handler
    async handleERC20Balance(contractAddress, walletAddress, decimals = 18, chainName = 'ethereum') {
        try {
            const rpcUrl = this.chainRpcUrls[chainName] || this.chainRpcUrls['ethereum'];
            const balance = await BlockchainUtils.getERC20Balance(contractAddress, walletAddress, rpcUrl);
            const tokenBalance = balance / Math.pow(10, decimals);
            return formatNumber(tokenBalance);
        } catch (error) {
            console.error('Error in handleERC20Balance:', error);
            throw error;
        }
    },

    // Bitcoin supply handler
    async handleBitcoinSupply() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true');
            const data = await response.json();
            
            if (data.bitcoin && data.bitcoin.usd) {
                const btcPrice = data.bitcoin.usd;
                const btcMarketCap = data.bitcoin.usd_market_cap;
                const approximateSupply = Math.round(btcMarketCap / btcPrice);
                return formatNumber(approximateSupply);
            }
            throw new Error('Invalid response from CoinGecko API');
        } catch (error) {
            console.error('Error fetching Bitcoin supply:', error);
            throw new Error(`Failed to fetch Bitcoin supply: ${error.message}`);
        }
    },

    // Babylon staking handler
    async handleBabylonStaking() {
        try {
            const response = await fetch('https://staking-api.babylonlabs.io/v2/stats');
            
            if (response.ok) {
                const data = await response.json();
                if (data.data && data.data.total_active_tvl) {
                    const totalTvlSats = parseInt(data.data.total_active_tvl);
                    const totalTvlBTC = totalTvlSats / Math.pow(10, 8); // Convert from satoshis to BTC
                    return formatNumber(totalTvlBTC);
                }
                throw new Error('Invalid response structure from Babylon API');
            }
            throw new Error(`HTTP error from Babylon API: ${response.status}`);
        } catch (error) {
            console.error('Error fetching Babylon staking data:', error);
            throw new Error(`Failed to fetch Babylon staking data: ${error.message}`);
        }
    },

    // Lombard reserves handler
    async handleLombardReserves() {
        try {
            const response = await fetch('https://bff.prod.lombard.finance/dune-api/btc-total-reserves');
            
            if (response.ok) {
                const data = await response.text();
                const reserves = parseFloat(data);
                if (!isNaN(reserves)) {
                    return formatNumber(reserves);
                }
                throw new Error('Invalid numeric response from Lombard API');
            }
            throw new Error(`HTTP error from Lombard API: ${response.status}`);
        } catch (error) {
            console.error('Error fetching Lombard reserves:', error);
            throw new Error(`Failed to fetch Lombard reserves: ${error.message}`);
        }
    },

    // rBTC supply handler for Rootstock
    async handleRBTCSupply() {
        try {
            const response = await fetch('https://be.explorer.rootstock.io/circulating');
            
            if (response.ok) {
                const data = await response.json();
                if (data.circulatingSupply) {
                    const supply = parseFloat(data.circulatingSupply);
                    if (!isNaN(supply)) {
                        return formatNumber(supply);
                    }
                }
                throw new Error('Invalid response structure from Rootstock API');
            }
            throw new Error(`HTTP error from Rootstock API: ${response.status}`);
        } catch (error) {
            console.error('Error fetching rBTC supply:', error);
            throw new Error(`Failed to fetch rBTC supply: ${error.message}`);
        }
    },

    // WBTC balance handler
    async handleWBTCBalance(walletAddress) {
        return this.handleERC20Balance(
            '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // WBTC contract address
            walletAddress,
            8 // WBTC has 8 decimals
        );
    },

    // WBTC balance handler for multiple addresses (sums all balances)
    async handleWBTCBalanceMultiple(walletAddresses) {
        if (!Array.isArray(walletAddresses)) {
            walletAddresses = [walletAddresses];
        }
        
        try {
            const balances = await Promise.all(
                walletAddresses.map(address => 
                    this.handleERC20Balance(
                        '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // WBTC contract address
                        address,
                        8 // WBTC has 8 decimals
                    )
                )
            );
            
            // Sum all valid balances
            let totalBalance = 0;
            for (const balance of balances) {
                if (balance !== 'Loading...' && balance !== 'Error') {
                    totalBalance += parseFloat(balance);
                }
            }
            
            return formatNumber(totalBalance);
        } catch (error) {
            console.error('Error fetching multiple WBTC balances:', error);
            throw new Error(`Failed to fetch multiple WBTC balances: ${error.message}`);
        }
    },

    // ckBTC supply handler for Internet Computer
    async handleCkBTCSupply() {
        try {
            const response = await fetch('https://icrc-api.internetcomputer.org/api/v1/ledgers/mxzaz-hqaaa-aaaar-qaada-cai/total-supply');
            
            if (response.ok) {
                const data = await response.json();
                if (data.data && data.data.length > 0 && data.data[0].length > 1) {
                    const supply = parseInt(data.data[0][1]);
                    const tokenSupply = supply / Math.pow(10, 8); // ckBTC has 8 decimals
                    return formatNumber(tokenSupply);
                }
            }
            throw new Error('Invalid response from Internet Computer API');
        } catch (error) {
            console.error('Error fetching ckBTC supply:', error);
            throw new Error(`Failed to fetch ckBTC supply: ${error.message}`);
        }
    },

    // UBTC supply handler for HyperEVM
    async handleUBTCSupply() {
        try {
            const contractAddress = '0x9fdbda0a5e284c32744d2f17ee5c74b284993463';
            const excludedAddress = '0x20000000000000000000000000000000000000c5';
            const decimals = 8; // Assuming UBTC has 8 decimals like most BTC-pegged tokens
            
            // Get total supply
            const totalSupply = await BlockchainUtils.getERC20TotalSupply(contractAddress, this.chainRpcUrls['hyperevm']);
            
            // Get balance of excluded address
            const excludedBalance = await BlockchainUtils.getERC20Balance(contractAddress, excludedAddress, this.chainRpcUrls['hyperevm']);
            
            // Calculate circulating supply (total supply minus excluded balance)
            const circulatingSupply = totalSupply - excludedBalance;
            const tokenCirculatingSupply = circulatingSupply / Math.pow(10, decimals);
            
            return formatNumber(tokenCirculatingSupply);
        } catch (error) {
            console.error('Error fetching UBTC supply:', error);
            throw new Error(`Failed to fetch UBTC supply: ${error.message}`);
        }
    }
};

module.exports = {
    BlockchainUtils,
    TokenHandlers
};
