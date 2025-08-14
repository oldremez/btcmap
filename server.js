const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const HTTP_REDIRECT_PORT = process.env.HTTP_REDIRECT_PORT || 3001;
const DOMAIN_NAME = process.env.DOMAIN_NAME || 'localhost';
const SSL_KEY_PATH = process.env.SSL_KEY_PATH || './key.pem';
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || './cert.pem';
const ENABLE_HTTPS = process.env.ENABLE_HTTPS !== 'false'; // Default to true

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
    // Chain RPC URL mapping
    chainRpcUrls: {
        'ethereum': 'https://eth.llamarpc.com',
        'base': 'https://mainnet.base.org',
        'bsc': 'https://bsc-dataseed1.binance.org',
        'arbitrum': 'https://arb1.arbitrum.io/rpc',
        'polygon': 'https://polygon-rpc.com',
        'optimism': 'https://mainnet.optimism.io',
        'sonic': 'https://rpc.sonic.game',
        'katana': 'https://rpc.katana.roninchain.com',
        'kava': 'https://evm.kava.io'
    },

    // Generic ERC20 token supply handler
    async handleERC20Supply(contractAddress, decimals = 8, chainName = 'ethereum') {
        const rpcUrl = this.chainRpcUrls[chainName] || this.chainRpcUrls['ethereum'];
        const supply = await BlockchainUtils.getERC20TotalSupply(contractAddress, rpcUrl);
        if (supply !== null) {
            const tokenSupply = supply / Math.pow(10, decimals);
            return formatNumber(tokenSupply);
        }
        return 'Loading...';
    },

    // Sui token supply handler
    async handleSuiSupply(coinType) {
        try {
            const response = await fetch('https://sui-mainnet.blockvision.org', {
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
            return 'Loading...';
        } catch (error) {
            console.error('Error fetching Sui token supply:', error);
            return 'Error';
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
            return 'Loading...';
        } catch (error) {
            console.error(`Error fetching ${denom} balance for ${address}:`, error);
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

    // Generic ERC20 token balance handler
    async handleERC20Balance(contractAddress, walletAddress, decimals = 18, chainName = 'ethereum') {
        const rpcUrl = this.chainRpcUrls[chainName] || this.chainRpcUrls['ethereum'];
        const balance = await BlockchainUtils.getERC20Balance(contractAddress, walletAddress, rpcUrl);
        if (balance !== null) {
            const tokenBalance = balance / Math.pow(10, decimals);
            return formatNumber(tokenBalance);
        }
        return 'Loading...';
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
                return 'Error';
            }
            return 'Error';
        } catch (error) {
            console.error('Error fetching Lombard reserves:', error);
            return 'Error';
        }
    },

    // WBTC balance handler
    async handleWBTCBalance(walletAddress) {
        return this.handleERC20Balance(
            '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // WBTC contract address
            walletAddress,
            8 // WBTC has 8 decimals
        );
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
                '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
                8,
                'ethereum'
            );
        }
        // WBTC supply on Base (bitgo -> wbtc-base)
        else if (sourceId === 'bitgo' && targetId === 'wbtc-base') {
            label = await TokenHandlers.handleERC20Supply(
                '0x1cea84203673764244e05693e42e6ace62be9ba5',
                8,
                'base'
            );
        }
        // WBTC supply on Kava (bitgo -> wbtc-kava)
        else if (sourceId === 'bitgo' && targetId === 'wbtc-kava') {
            label = await TokenHandlers.handleERC20Supply(
                '0xb5c4423a65B953905949548276654C96fcaE6992',
                8,
                'kava'
            );
        }
        // WBTC balance on Arbitrum (bitgo -> wbtc-arbitrum)
        else if (sourceId === 'bitgo' && targetId === 'wbtc-arbitrum') {
            label = await TokenHandlers.handleERC20Balance(
                '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                '0xa3A7B6F88361F48403514059F1F16C8E78d60EeC',
                8,
                'arbitrum'
            );
        }
        // WBTC balance on Polygon (bitgo -> wbtc-polygon)
        else if (sourceId === 'bitgo' && targetId === 'wbtc-polygon') {
            label = await TokenHandlers.handleERC20Balance(
                '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                '0x40ec5B33f54e0E8A33A975908C5BA1c14e5BbbDf',
                8,
                'polygon'
            );
        }
        // WBTC balance on Optimism (bitgo -> wbtc-optimism)
        else if (sourceId === 'bitgo' && targetId === 'wbtc-optimism') {
            label = await TokenHandlers.handleERC20Balance(
                '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1',
                8,
                'optimism'
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
                '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                8,
                'ethereum'
            );
        }
        // tBTC supply (btc -> tbtc)
        else if (sourceId === 'btc' && targetId === 'tbtc') {
            label = await TokenHandlers.handleERC20Supply(
                '0x18084fba666a33d37592fa2633fd49a74dd93a88',
                18,
                'ethereum'
            );
        }
        // FBTC supply (fbtc -> solvbtc)
        else if (sourceId === 'fbtc' && targetId === 'solvbtc') {
            label = await TokenHandlers.handleERC20Supply(
                '0xc96de26018a54d51c097160568752c4e3bd6c364',
                8,
                'ethereum'
            );
        }
        // FBTC supply (function -> fbtc)
        else if (sourceId === 'function' && targetId === 'fbtc') {
            label = await TokenHandlers.handleERC20Supply(
                '0xc96de26018a54d51c097160568752c4e3bd6c364',
                8,
                'ethereum'
            );
        }
        else if (sourceId === 'solvbtc' && targetId === 'solvbtc-eth') {
            label = await TokenHandlers.handleERC20Supply(
                '0x7a56e1c57c7475ccf742a1832b028f0456652f97',
                18,
                'ethereum'
            );
        }
        // WBTC balance (wbtc-eth -> axelar)
        else if (sourceId === 'wbtc-eth' && targetId === 'axelar') {
            label = await TokenHandlers.handleWBTCBalance('0x4F4495243837681061C4743b74B3eEdf548D56A5');
        }
        else if (sourceId === 'wbtc-eth' && targetId === 'portal-bridge-wbtc') {
            label = await TokenHandlers.handleWBTCBalance('0x3ee18B2214AFF97000D974cf647E7C347E8fa585');
        }
        // WBTC balance (wbtc-eth -> aave)
        else if (sourceId === 'wbtc-eth' && targetId === 'aave') {
            label = await TokenHandlers.handleWBTCBalance('0x5Ee5bf7ae06D1Be5997A1A72006FE6C607eC6DE8');
        }
        else if (sourceId === 'tbtc' && targetId === 'aave') {
            label = await TokenHandlers.handleERC20Balance(
                '0x18084fba666a33d37592fa2633fd49a74dd93a88',
                '0x10Ac93971cdb1F5c778144084242374473c350Da',
                18,
                'ethereum'
            );
        }
        else if (sourceId === 'cbbtc' && targetId === 'aave') {
            label = await TokenHandlers.handleERC20Balance(
                '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                '0x5c647cE0Ae10658ec44FA4E11A51c96e94efd1Dd',
                8,
                'ethereum'
            );
        }
        else if (sourceId === 'fbtc' && targetId === 'aave') {
            label = await TokenHandlers.handleERC20Balance(
                '0xc96de26018a54d51c097160568752c4e3bd6c364',
                '0xcCA43ceF272c30415866914351fdfc3E881bb7c2',
                8,
                'ethereum'
            );
        }
        else if (sourceId === 'lbtc' && targetId === 'aave') {
            label = await TokenHandlers.handleERC20Balance(
                '0x8236a87084f8b84306f72007f36f2618a5634494',
                '0x65906988ADEe75306021C417a1A3458040239602',
                8,
                'ethereum'
            );
        }
        else if (sourceId === 'cbbtc' && targetId === 'morpho') {
            label = await TokenHandlers.handleERC20Balance(
                '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
                '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb',
                8,
                'ethereum'
            );
        }
        else if (sourceId === 'tbtc' && targetId === 'portal-bridge-tbtc') {
            label = await TokenHandlers.handleERC20Balance(
                '0x18084fba666a33d37592fa2633fd49a74dd93a88',
                '0x3ee18B2214AFF97000D974cf647E7C347E8fa585',
                18,
                'ethereum'
            );
        }
        // WBTC balance (wbtc-eth -> morpho)
        else if (sourceId === 'wbtc-eth' && targetId === 'morpho') {
            label = await TokenHandlers.handleWBTCBalance('0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb');
        }
        // WBTC balance (wbtc-eth -> compound)
        else if (sourceId === 'wbtc-eth' && targetId === 'compound') {
            label = await TokenHandlers.handleWBTCBalance('0xc3d688B66703497DAA19211EEdff47f25384cdc3');
        }
        // IBC supply (axelar -> wbtc-eth-axl-osmo)
        else if (sourceId === 'axelar' && targetId === 'wbtc-eth-axl-osmo') {
            label = await TokenHandlers.handleCosmosSupply(
                'ibc/D1542AA8762DB13087D8364F3EA6509FD6F009A34F00426AF9E4F9FA85CBBF1F',
                8
            );
        }
        else if (sourceId === 'eureka' && targetId === 'wbtc-eth-eur-osmo') {
            label = await TokenHandlers.handleCosmosSupply(
                'ibc/88386AC48152D48B34B082648DF836F975506F0B57DBBFC10A54213B1BF484CB',
                8
            );
        }
        else if (sourceId === 'lombard' && targetId === 'lbtc') {
            label = await TokenHandlers.handleERC20Supply(
                '0x8236a87084f8b84306f72007f36f2618a5634494',
                8,
                'ethereum'
            );
        }
        // LBTC supply on Base (lombard -> lbtc-base)
        else if (sourceId === 'lombard' && targetId === 'lbtc-base') {
            label = await TokenHandlers.handleERC20Supply(
                '0xecac9c5f704e954931349da37f60e39f515c11c1',
                8,
                'base'
            );
        }
        // LBTC supply on Binance Smart Chain (lombard -> lbtc-bsc)
        else if (sourceId === 'lombard' && targetId === 'lbtc-bsc') {
            label = await TokenHandlers.handleERC20Supply(
                '0xecac9c5f704e954931349da37f60e39f515c11c1',
                8,
                'bsc'
            );
        }
        // LBTC supply on Sui (lombard -> lbtc-sui)
        else if (sourceId === 'lombard' && targetId === 'lbtc-sui') {
            label = await TokenHandlers.handleSuiSupply(
                '0x3e8e9423d80e1774a7ca128fccd8bf5f1f7753be658c5e645929037f7c819040::lbtc::LBTC'
            );
        }
        // LBTC supply on Sonic (lombard -> lbtc-sonic)
        else if (sourceId === 'lombard' && targetId === 'lbtc-sonic') {
            label = await TokenHandlers.handleERC20Supply(
                '0xecAc9C5F704e954931349Da37F60E39f515c11c1',
                8,
                'sonic'
            );
        }
        // LBTC supply on Katana (lombard -> lbtc-katana)
        else if (sourceId === 'lombard' && targetId === 'lbtc-katana') {
            label = await TokenHandlers.handleERC20Supply(
                '0xecAc9C5F704e954931349Da37F60E39f515c11c1',
                8,
                'katana'
            );
        }
        // WBTC supply on Solana via Axelar (portal-bridge-wbtc -> wbtc-portal-solana)
        else if (sourceId === 'portal-bridge-wbtc' && targetId === 'wbtc-portal-solana') {
            label = await TokenHandlers.handleSolanaSupply(
                '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh'
            );
        }
        // WBTC balance on Jupiter Perps account (wbtc-portal-solana -> jupiter-perps)
        else if (sourceId === 'wbtc-portal-solana' && targetId === 'jupiter-perps') {
            label = await TokenHandlers.handleSolanaBalance(
                'FgpXg2J3TzSs7w3WGYYE7aWePdrxBVLCXSxmAKnCZNtZ'
            );
        }
        // Babylon staking (btc -> babylon)
        else if (sourceId === 'btc' && targetId === 'babylon') {
            label = await TokenHandlers.handleBabylonStaking();
        }
        // Lombard reserves (babylon -> lombard)
        else if (sourceId === 'babylon' && targetId === 'lombard') {
            label = await TokenHandlers.handleLombardReserves();
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
        else if (sourceId === 'nbtc' && targetId === 'allbtc-issuer') {
            label = await TokenHandlers.handleCosmosBalance(
                'ibc/75345531D87BD90BF108BE7240BD721CB2CB0A1F16D4EBA71B09EC3C43E15C8F',
                'osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3',
                14
            );
        }
        else if (sourceId === 'wbtc-osmosis' && targetId === 'allbtc-issuer') {
            label = await TokenHandlers.handleCosmosBalance(
                'factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc',
                'osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3',
                8
            );
        }
        else if (sourceId === 'ckbtc-osmosis' && targetId === 'allbtc-issuer') {
            label = await TokenHandlers.handleCosmosBalance(
                'factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-icrc-ckBTC',
                'osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3',
                8
            );
        }
        else if (sourceId === 'wbtc-eth-axl-osmo' && targetId === 'allbtc-issuer') {
            label = await TokenHandlers.handleCosmosBalance(
                'ibc/D1542AA8762DB13087D8364F3EA6509FD6F009A34F00426AF9E4F9FA85CBBF1F',
                'osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3',
                8
            );
        }
        else if (sourceId === 'wbtc-eth-eur-osmo' && targetId === 'allbtc-issuer') {
            label = await TokenHandlers.handleCosmosBalance(
                'ibc/88386AC48152D48B34B082648DF836F975506F0B57DBBFC10A54213B1BF484CB',
                'osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3',
                8
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

// Serve configuration script with environment variables
app.get('/config.js', (req, res) => {
  const config = {
    DEV_MODE: process.env.DEV_MODE || 'false'
  };
  
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`window.DEV_MODE = '${config.DEV_MODE}';`);
});

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Function to generate self-signed certificates
function generateSelfSignedCert() {
  const { execSync } = require('child_process');
  
  try {
    // Check if certificates already exist
    if (fs.existsSync(SSL_KEY_PATH) && fs.existsSync(SSL_CERT_PATH)) {
      console.log('SSL certificates found, using existing ones...');
      return true;
    }
    
    console.log('Generating self-signed SSL certificates...');
    
    // Generate private key
    execSync(`openssl genrsa -out ${SSL_KEY_PATH} 2048`, { stdio: 'inherit' });
    
    // Generate certificate
    execSync(`openssl req -new -x509 -key ${SSL_KEY_PATH} -out ${SSL_CERT_PATH} -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=${DOMAIN_NAME}"`, { stdio: 'inherit' });
    
    console.log('SSL certificates generated successfully!');
    return true;
  } catch (error) {
    console.error('Error generating SSL certificates:', error.message);
    console.log('HTTPS will not be available. You can manually generate certificates using:');
    console.log(`openssl genrsa -out ${SSL_KEY_PATH} 2048`);
    console.log(`openssl req -new -x509 -key ${SSL_KEY_PATH} -out ${SSL_CERT_PATH} -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=${DOMAIN_NAME}"`);
    return false;
  }
}

// Start both HTTP and HTTPS servers
function startServers() {
  // Start HTTP server
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log(`HTTP Server running at http://${DOMAIN_NAME}:${PORT}`);
  });
  
  // Try to start HTTPS server
  if (ENABLE_HTTPS && generateSelfSignedCert()) {
    try {
      const httpsOptions = {
        key: fs.readFileSync(SSL_KEY_PATH),
        cert: fs.readFileSync(SSL_CERT_PATH)
      };
      
      const httpsServer = https.createServer(httpsOptions, app);
      httpsServer.listen(HTTPS_PORT, () => {
        console.log(`HTTPS Server running at https://${DOMAIN_NAME}:${HTTPS_PORT}`);
        console.log(`Note: You may see a security warning in your browser due to self-signed certificate`);
        
        // Add HTTP to HTTPS redirect on a different port
        const redirectApp = express();
        redirectApp.use((req, res) => {
          const httpsUrl = `https://${DOMAIN_NAME}:${HTTPS_PORT}${req.url}`;
          res.redirect(301, httpsUrl);
        });
        
        const redirectServer = http.createServer(redirectApp);
        redirectServer.listen(HTTP_REDIRECT_PORT, () => {
          console.log(`HTTP redirect server running on port ${HTTP_REDIRECT_PORT} - redirecting to HTTPS`);
        });
      });
    } catch (error) {
      console.error('Failed to start HTTPS server:', error.message);
      console.log('Continuing with HTTP only...');
    }
  } else if (ENABLE_HTTPS) {
    console.log(`HTTPS is enabled in environment variables, but SSL certificates not found. HTTPS will not be available.`);
  }
  
  console.log(`\nOpen your browser and navigate to:`);
  if (ENABLE_HTTPS) {
    console.log(`  HTTPS: https://${DOMAIN_NAME}:${HTTPS_PORT} (recommended)`);
    console.log(`  HTTP:  http://${DOMAIN_NAME}:${PORT}`);
    console.log(`  HTTP Redirect: http://${DOMAIN_NAME}:${HTTP_REDIRECT_PORT} (redirects to HTTPS)`);
  } else {
    console.log(`  HTTP:  http://${DOMAIN_NAME}:${PORT}`);
  }
}

// Start the servers
startServers();
