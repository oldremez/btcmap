const { TokenHandlers } = require('./helpers');

// Contract addresses and denoms
const ADDRESSES = {
    // WBTC contracts
    WBTC_ETHEREUM: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    WBTC_BASE: '0x1cea84203673764244e05693e42e6ace62be9ba5',
    WBTC_KAVA: '0xb5c4423a65B953905949548276654C96fcaE6992',
    WBTC_ARBITRUM: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    WBTC_POLYGON: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    WBTC_OPTIMISM: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    
    // Other BTC tokens
    CBTC_ETHEREUM: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
    TBTC_ETHEREUM: '0x18084fba666a33d37592fa2633fd49a74dd93a88',
    FBTC_ETHEREUM: '0xc96de26018a54d51c097160568752c4e3bd6c364',
    SOLVBTC_ETH: '0x7a56e1c57c7475ccf742a1832b028f0456652f97',
    LBTC_ETHEREUM: '0x8236a87084f8b84306f72007f36f2618a5634494',
    
    // LBTC contracts on other chains
    LBTC_BASE: '0xecac9c5f704e954931349da37f60e39f515c11c1',
    LBTC_BSC: '0xecac9c5f704e954931349da37f60e39f515c11c1',
    LBTC_SONIC: '0xecAc9C5F704e954931349Da37F60E39f515c11c1',
    LBTC_KATANA: '0xecAc9C5F704e954931349Da37F60E39f515c11c1',
    
    // Solana token mints
    WBTC_SOLANA: '5XZw2LKTyrfvfiskJ78AMpackRjPcyCif1WhUsPDuVqQ',
    WBTC_PORTAL_SOLANA: '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh',
    TBTC_PORTAL_SOLANA: '6DNSN2BJsaPFdFFc1zP37kkeNe4Usc1Sqkzr9C9vPWcU',
    
    // Solana token accounts
    JUPITER_PERPS_WBTC: 'FgpXg2J3TzSs7w3WGYYE7aWePdrxBVLCXSxmAKnCZNtZ',
    DRIFT_WBTC: '3Zaz6vATY8br9WceXWD1Xa7fcyCpKSNanWFDRTEjjPqb',
    ORCA_WBTC: '5xXtGXq5JHB3grdgTGQ4yt7YmJBqBxdffhnkZ8vc6xLB',
    KAMINO_WBTC: '3y8JYyF8HPPK5YeUzxPPEvAahdPX4Z5wdZTiVc1atuQi',
    MARGINIFI_WBTC: 'CMNdnjfaDQZo3VMoX31wZQBnSGu5FMmb1CnBaU4tApZk',
    
    // WBTC bridge addresses
    AXELAR_WBTC: '0x4F4495243837681061C4743b74B3eEdf548D56A5',
    PORTAL_BRIDGE_WBTC: '0x3ee18B2214AFF97000D974cf647E7C347E8fa585',
    AAVE_WBTC: '0x5Ee5bf7ae06D1Be5997A1A72006FE6C607eC6DE8',
    MORPHO_WBTC: '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb',
    
    // Other token bridge addresses
    AAVE_TBTC: '0x10Ac93971cdb1F5c778144084242374473c350Da',
    AAVE_CBTC: '0x5c647cE0Ae10658ec44FA4E11A51c96e94efd1Dd',
    AAVE_FBTC: '0xcCA43ceF272c30415866914351fdfc3E881bb7c2',
    AAVE_LBTC: '0x65906988ADEe75306021C417a1A3458040239602',
    MORPHO_CBTC: '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb',
    PORTAL_BRIDGE_TBTC: '0x3ee18B2214AFF97000D974cf647E7C347E8fa585',
    
    // Compound addresses
    COMPOUND_WBTC_1: '0xc3d688B66703497DAA19211EEdff47f25384cdc3',
    COMPOUND_WBTC_2: '0xccF4429DB6322D5C611ee964527D42E5d685DD6a',
    COMPOUND_WBTC_3: '0x3Afdc9BCA9213A35503b077a6072F3D0d5AB0840',
    
    // Wallet addresses
    ARBITRUM_WBTC_WALLET: '0xa3A7B6F88361F48403514059F1F16C8E78d60EeC',
    POLYGON_WBTC_WALLET: '0x40ec5B33f54e0E8A33A975908C5BA1c14e5BbbDf',
    OPTIMISM_WBTC_WALLET: '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1',
    ALLBTC_ISSUER_OSMO: 'osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3'
};

