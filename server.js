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

// Route to query link labels
app.post('/api/link-label', async (req, res) => {
    try {
        const { linkType, source, target, linkData } = req.body;
        
        let label = null;
        
        switch (linkType) {
            case 'btc-supply':
                // Query Bitcoin supply from CoinGecko API
                const btcResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true');
                const btcData = await btcResponse.json();
                
                if (btcData.bitcoin && btcData.bitcoin.usd) {
                    const btcPrice = btcData.bitcoin.usd;
                    const btcMarketCap = btcData.bitcoin.usd_market_cap;
                    const approximateSupply = Math.round(btcMarketCap / btcPrice);
                    label = `BTC Supply: ~${approximateSupply.toLocaleString()}`;
                } else {
                    label = 'BTC Supply: ~19.5M+';
                }
                break;
                
            case 'wbtc-supply':
                // Query WBTC supply
                const wbtcAddress = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
                const totalSupply = await BlockchainUtils.getERC20TotalSupply(wbtcAddress);
                
                if (totalSupply !== null) {
                    const wbtcSupply = totalSupply / 100000000; // WBTC has 8 decimals
                    label = `WBTC Supply: ${wbtcSupply.toLocaleString()}`;
                } else {
                    label = 'WBTC Supply: Loading...';
                }
                break;
                
            case 'solana-wbtc-supply':
                // Query Solana WBTC supply
                const solResponse = await fetch('https://api.mainnet-beta.solana.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'getTokenSupply',
                        params: ['5XZw2LKTyrfvfiskJ78AMpackRjPcyCif1WhUsPDuVqQ'],
                        id: 1
                    })
                });
                
                const solData = await solResponse.json();
                if (solData.result && solData.result.value) {
                    const supply = solData.result.value.amount;
                    const decimals = solData.result.value.decimals;
                    const tokenSupply = supply / Math.pow(10, decimals);
                    label = `WBTC Supply: ${tokenSupply.toLocaleString()}`;
                } else {
                    label = 'WBTC Supply: Loading...';
                }
                break;
                
            case 'cbbtc-supply':
                // Query cbBTC supply
                const contractAddress = '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf';
                const cbbtcSupply = await BlockchainUtils.getERC20TotalSupply(contractAddress);
                
                if (cbbtcSupply !== null) {
                    const tokenSupply = cbbtcSupply / 100000000; // Assuming 8 decimals
                    label = `cbBTC Supply: ${tokenSupply.toLocaleString()}`;
                } else {
                    label = 'cbBTC Supply: Loading...';
                }
                break;
                
            case 'tbtc-supply':
                // Query tBTC supply from the specified ERC20 contract
                const tbtcContractAddress = '0x18084fba666a33d37592fa2633fd49a74dd93a88';
                const tbtcSupply = await BlockchainUtils.getERC20TotalSupply(tbtcContractAddress);
                
                if (tbtcSupply !== null) {
                    const tokenSupply = tbtcSupply / 100000000000000000; 
                    label = `tBTC Supply: ${tokenSupply.toLocaleString()}`;
                } else {
                    label = 'tBTC Supply: Loading...';
                }
                break;
                
            case 'fbtc-supply':
                // Query FBTC supply from the specified ERC20 contract
                const fbtcContractAddress = '0xc96de26018a54d51c097160568752c4e3bd6c364';
                const fbtcSupply = await BlockchainUtils.getERC20TotalSupply(fbtcContractAddress);
                
                if (fbtcSupply !== null) {
                    const tokenSupply = fbtcSupply / 100000000; // Assuming 8 decimals for FBTC
                    label = `FBTC Supply: ${tokenSupply.toLocaleString()}`;
                } else {
                    label = 'FBTC Supply: Loading...';
                }
                break;
                
            case 'wbtc-balance':
                // Query WBTC balance for Axelar contract
                const wbtcContractAddress = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
                const targetContractAddress = '0x4F4495243837681061C4743b74B3eEdf548D56A5';
                const balance = await BlockchainUtils.getERC20Balance(wbtcContractAddress, targetContractAddress);
                
                if (balance !== null) {
                    const wbtcBalance = balance / 100000000; // WBTC has 8 decimals
                    label = `WBTC Balance: ${wbtcBalance.toLocaleString()}`;
                } else {
                    label = 'WBTC Balance: Loading...';
                }
                break;
                
            case 'osmosis-ibc-supply':
                // Query Osmosis IBC token supply
                const ibcResponse = await fetch('https://lcd.osmosis.zone/cosmos/bank/v1beta1/supply/by_denom?denom=ibc%2FD1542AA8762DB13087D8364F3EA6509FD6F009A34F00426AF9E4F9FA85CBBF1F');
                
                if (ibcResponse.ok) {
                    const ibcData = await ibcResponse.json();
                    if (ibcData.amount && ibcData.amount.amount) {
                        const supply = ibcData.amount.amount;
                        const tokenSupply = supply / 100000000; // Assuming 6 decimals for IBC tokens
                        label = `IBC Supply: ${tokenSupply.toLocaleString()}`;
                    } else {
                        label = 'IBC Supply: Loading...';
                    }
                } else {
                    label = 'IBC Supply: Error';
                }
                break;
                
            case 'osmosis-wbtc-supply':
                // Query WBTC token supply on Osmosis using the factory address
                try {
                    const osmosisResponse = await fetch('https://lcd.osmosis.zone/cosmos/bank/v1beta1/supply/by_denom?denom=factory%2Fosmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743%2Fwbtc');
                    
                    if (osmosisResponse.ok) {
                        const osmosisData = await osmosisResponse.json();
                        console.log('Osmosis WBTC response:', JSON.stringify(osmosisData, null, 2));
                        
                        if (osmosisData.amount && osmosisData.amount.amount) {
                            const supply = parseInt(osmosisData.amount.amount);
                            const tokenSupply = supply / 100000000; // WBTC has 8 decimals
                            label = `WBTC Supply: ${tokenSupply.toLocaleString()}`;
                        } else {
                            console.log('No amount data found in response');
                            label = 'WBTC Supply: Loading...';
                        }
                    } else {
                        console.log('Osmosis API response not ok:', osmosisResponse.status, osmosisResponse.statusText);
                        label = 'WBTC Supply: Error';
                    }
                } catch (error) {
                    console.error('Error fetching Osmosis WBTC supply:', error);
                    label = 'WBTC Supply: Error';
                }
                break;
                
            case 'babylon-staked-btc':
                // Query amount of BTC staked with Babylon using the working API endpoint
                try {
                    const babylonResponse = await fetch('https://babylon-api.polkachu.com/babylon/btcstaking/v1/btc_delegations/ACTIVE');
                    
                    if (babylonResponse.ok) {
                        const babylonData = await babylonResponse.json();
                        if (babylonData.btc_delegations && Array.isArray(babylonData.btc_delegations)) {
                            // Sum up all staked amounts in satoshis
                            const totalSats = babylonData.btc_delegations.reduce((sum, delegation) => {
                                const stakedAmountSats = parseInt(delegation.total_sat) || 0;
                                return sum + stakedAmountSats;
                            }, 0);
                            
                            // Convert satoshis to BTC (1 BTC = 100,000,000 satoshis)
                            const stakedAmount = totalSats / 100000000;
                            label = `Staked: ${stakedAmount.toLocaleString()} BTC`;
                        } else {
                            label = 'Staked: 0 BTC';
                        }
                    } else {
                        label = 'Staked: Error';
                    }
                } catch (error) {
                    console.error('Error fetching Babylon staking data:', error);
                    label = 'Staked: Error';
                }
                break;
                
            case 'static':
                // Return static text if provided
                label = linkData?.text || null;
                break;
                
            case 'function':
                // Handle function-based text (for simple cases)
                if (linkData?.value) {
                    label = `${linkData.type || 'Value'}: ${linkData.value}`;
                }
                break;
                
            default:
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
