const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

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
            return null;
        } catch (error) {
            console.error('Error fetching ERC20 balance:', error);
            return null;
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
    // Generic ERC20 token supply handler
    async handleERC20Supply(contractAddress, decimals = 8) {
        const supply = await BlockchainUtils.getERC20TotalSupply(contractAddress);
        if (supply !== null) {
            const tokenSupply = supply / Math.pow(10, decimals);
            return formatNumber(tokenSupply);
        }
        return 'Loading...';
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
            return 'Loading...';
        } catch (error) {
            console.error(`Error fetching ${tokenMint} supply:`, error);
            return 'Error';
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
            return 'Loading...';
        } catch (error) {
            console.error(`Error fetching ${denom} supply:`, error);
            return 'Error';
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
            return 'Loading...';
        } catch (error) {
            console.error(`Error fetching ${tokenAccount} balance:`, error);
            return 'Error';
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
            return '~19.5M+';
        } catch (error) {
            console.error('Error fetching Bitcoin supply:', error);
            return 'Error';
        }
    },

    // Babylon staking handler
    async handleBabylonStaking() {
        try {
            const response = await fetch('https://babylon-api.polkachu.com/babylon/btcstaking/v1/btc_delegations/ACTIVE');
            
            if (response.ok) {
                const data = await response.json();
                if (data.btc_delegations && Array.isArray(data.btc_delegations)) {
                    const totalSats = data.btc_delegations.reduce((sum, delegation) => {
                        const stakedAmountSats = parseInt(delegation.total_sat) || 0;
                        return sum + stakedAmountSats;
                    }, 0);
                    
                    const stakedAmount = totalSats / 100000000;
                    return formatNumber(stakedAmount);
                }
                return '0.00';
            }
            return 'Error';
        } catch (error) {
            console.error('Error fetching Babylon staking data:', error);
            return 'Error';
        }
    },

    // WBTC balance handler
    async handleWBTCBalance(walletAddress) {
        const balance = await BlockchainUtils.getERC20Balance(
            '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // WBTC contract address
            walletAddress
        );
        if (balance !== null) {
            const wbtcBalance = balance / 100000000; // WBTC has 8 decimals
            return formatNumber(wbtcBalance);
        }
        return 'Loading...';
    }
};

