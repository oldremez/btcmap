# Bitcoin Liquidity Map

A comprehensive visualization of Bitcoin's liquidity across different blockchain networks and protocols.

## Features

- **Interactive Graph**: D3.js-based visualization of Bitcoin liquidity flows
- **Multi-Chain Support**: Covers Ethereum, Solana, Osmosis, Base, Kava, Neutron, and more
- **Real-time Data**: Live token supply and balance information
- **Clickable Nodes**: Click on any node to view detailed descriptions
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
