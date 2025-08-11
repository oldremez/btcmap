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
const TokenHandlers = {
    // Generic ERC20 token supply handler
    async handleERC20Supply(contractAddress, tokenName, decimals = 8) {
        const supply = await BlockchainUtils.getERC20TotalSupply(contractAddress);
        if (supply !== null) {
            const tokenSupply = supply / Math.pow(10, decimals);
            return `${tokenName} Supply: ${tokenSupply.toLocaleString()}`;
        }
        return `${tokenName} Supply: Loading...`;
    },

    // Generic Solana token supply handler
    async handleSolanaSupply(tokenMint, tokenName) {
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
                return `${tokenName} Supply: ${tokenSupply.toLocaleString()}`;
            }
            return `${tokenName} Supply: Loading...`;
        } catch (error) {
            console.error(`Error fetching ${tokenName} supply:`, error);
            return `${tokenName} Supply: Error`;
        }
    },

    // Generic Cosmos/IBC token supply handler
    async handleCosmosSupply(denom, tokenName, decimals = 6) {
        try {
            const endpoint = `https://lcd.osmosis.zone/cosmos/bank/v1beta1/supply/by_denom?denom=${encodeURIComponent(denom)}`;
            const response = await fetch(endpoint);
            if (response.ok) {
                const data = await response.json();
                if (data.amount && data.amount.amount) {
                    const supply = parseInt(data.amount.amount);
                    const tokenSupply = supply / Math.pow(10, decimals);
                    return `${tokenName} Supply: ${tokenSupply.toLocaleString()}`;
                }
            }
            return `${tokenName} Supply: Loading...`;
        } catch (error) {
            console.error(`Error fetching ${tokenName} supply:`, error);
            return `${tokenName} Supply: Error`;
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
                return `BTC Supply: ~${approximateSupply.toLocaleString()}`;
            }
            return 'BTC Supply: ~19.5M+';
        } catch (error) {
            console.error('Error fetching Bitcoin supply:', error);
            return 'BTC Supply: Error';
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
                    return `Staked: ${stakedAmount.toLocaleString()} BTC`;
                }
                return 'Staked: 0 BTC';
            }
            return 'Staked: Error';
        } catch (error) {
            console.error('Error fetching Babylon staking data:', error);
            return 'Staked: Error';
        }
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
        
        // Bitcoin supply
        if ((sourceId === 'bitcoin' && targetId === 'btc') || 
            (sourceId === 'btc' && targetId === 'bitcoin')) {
            label = await TokenHandlers.handleBitcoinSupply();
        }
        else if ((sourceId === 'bitgo' && targetId === 'wbtc-eth') || 
                 (sourceId === 'wbtc-eth' && targetId === 'bitgo')) {
            label = await TokenHandlers.handleERC20Supply(
                '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', 
                'WBTC'
            );
        }
        else if ((sourceId === 'bitgo' && targetId === 'wbtc-osmosis') || 
                 (sourceId === 'wbtc-osmosis' && targetId === 'bitgo')) {
            label = await TokenHandlers.handleCosmosSupply(
                'factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc',
                'WBTC',
                8
            );
        }
        else if ((sourceId === 'bitgo' && targetId === 'wbtc-solana') || 
                 (sourceId === 'wbtc-solana' && targetId === 'bitgo')) {
            label = await TokenHandlers.handleSolanaSupply(
                '5XZw2LKTyrfvfiskJ78AMpackRjPcyCif1WhUsPDuVqQ',
                'WBTC'
            );
        }
        else if ((sourceId === 'coinbase' && targetId === 'cbbtc') || 
                 (sourceId === 'cbbtc' && targetId === 'coinbase')) {
            label = await TokenHandlers.handleERC20Supply(
                '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                'cbBTC'
            );
        }
        // tBTC supply (BTC to tBTC)
        else if ((sourceId === 'btc' && targetId === 'tbtc') || 
                 (sourceId === 'tbtc' && targetId === 'btc')) {
            label = await TokenHandlers.handleERC20Supply(
                '0x18084fba666a33d37592fa2633fd49a74dd93a88',
                'tBTC',
                18
            );
        }
        // FBTC supply (if connected to FBTC)
        else if ((sourceId === 'fbtc' && targetId === 'solvbtc') || 
                 (sourceId === 'solvbtc' && targetId === 'fbtc')) {
            label = await TokenHandlers.handleERC20Supply(
                '0xc96de26018a54d51c097160568752c4e3bd6c364',
                'FBTC'
            );
        }
        // WBTC balance (WBTC to Axelar)
        else if ((sourceId === 'wbtc-eth' && targetId === 'axelar') || 
                 (sourceId === 'axelar' && targetId === 'wbtc-eth')) {
            const balance = await BlockchainUtils.getERC20Balance(
                '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
                '0x4F4495243837681061C4743b74B3eEdf548D56A5'
            );
            if (balance !== null) {
                const wbtcBalance = balance / 100000000;
                label = `WBTC Balance: ${wbtcBalance.toLocaleString()}`;
            } else {
                label = 'WBTC Balance: Loading...';
            }
        }
        // IBC supply (Axelar to WBTC.eth.axl)
        else if ((sourceId === 'axelar' && targetId === 'wbtc-eth-axl') || 
                 (sourceId === 'wbtc-eth-axl' && targetId === 'axelar')) {
            label = await TokenHandlers.handleCosmosSupply(
                'ibc/D1542AA8762DB13087D8364F3EA6509FD6F009A34F00426AF9E4F9FA85CBBF1F',
                'IBC',
                8
            );
        }
        // WBTC supply on Solana via Axelar (Portal Bridge to WBTC.axl Solana)
        else if ((sourceId === 'portal-bridge' && targetId === 'wbtc-axl-solana') || 
                 (sourceId === 'wbtc-axl-solana' && targetId === 'portal-bridge')) {
            label = await TokenHandlers.handleSolanaSupply(
                '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh',
                'WBTC'
            );
        }
        // Babylon staking (BTC to Babylon)
        else if ((sourceId === 'btc' && targetId === 'babylon') || 
                 (sourceId === 'babylon' && targetId === 'btc')) {
            label = await TokenHandlers.handleBabylonStaking();
        }
        // Osmosis routes
        else if ((sourceId === 'internet-computer' && targetId === 'ckbtc-osmosis') || 
                 (sourceId === 'ckbtc-osmosis' && targetId === 'internet-computer')) {
            label = await TokenHandlers.handleCosmosSupply(
                'factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-icrc-ckBTC',
                'ckBTC',
                8
            );
        }
        else if ((sourceId === 'nomic' && targetId === 'nbtc') || 
                 (sourceId === 'nbtc' && targetId === 'nomic')) {
            label = await TokenHandlers.handleCosmosSupply(
                'ibc/75345531D87BD90BF108BE7240BD721CB2CB0A1F16D4EBA71B09EC3C43E15C8F',
                'nBTC',
                8
            );
        }
        else if ((sourceId === 'allbtc-issuer' && targetId === 'allbtc') || 
                 (sourceId === 'allbtc' && targetId === 'allbtc-issuer')) {
            label = await TokenHandlers.handleCosmosSupply(
                'factory/osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3/alloyed/allBTC',
                'allBTC',
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