// Route to query link labels
app.post('/api/link-label', async (req, res) => {
    try {
        const { source, target } = req.body;
        
        let label = null;
        
        // Determine label based on source/target combination
        const sourceId = typeof source === 'object' ? source.id : source;
        const targetId = typeof target === 'object' ? target.id : target;
        
        // Bitcoin supply (bitcoin -> btc)
        if (sourceId === 'bitcoin' && targetId === 'btc') {
            label = await TokenHandlers.handleBitcoinSupply();
        }
        // WBTC supply (bitgo -> wbtc-eth)
        else if (sourceId === 'bitgo' && targetId === 'wbtc-eth') {
            label = await TokenHandlers.handleERC20Supply(
                '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
            );
        }
        // WBTC supply (bitgo -> wbtc-osmosis)
        else if (sourceId === 'bitgo' && targetId === 'wbtc-osmosis') {
            label = await TokenHandlers.handleCosmosSupply(
                'factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc',
                8
            );
        }
        // WBTC supply (bitgo -> wbtc-solana)
        else if (sourceId === 'bitgo' && targetId === 'wbtc-solana') {
            label = await TokenHandlers.handleSolanaSupply(
                '5XZw2LKTyrfvfiskJ78AMpackRjPcyCif1WhUsPDuVqQ'
            );
        }
        // cbBTC supply (coinbase -> cbbtc)
        else if (sourceId === 'coinbase' && targetId === 'cbbtc') {
            label = await TokenHandlers.handleERC20Supply(
                '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf'
            );
        }
        // tBTC supply (btc -> tbtc)
        else if (sourceId === 'btc' && targetId === 'tbtc') {
            label = await TokenHandlers.handleERC20Supply(
                '0x18084fba666a33d37592fa2633fd49a74dd93a88',
                18
            );
        }
        // FBTC supply (fbtc -> solvbtc)
        else if (sourceId === 'fbtc' && targetId === 'solvbtc') {
            label = await TokenHandlers.handleERC20Supply(
                '0xc96de26018a54d51c097160568752c4e3bd6c364'
            );
        }
        // FBTC supply (function -> fbtc)
        else if (sourceId === 'function' && targetId === 'fbtc') {
            label = await TokenHandlers.handleERC20Supply(
                '0xc96de26018a54d51c097160568752c4e3bd6c364'
            );
        }
        else if (sourceId === 'solvbtc' && targetId === 'solvbtc-eth') {
            label = await TokenHandlers.handleERC20Supply(
                '0x7a56e1c57c7475ccf742a1832b028f0456652f97',
                18
            );
        }
        // WBTC balance (wbtc-eth -> axelar)
        else if (sourceId === 'wbtc-eth' && targetId === 'axelar') {
            label = await TokenHandlers.handleWBTCBalance('0x4F4495243837681061C4743b74B3eEdf548D56A5');
        }
        else if (sourceId === 'wbtc-eth' && targetId === 'portal-bridge') {
            label = await TokenHandlers.handleWBTCBalance('0x3ee18B2214AFF97000D974cf647E7C347E8fa585');
        }
        // WBTC balance (wbtc-eth -> aave)
        else if (sourceId === 'wbtc-eth' && targetId === 'aave') {
            label = await TokenHandlers.handleWBTCBalance('0x5Ee5bf7ae06D1Be5997A1A72006FE6C607eC6DE8');
        }
        // WBTC balance (wbtc-eth -> morpho)
        else if (sourceId === 'wbtc-eth' && targetId === 'morpho') {
            label = await TokenHandlers.handleWBTCBalance('0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb');
        }
        // WBTC balance (wbtc-eth -> compound)
        else if (sourceId === 'wbtc-eth' && targetId === 'compound') {
            label = await TokenHandlers.handleWBTCBalance('0xc3d688B66703497DAA19211EEdff47f25384cdc3');
        }
        // IBC supply (axelar -> wbtc-eth-axl)
        else if (sourceId === 'axelar' && targetId === 'wbtc-eth-axl') {
            label = await TokenHandlers.handleCosmosSupply(
                'ibc/D1542AA8762DB13087D8364F3EA6509FD6F009A34F00426AF9E4F9FA85CBBF1F',
                8
            );
        }
        // WBTC supply on Solana via Axelar (portal-bridge -> wbtc-axl-solana)
        else if (sourceId === 'portal-bridge' && targetId === 'wbtc-axl-solana') {
            label = await TokenHandlers.handleSolanaSupply(
                '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh'
            );
        }
        // WBTC balance on Jupiter Perps account (wbtc-axl-solana -> jupiter-perps)
        else if (sourceId === 'wbtc-axl-solana' && targetId === 'jupiter-perps') {
            label = await TokenHandlers.handleSolanaBalance(
                'FgpXg2J3TzSs7w3WGYYE7aWePdrxBVLCXSxmAKnCZNtZ'
            );
        }
        // Babylon staking (btc -> babylon)
        else if (sourceId === 'btc' && targetId === 'babylon') {
            label = await TokenHandlers.handleBabylonStaking();
        }
        // Osmosis routes
        else if (sourceId === 'internet-computer' && targetId === 'ckbtc-osmosis') {
            label = await TokenHandlers.handleCosmosSupply(
                'factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-icrc-ckBTC',
                8
            );
        }
        else if (sourceId === 'nomic' && targetId === 'nbtc') {
            label = await TokenHandlers.handleCosmosSupply(
                'ibc/75345531D87BD90BF108BE7240BD721CB2CB0A1F16D4EBA71B09EC3C43E15C8F',
                14
            );
        }
        else if (sourceId === 'allbtc-issuer' && targetId === 'allbtc') {
            label = await TokenHandlers.handleCosmosSupply(
                'factory/osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3/alloyed/allBTC',
                8
            );
        }
        // Default case
        else {
            label = null;
        }
        
        res.json({ success: true, label });
        
    } catch (error) {
        console.error('Error querying link label:', error);
        res.status(500).json({ success: false, error: 'Failed to query link label' });
    }
});

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Open your browser and navigate to http://localhost:${PORT}`);
});
