# Bitcoin Liquidity Map

A comprehensive visualization of Bitcoin's liquidity across different blockchain networks and protocols.

See the public deployment on https://btcmap.tech/

## Features

- **Interactive Graph**: D3.js-based visualization of Bitcoin liquidity flows
- **Multi-Chain Support**: Covers Ethereum, Solana, Osmosis, Base, Kava, Neutron, and more
- **Real-time Data**: Live token supply and balance information
- **Clickable Nodes**: Click on any node to view detailed descriptions
- **Link to Node**: Direct links to focus on specific nodes via URL parameters
- **Responsive Design**: Works on desktop and mobile devices
- **Developer Mode**: Advanced controls for graph manipulation and position saving

## Clickable Nodes

Nodes in the graph are now clickable! Click on any node to open a popup window with detailed information about that node.

### How it works:

1. **Click any node** in the graph
2. **Popup window opens** with detailed information
3. **Close the popup** by:
   - Clicking the × button
   - Clicking outside the popup
   - Pressing the Escape key

### Node Descriptions

Node descriptions are stored as HTML files in the `public/descriptions/` directory. Each file should be named `<node-id>.html` where `<node-id>` matches the node ID in the graph data.

**Example**: For a node with ID `bitcoin`, create `public/descriptions/bitcoin.html`

### Creating Node Descriptions

To add a description for a node:

1. Create an HTML file in `public/descriptions/`
2. Name it `<node-id>.html` (e.g., `wbtc-eth.html`)
3. Write your HTML content with any styling you want
4. The popup will automatically load and display your content

**Note**: If no description file exists for a node, clicking on it will not open the popup.

## Link to Node Feature

You can now create direct links to specific nodes in the graph using URL parameters. This feature allows users to share links that automatically focus on and highlight specific nodes.

### Usage

To link directly to a node, add the `node` parameter to the URL:

```
https://btcmap.tech/?node=bitcoin
https://btcmap.tech/?node=wbtc-eth  
https://btcmap.tech/?node=solvbtc
```

### How it works:

1. **URL Parameter**: Add `?node=<node-id>` to any URL
2. **Auto-Focus**: The graph will automatically center on the specified node
3. **Highlighting**: The target node will be highlighted with a glowing effect
4. **Link Highlighting**: Connected links will also be highlighted to show relationships
5. **Click to Highlight**: Click on any node to highlight it and update the URL
6. **Clear Highlight**: Click on empty space to clear highlighting and update URL

### Available Node IDs

You can link to any node in the graph. Common node IDs include:
- `bitcoin` - Bitcoin native
- `wbtc-eth` - Wrapped Bitcoin on Ethereum
- `solvbtc` - Solv BTC
- `tbtc` - Threshold Bitcoin
- `cbbtc` - Coinbase Wrapped Bitcoin
- `kraken` - Kraken exchange
- And many more...

**Tip**: You can find all available node IDs in the `public/node-positions.json` file or by inspecting the graph data.

### Copy Link Feature

When viewing a node's description popup, you'll see a copy link icon (📋) in the header next to the close button. Clicking this icon will copy a direct link to that specific node to your clipboard.

**How it works:**
1. **Click any node** to open its description popup
2. **Click the copy link icon** (📋) in the popup header
3. **Link copied** - the button will briefly show a checkmark (✓) to confirm
4. **Share the link** - paste the copied URL anywhere to share that specific node

**Example copied links:**
- `https://btcmap.tech/?node=bitcoin` - Direct link to Bitcoin node
- `https://btcmap.tech/?node=wbtc-eth` - Direct link to WBTC Ethereum token
- `https://btcmap.tech/?node=kraken` - Direct link to Kraken issuer

### Interactive Features

- **Click any node** to highlight it and automatically update the URL
- **Click empty space** to clear highlighting and remove the node parameter from URL
- **Browser navigation** (back/forward buttons) works with highlighting state
- **Shareable links** - any highlighted node state can be shared via URL
- **Copy link button** - click the copy icon in node popups to copy direct links

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd btcmap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Development

### Environment Variables

Create a `.env` file in the root directory:

```env
DEV_MODE=true
PORT=3000
ENABLE_HTTPS=true
```

### Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm run dev` - Start in development mode

### Graph Data Structure

The graph data is defined in `public/graph-data.js` and includes:

- **Nodes**: Individual entities (tokens, protocols, issuers)
- **Links**: Connections between nodes
- **Frames**: Visual groupings of related nodes

### Adding New Nodes

To add a new node:

1. Add the node definition to the `nodes` array in `graph-data.js`
2. Add any connections to the `links` array
3. Optionally create a description file in `public/descriptions/`

## Architecture

- **Frontend**: HTML, CSS, JavaScript with D3.js for visualization
- **Backend**: Node.js with Express.js
- **Data**: Real-time blockchain data via various APIs
- **Styling**: Custom CSS with responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Add your license information here]

## Support

For questions or support, please [create an issue](link-to-issues) or contact the development team.

## Thanks

Kudos to projects that were useful during the development:

- [Crypto Logos](https://cryptologos.cc/) for svg logos
- [Chainlist](https://chainlist.org/) for API
- [dRPC](https://drpc.org/) for RPCs
