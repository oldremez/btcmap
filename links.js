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
    CBTC_BASE: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
    CBTC_ARBITRUM: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
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
    CBTC_SOLANA: 'cbbtcf3aa214zXHbiAZQwf4122FBYbraNdFqgw4iMij',
    
    // Solana token accounts
    JUPITER_PERPS_WBTC: 'FgpXg2J3TzSs7w3WGYYE7aWePdrxBVLCXSxmAKnCZNtZ',
    DRIFT_WBTC: '3Zaz6vATY8br9WceXWD1Xa7fcyCpKSNanWFDRTEjjPqb',
    ORCA_WBTC: '5xXtGXq5JHB3grdgTGQ4yt7YmJBqBxdffhnkZ8vc6xLB',
    KAMINO_WBTC: '3y8JYyF8HPPK5YeUzxPPEvAahdPX4Z5wdZTiVc1atuQi',
    KAMINO_CBBTC: 'BcPpdmg4vxXSenvkp12XbVp6XnzwKChnzfNa6cQXLW96',
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

// Big map for link label handlers
const LINK_LABEL_HANDLERS = {
    // Bitcoin supply (bitcoin -> btc)
    'bitcoin->btc': {
        handler: TokenHandlers.handleBitcoinSupply,
        args: []
    },
    
    // WBTC supply (bitgo -> wbtc-eth)
    'bitgo->wbtc-eth': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.WBTC_ETHEREUM, 8, 'ethereum']
    },
    
    // WBTC supply on Base (bitgo -> wbtc-base)
    'bitgo->wbtc-base': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.WBTC_BASE, 8, 'base']
    },
    
    // WBTC supply on Kava (bitgo -> wbtc-kava)
    'bitgo->wbtc-kava': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.WBTC_KAVA, 8, 'kava']
    },
    
    // WBTC balance on Arbitrum (bitgo -> wbtc-arbitrum)
    'bitgo->wbtc-arbitrum': {
        handler: TokenHandlers.handleERC20Balance,
        args: [ADDRESSES.WBTC_ARBITRUM, ADDRESSES.ARBITRUM_WBTC_WALLET, 8, 'ethereum']
    },
    
    // WBTC balance on Polygon (bitgo -> wbtc-polygon)
    'bitgo->wbtc-polygon': {
        handler: TokenHandlers.handleERC20Balance,
        args: [ADDRESSES.WBTC_POLYGON, ADDRESSES.POLYGON_WBTC_WALLET, 8, 'ethereum']
    },
    
    // WBTC balance on Optimism (bitgo -> wbtc-optimism)
    'bitgo->wbtc-optimism': {
        handler: TokenHandlers.handleERC20Balance,
        args: [ADDRESSES.WBTC_OPTIMISM, ADDRESSES.OPTIMISM_WBTC_WALLET, 8, 'ethereum']
    },
    
    // WBTC supply (bitgo -> wbtc-osmosis)
    'bitgo->wbtc-osmosis': {
        handler: TokenHandlers.handleCosmosSupply,
        args: [DENOMS.WBTC_OSMOSIS, 8]
    },
    
    // WBTC supply (bitgo -> wbtc-solana)
    'bitgo->wbtc-solana': {
        handler: TokenHandlers.handleSolanaSupply,
        args: [ADDRESSES.WBTC_SOLANA]
    },
    
    // cbBTC supply (coinbase -> cbbtc)
    'coinbase->cbbtc': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.CBTC_ETHEREUM, 8, 'ethereum']
    },
    
    // cbBTC supply on Base (coinbase -> cbbtc-base)
    'coinbase->cbbtc-base': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.CBTC_BASE, 8, 'base']
    },
    
    // cbBTC supply on Solana (coinbase -> cbbtc-solana)
    'coinbase->cbbtc-solana': {
        handler: TokenHandlers.handleSolanaSupply,
        args: [ADDRESSES.CBTC_SOLANA]
    },
    
    // cbBTC supply on Arbitrum (coinbase -> cbbtc-arbitrum)
    'coinbase->cbbtc-arbitrum': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.CBTC_ARBITRUM, 8, 'arbitrum']
    },
    
    // tBTC supply (btc -> tbtc)
    'btc->tbtc': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.TBTC_ETHEREUM, 18, 'ethereum']
    },
    
    // FBTC supply (fbtc -> solvbtc)
    'fbtc->solvbtc': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.FBTC_ETHEREUM, 8, 'ethereum']
    },
    
    // FBTC supply (function -> fbtc)
    'function->fbtc': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.FBTC_ETHEREUM, 8, 'ethereum']
    },
    
    // SolvBTC supply (solvbtc -> solvbtc-eth)
    'solvbtc->solvbtc-eth': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.SOLVBTC_ETH, 18, 'ethereum']
    },
    
    // WBTC balance (wbtc-eth -> axelar)
    'wbtc-eth->axelar': {
        handler: TokenHandlers.handleWBTCBalance,
        args: [ADDRESSES.AXELAR_WBTC]
    },
    
    // WBTC balance (wbtc-eth -> portal-bridge-wbtc)
    'wbtc-eth->portal-bridge-wbtc': {
        handler: TokenHandlers.handleWBTCBalance,
        args: [ADDRESSES.PORTAL_BRIDGE_WBTC]
    },
    
    // WBTC balance (wbtc-eth -> aave)
    'wbtc-eth->aave': {
        handler: TokenHandlers.handleWBTCBalance,
        args: [ADDRESSES.AAVE_WBTC]
    },
    
    // tBTC balance (tbtc -> aave)
    'tbtc->aave': {
        handler: TokenHandlers.handleERC20Balance,
        args: [ADDRESSES.TBTC_ETHEREUM, ADDRESSES.AAVE_TBTC, 18, 'ethereum']
    },
    
    // cbBTC balance (cbbtc -> aave)
    'cbbtc->aave': {
        handler: TokenHandlers.handleERC20Balance,
        args: [ADDRESSES.CBTC_ETHEREUM, ADDRESSES.AAVE_CBTC, 8, 'ethereum']
    },
    
    // FBTC balance (fbtc -> aave)
    'fbtc->aave': {
        handler: TokenHandlers.handleERC20Balance,
        args: [ADDRESSES.FBTC_ETHEREUM, ADDRESSES.AAVE_FBTC, 8, 'ethereum']
    },
    
    // LBTC balance (lbtc -> aave)
    'lbtc->aave': {
        handler: TokenHandlers.handleERC20Balance,
        args: [ADDRESSES.LBTC_ETHEREUM, ADDRESSES.AAVE_LBTC, 8, 'ethereum']
    },
    
    // cbBTC balance (cbbtc -> morpho)
    'cbbtc->morpho': {
        handler: TokenHandlers.handleERC20Balance,
        args: [ADDRESSES.CBTC_ETHEREUM, ADDRESSES.MORPHO_CBTC, 8, 'ethereum']
    },
    
    // tBTC balance (tbtc -> portal-bridge-tbtc)
    'tbtc->portal-bridge-tbtc': {
        handler: TokenHandlers.handleERC20Balance,
        args: [ADDRESSES.TBTC_ETHEREUM, ADDRESSES.PORTAL_BRIDGE_TBTC, 18, 'ethereum']
    },
    
    // WBTC balance (wbtc-eth -> morpho)
    'wbtc-eth->morpho': {
        handler: TokenHandlers.handleWBTCBalance,
        args: [ADDRESSES.MORPHO_WBTC]
    },
    
    // WBTC balance (wbtc-eth -> compound)
    'wbtc-eth->compound': {
        handler: TokenHandlers.handleWBTCBalanceMultiple,
        args: [[ADDRESSES.COMPOUND_WBTC_1, ADDRESSES.COMPOUND_WBTC_2, ADDRESSES.COMPOUND_WBTC_3]]
    },
    
    // IBC supply (axelar -> wbtc-eth-axl-osmo)
    'axelar->wbtc-eth-axl-osmo': {
        handler: TokenHandlers.handleCosmosSupply,
        args: [DENOMS.WBTC_ETH_AXL_OSMO, 8]
    },
    
    // IBC supply (eureka -> wbtc-eth-eur-osmo)
    'eureka->wbtc-eth-eur-osmo': {
        handler: TokenHandlers.handleCosmosSupply,
        args: [DENOMS.WBTC_ETH_EUR_OSMO, 8]
    },
    
    // LBTC supply (lombard -> lbtc)
    'lombard->lbtc': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.LBTC_ETHEREUM, 8, 'ethereum']
    },
    
    // LBTC supply on Base (lombard -> lbtc-base)
    'lombard->lbtc-base': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.LBTC_BASE, 8, 'base']
    },
    
    // LBTC supply on Binance Smart Chain (lombard -> lbtc-bsc)
    'lombard->lbtc-bsc': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.LBTC_BSC, 8, 'bsc']
    },
    
    // LBTC supply on Sui (lombard -> lbtc-sui)
    'lombard->lbtc-sui': {
        handler: TokenHandlers.handleSuiSupply,
        args: [DENOMS.LBTC_SUI]
    },
    
    // LBTC supply on Sonic (lombard -> lbtc-sonic)
    'lombard->lbtc-sonic': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.LBTC_SONIC, 8, 'sonic']
    },
    
    // LBTC supply on Katana (lombard -> lbtc-katana)
    'lombard->lbtc-katana': {
        handler: TokenHandlers.handleERC20Supply,
        args: [ADDRESSES.LBTC_KATANA, 8, 'katana']
    },
    
    // WBTC supply on Solana via Axelar (portal-bridge-wbtc -> wbtc-portal-solana)
    'portal-bridge-wbtc->wbtc-portal-solana': {
        handler: TokenHandlers.handleSolanaSupply,
        args: [ADDRESSES.WBTC_PORTAL_SOLANA]
    },
    
    // WBTC balance on Jupiter Perps account (wbtc-portal-solana -> jupiter-perps)
    'wbtc-portal-solana->jupiter-perps': {
        handler: TokenHandlers.handleSolanaBalance,
        args: [ADDRESSES.JUPITER_PERPS_WBTC]
    },
    
    // tBTC supply on Solana via Portal (portal-bridge-tbtc -> tbtc-portal-solana)
    'portal-bridge-tbtc->tbtc-portal-solana': {
        handler: TokenHandlers.handleSolanaSupply,
        args: [ADDRESSES.TBTC_PORTAL_SOLANA]
    },
    
    // WBTC balance on Drift (wbtc-portal-solana -> drift)
    'wbtc-portal-solana->drift': {
        handler: TokenHandlers.handleSolanaBalance,
        args: [ADDRESSES.DRIFT_WBTC]
    },
    
    // WBTC balance on Orca (wbtc-portal-solana -> orca)
    'wbtc-portal-solana->orca': {
        handler: TokenHandlers.handleSolanaBalance,
        args: [ADDRESSES.ORCA_WBTC]
    },
    
    // WBTC balance on Kamino (wbtc-portal-solana -> kamino)
    'wbtc-portal-solana->kamino': {
        handler: TokenHandlers.handleSolanaBalance,
        args: [ADDRESSES.KAMINO_WBTC]
    },

    'cbbtc-solana->kamino': {
        handler: TokenHandlers.handleSolanaBalance,
        args: [ADDRESSES.KAMINO_CBBTC]
    },
    
    // WBTC balance on Marginifi (wbtc-portal-solana -> marginifi)
    'wbtc-portal-solana->marginifi': {
        handler: TokenHandlers.handleSolanaBalance,
        args: [ADDRESSES.MARGINIFI_WBTC]
    },
    
    // Babylon staking (btc -> babylon)
    'btc->babylon': {
        handler: TokenHandlers.handleBabylonStaking,
        args: []
    },
    
    // Lombard reserves (babylon -> lombard)
    'babylon->lombard': {
        handler: TokenHandlers.handleLombardReserves,
        args: []
    },
    
    // Osmosis routes
    'internet-computer->ckbtc-osmosis': {
        handler: TokenHandlers.handleCosmosSupply,
        args: [DENOMS.CKBTC_OSMOSIS, 8]
    },
    
    'nomic->nbtc': {
        handler: TokenHandlers.handleCosmosSupply,
        args: [DENOMS.NOMIC_BTC, 14]
    },
    
    'nbtc->allbtc-issuer': {
        handler: TokenHandlers.handleCosmosBalance,
        args: [DENOMS.NOMIC_BTC, ADDRESSES.ALLBTC_ISSUER_OSMO, 14]
    },
    
    'wbtc-osmosis->allbtc-issuer': {
        handler: TokenHandlers.handleCosmosBalance,
        args: [DENOMS.WBTC_OSMOSIS, ADDRESSES.ALLBTC_ISSUER_OSMO, 8]
    },
    
    'ckbtc-osmosis->allbtc-issuer': {
        handler: TokenHandlers.handleCosmosBalance,
        args: [DENOMS.CKBTC_OSMOSIS, ADDRESSES.ALLBTC_ISSUER_OSMO, 8]
    },
    
    'wbtc-eth-axl-osmo->allbtc-issuer': {
        handler: TokenHandlers.handleCosmosBalance,
        args: [DENOMS.WBTC_ETH_AXL_OSMO, ADDRESSES.ALLBTC_ISSUER_OSMO, 8]
    },
    
    'wbtc-eth-eur-osmo->allbtc-issuer': {
        handler: TokenHandlers.handleCosmosBalance,
        args: [DENOMS.WBTC_ETH_EUR_OSMO, ADDRESSES.ALLBTC_ISSUER_OSMO, 8]
    },
    
    'allbtc-issuer->allbtc': {
        handler: TokenHandlers.handleCosmosSupply,
        args: [DENOMS.ALLBTC_ISSUER, 8]
    }
};

