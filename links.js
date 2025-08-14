const { TokenHandlers } = require('./helpers');

/**
 * Determines the label for a link between two nodes based on their source and target IDs
 * @param {string} sourceId - The source node ID
 * @param {string} targetId - The target node ID
 * @returns {Promise<string|null>} - The label for the link, or null if no label is defined
 */
async function getLinkLabel(sourceId, targetId) {
    let label = null;
    
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
        label = await TokenHandlers.handleWBTCBalanceMultiple([
            '0xc3d688B66703497DAA19211EEdff47f25384cdc3',
            '0xccF4429DB6322D5C611ee964527D42E5d685DD6a',
            '0x3Afdc9BCA9213A35503b077a6072F3D0d5AB0840'
        ]);
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
    // tBTC supply on Solana via Portal (portal-bridge-tbtc -> tbtc-portal-solana)
    else if (sourceId === 'portal-bridge-tbtc' && targetId === 'tbtc-portal-solana') {
        label = await TokenHandlers.handleSolanaSupply(
            '6DNSN2BJsaPFdFFc1zP37kkeNe4Usc1Sqkzr9C9vPWcU'
        );
    }
    // WBTC balance on Drift (wbtc-portal-solana -> drift)
    else if (sourceId === 'wbtc-portal-solana' && targetId === 'drift') {
        label = await TokenHandlers.handleSolanaBalance(
            '3Zaz6vATY8br9WceXWD1Xa7fcyCpKSNanWFDRTEjjPqb'
        );
    }
    // WBTC balance on Orca (wbtc-portal-solana -> orca)
    else if (sourceId === 'wbtc-portal-solana' && targetId === 'orca') {
        label = await TokenHandlers.handleSolanaBalance(
            '5xXtGXq5JHB3grdgTGQ4yt7YmJBqBxdffhnkZ8vc6xLB'
        );
    }
    // WBTC balance on Kamino (wbtc-portal-solana -> kamino)
    else if (sourceId === 'wbtc-portal-solana' && targetId === 'kamino') {
        label = await TokenHandlers.handleSolanaBalance(
            '3y8JYyF8HPPK5YeUzxPPEvAahdPX4Z5wdZTiVc1atuQi'
        );
    }
    // WBTC balance on Marginifi (wbtc-portal-solana -> marginifi)
    else if (sourceId === 'wbtc-portal-solana' && targetId === 'marginifi') {
        label = await TokenHandlers.handleSolanaBalance(
            'CMNdnjfaDQZo3VMoX31wZQBnSGu5FMmb1CnBaU4tApZk'
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
    
    return label;
}

module.exports = {
    getLinkLabel
};