const DENOMS = {
    // Osmosis WBTC
    WBTC_OSMOSIS: 'factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc',
    
    // IBC tokens
    WBTC_ETH_AXL_OSMO: 'ibc/D1542AA8762DB13087D8364F3EA6509FD6F009A34F00426AF9E4F9FA85CBBF1F',
    WBTC_ETH_EUR_OSMO: 'ibc/88386AC48152D48B34B082648DF836F975506F0B57DBBFC10A54213B1BF484CB',
    NOMIC_BTC: 'ibc/75345531D87BD90BF108BE7240BD721CB2CB0A1F16D4EBA71B09EC3C43E15C8F',
    CKBTC_OSMOSIS: 'factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-icrc-ckBTC',
    
    // AllBTC
    ALLBTC_ISSUER: 'factory/osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3/alloyed/allBTC',
    
    // Sui coin type
    LBTC_SUI: '0x3e8e9423d80e1774a7ca128fccd8bf5f1f7753be658c5e645929037f7c819040::lbtc::LBTC'
};



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
            ADDRESSES.WBTC_ETHEREUM,
            8,
            'ethereum'
        );
    }
    // WBTC supply on Base (bitgo -> wbtc-base)
    else if (sourceId === 'bitgo' && targetId === 'wbtc-base') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.WBTC_BASE,
            8,
            'base'
        );
    }
    // WBTC supply on Kava (bitgo -> wbtc-kava)
    else if (sourceId === 'bitgo' && targetId === 'wbtc-kava') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.WBTC_KAVA,
            8,
            'kava'
        );
    }
    // WBTC balance on Arbitrum (bitgo -> wbtc-arbitrum)
    else if (sourceId === 'bitgo' && targetId === 'wbtc-arbitrum') {
        label = await TokenHandlers.handleERC20Balance(
            ADDRESSES.WBTC_ARBITRUM,
            ADDRESSES.ARBITRUM_WBTC_WALLET,
            8,
            'arbitrum'
        );
    }
    // WBTC balance on Polygon (bitgo -> wbtc-polygon)
    else if (sourceId === 'bitgo' && targetId === 'wbtc-polygon') {
        label = await TokenHandlers.handleERC20Balance(
            ADDRESSES.WBTC_POLYGON,
            ADDRESSES.POLYGON_WBTC_WALLET,
            8,
            'polygon'
        );
    }
    // WBTC balance on Optimism (bitgo -> wbtc-optimism)
    else if (sourceId === 'bitgo' && targetId === 'wbtc-optimism') {
        label = await TokenHandlers.handleERC20Balance(
            ADDRESSES.WBTC_OPTIMISM,
            ADDRESSES.OPTIMISM_WBTC_WALLET,
            8,
            'optimism'
        );
    }
    // WBTC supply (bitgo -> wbtc-osmosis)
    else if (sourceId === 'bitgo' && targetId === 'wbtc-osmosis') {
        label = await TokenHandlers.handleCosmosSupply(
            DENOMS.WBTC_OSMOSIS,
            8
        );
    }
    // WBTC supply (bitgo -> wbtc-solana)
    else if (sourceId === 'bitgo' && targetId === 'wbtc-solana') {
        label = await TokenHandlers.handleSolanaSupply(
            ADDRESSES.WBTC_SOLANA
        );
    }
    // cbBTC supply (coinbase -> cbbtc)
    else if (sourceId === 'coinbase' && targetId === 'cbbtc') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.CBTC_ETHEREUM,
            8,
            'ethereum'
        );
    }
    // tBTC supply (btc -> tbtc)
    else if (sourceId === 'btc' && targetId === 'tbtc') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.TBTC_ETHEREUM,
            18,
            'ethereum'
        );
    }
    // FBTC supply (fbtc -> solvbtc)
    else if (sourceId === 'fbtc' && targetId === 'solvbtc') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.FBTC_ETHEREUM,
            8,
            'ethereum'
        );
    }
    // FBTC supply (function -> fbtc)
    else if (sourceId === 'function' && targetId === 'fbtc') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.FBTC_ETHEREUM,
            8,
            'ethereum'
        );
    }
    else if (sourceId === 'solvbtc' && targetId === 'solvbtc-eth') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.SOLVBTC_ETH,
            18,
            'ethereum'
        );
    }
    // WBTC balance (wbtc-eth -> axelar)
    else if (sourceId === 'wbtc-eth' && targetId === 'axelar') {
        label = await TokenHandlers.handleWBTCBalance(ADDRESSES.AXELAR_WBTC);
    }
    else if (sourceId === 'wbtc-eth' && targetId === 'portal-bridge-wbtc') {
        label = await TokenHandlers.handleWBTCBalance(ADDRESSES.PORTAL_BRIDGE_WBTC);
    }
    // WBTC balance (wbtc-eth -> aave)
    else if (sourceId === 'wbtc-eth' && targetId === 'aave') {
        label = await TokenHandlers.handleWBTCBalance(ADDRESSES.AAVE_WBTC);
    }
    else if (sourceId === 'tbtc' && targetId === 'aave') {
        label = await TokenHandlers.handleERC20Balance(
            ADDRESSES.TBTC_ETHEREUM,
            ADDRESSES.AAVE_TBTC,
            18,
            'ethereum'
        );
    }
    else if (sourceId === 'cbbtc' && targetId === 'aave') {
        label = await TokenHandlers.handleERC20Balance(
            ADDRESSES.CBTC_ETHEREUM,
            ADDRESSES.AAVE_CBTC,
            8,
            'ethereum'
        );
    }
    else if (sourceId === 'fbtc' && targetId === 'aave') {
        label = await TokenHandlers.handleERC20Balance(
            ADDRESSES.FBTC_ETHEREUM,
            ADDRESSES.AAVE_FBTC,
            8,
            'ethereum'
        );
    }
    else if (sourceId === 'lbtc' && targetId === 'aave') {
        label = await TokenHandlers.handleERC20Balance(
            ADDRESSES.LBTC_ETHEREUM,
            ADDRESSES.AAVE_LBTC,
            8,
            'ethereum'
        );
    }
    else if (sourceId === 'cbbtc' && targetId === 'morpho') {
        label = await TokenHandlers.handleERC20Balance(
            ADDRESSES.CBTC_ETHEREUM,
            ADDRESSES.MORPHO_CBTC,
            8,
            'ethereum'
        );
    }
    else if (sourceId === 'tbtc' && targetId === 'portal-bridge-tbtc') {
        label = await TokenHandlers.handleERC20Balance(
            ADDRESSES.TBTC_ETHEREUM,
            ADDRESSES.PORTAL_BRIDGE_TBTC,
            18,
            'ethereum'
        );
    }
    // WBTC balance (wbtc-eth -> morpho)
    else if (sourceId === 'wbtc-eth' && targetId === 'morpho') {
        label = await TokenHandlers.handleWBTCBalance(ADDRESSES.MORPHO_WBTC);
    }
    // WBTC balance (wbtc-eth -> compound)
    else if (sourceId === 'wbtc-eth' && targetId === 'compound') {
        label = await TokenHandlers.handleWBTCBalanceMultiple([
            ADDRESSES.COMPOUND_WBTC_1,
            ADDRESSES.COMPOUND_WBTC_2,
            ADDRESSES.COMPOUND_WBTC_3
        ]);
    }
    // IBC supply (axelar -> wbtc-eth-axl-osmo)
    else if (sourceId === 'axelar' && targetId === 'wbtc-eth-axl-osmo') {
        label = await TokenHandlers.handleCosmosSupply(
            DENOMS.WBTC_ETH_AXL_OSMO,
            8
        );
    }
    else if (sourceId === 'eureka' && targetId === 'wbtc-eth-eur-osmo') {
        label = await TokenHandlers.handleCosmosSupply(
            DENOMS.WBTC_ETH_EUR_OSMO,
            8
        );
    }
    else if (sourceId === 'lombard' && targetId === 'lbtc') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.LBTC_ETHEREUM,
            8,
            'ethereum'
        );
    }
    // LBTC supply on Base (lombard -> lbtc-base)
    else if (sourceId === 'lombard' && targetId === 'lbtc-base') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.LBTC_BASE,
            8,
            'base'
        );
    }
    // LBTC supply on Binance Smart Chain (lombard -> lbtc-bsc)
    else if (sourceId === 'lombard' && targetId === 'lbtc-bsc') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.LBTC_BSC,
            8,
            'bsc'
        );
    }
    // LBTC supply on Sui (lombard -> lbtc-sui)
    else if (sourceId === 'lombard' && targetId === 'lbtc-sui') {
        label = await TokenHandlers.handleSuiSupply(
            DENOMS.LBTC_SUI
        );
    }
    // LBTC supply on Sonic (lombard -> lbtc-sonic)
    else if (sourceId === 'lombard' && targetId === 'lbtc-sonic') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.LBTC_SONIC,
            8,
            'sonic'
        );
    }
    // LBTC supply on Katana (lombard -> lbtc-katana)
    else if (sourceId === 'lombard' && targetId === 'lbtc-katana') {
        label = await TokenHandlers.handleERC20Supply(
            ADDRESSES.LBTC_KATANA,
            8,
            'katana'
        );
    }
    // WBTC supply on Solana via Axelar (portal-bridge-wbtc -> wbtc-portal-solana)
    else if (sourceId === 'portal-bridge-wbtc' && targetId === 'wbtc-portal-solana') {
        label = await TokenHandlers.handleSolanaSupply(
            ADDRESSES.WBTC_PORTAL_SOLANA
        );
    }
    // WBTC balance on Jupiter Perps account (wbtc-portal-solana -> jupiter-perps)
    else if (sourceId === 'wbtc-portal-solana' && targetId === 'jupiter-perps') {
        label = await TokenHandlers.handleSolanaBalance(
            ADDRESSES.JUPITER_PERPS_WBTC
        );
    }
    // tBTC supply on Solana via Portal (portal-bridge-tbtc -> tbtc-portal-solana)
    else if (sourceId === 'portal-bridge-tbtc' && targetId === 'tbtc-portal-solana') {
        label = await TokenHandlers.handleSolanaSupply(
            ADDRESSES.TBTC_PORTAL_SOLANA
        );
    }
    // WBTC balance on Drift (wbtc-portal-solana -> drift)
    else if (sourceId === 'wbtc-portal-solana' && targetId === 'drift') {
        label = await TokenHandlers.handleSolanaBalance(
            ADDRESSES.DRIFT_WBTC
        );
    }
    // WBTC balance on Orca (wbtc-portal-solana -> orca)
    else if (sourceId === 'wbtc-portal-solana' && targetId === 'orca') {
        label = await TokenHandlers.handleSolanaBalance(
            ADDRESSES.ORCA_WBTC
        );
    }
    // WBTC balance on Kamino (wbtc-portal-solana -> kamino)
    else if (sourceId === 'wbtc-portal-solana' && targetId === 'kamino') {
        label = await TokenHandlers.handleSolanaBalance(
            ADDRESSES.KAMINO_WBTC
        );
    }
    // WBTC balance on Marginifi (wbtc-portal-solana -> marginifi)
    else if (sourceId === 'wbtc-portal-solana' && targetId === 'marginifi') {
        label = await TokenHandlers.handleSolanaBalance(
            ADDRESSES.MARGINIFI_WBTC
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
            DENOMS.CKBTC_OSMOSIS,
            8
        );
    }
    else if (sourceId === 'nomic' && targetId === 'nbtc') {
        label = await TokenHandlers.handleCosmosSupply(
            DENOMS.NOMIC_BTC,
            14
        );
    }
    else if (sourceId === 'nbtc' && targetId === 'allbtc-issuer') {
        label = await TokenHandlers.handleCosmosBalance(
            DENOMS.NOMIC_BTC,
            ADDRESSES.ALLBTC_ISSUER_OSMO,
            14
        );
    }
    else if (sourceId === 'wbtc-osmosis' && targetId === 'allbtc-issuer') {
        label = await TokenHandlers.handleCosmosBalance(
            DENOMS.WBTC_OSMOSIS,
            ADDRESSES.ALLBTC_ISSUER_OSMO,
            8
        );
    }
    else if (sourceId === 'ckbtc-osmosis' && targetId === 'allbtc-issuer') {
        label = await TokenHandlers.handleCosmosBalance(
            DENOMS.CKBTC_OSMOSIS,
            ADDRESSES.ALLBTC_ISSUER_OSMO,
            8
        );
    }
    else if (sourceId === 'wbtc-eth-axl-osmo' && targetId === 'allbtc-issuer') {
        label = await TokenHandlers.handleCosmosBalance(
            DENOMS.WBTC_ETH_AXL_OSMO,
            ADDRESSES.ALLBTC_ISSUER_OSMO,
            8
        );
    }
    else if (sourceId === 'wbtc-eth-eur-osmo' && targetId === 'allbtc-issuer') {
        label = await TokenHandlers.handleCosmosBalance(
            DENOMS.WBTC_ETH_EUR_OSMO,
            ADDRESSES.ALLBTC_ISSUER_OSMO,
            8
        );
    }
    else if (sourceId === 'allbtc-issuer' && targetId === 'allbtc') {
        label = await TokenHandlers.handleCosmosSupply(
            DENOMS.ALLBTC_ISSUER,
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