// In-memory cache for link labels with automatic expiration
const linkLabelCache = {};

/**
 * Determines the label for a link between two nodes based on their source and target IDs
 * @param {string} sourceId - The source node ID
 * @param {string} targetId - The target node ID
 * @returns {Promise<string|null>} - The label for the link, or null if no label is defined
 */
async function getLinkLabel(sourceId, targetId) {
    const key = `${sourceId}->${targetId}`;
    
    // Check if we have a cached result and if it's still valid (less than 1 minute old)
    const cached = linkLabelCache[key];
    const now = Date.now();
    const oneMinute = 60 * 1000; // 1 minute in milliseconds
    
    if (cached && (now - cached.timestamp) < oneMinute) {
        // Return cached result if it's still valid
        return cached.label;
    }
    
    // If cached result exists but is expired, remove it
    if (cached) {
        delete linkLabelCache[key];
    }
    
    // Check if we have a handler for this link
    const handlerConfig = LINK_LABEL_HANDLERS[key];
    
    if (!handlerConfig) {
        return null;
    }
    
    // Query the handler and cache the result
    const { handler, args } = handlerConfig;
    const label = await handler.apply(TokenHandlers, args);
    
    // Cache the result with timestamp
    linkLabelCache[key] = {
        label: label,
        timestamp: now
    };
    
    return label;
}

module.exports = {
    getLinkLabel
};
