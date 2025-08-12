# D3.js Graph Visualization Web Server

A minimal web server that renders interactive graphs using D3.js. This project demonstrates a force-directed graph visualization with interactive features.

## Features

- **Force-directed graph layout** using D3.js physics simulation
- **Interactive nodes** that can be dragged and repositioned (dev mode only)
- **Zoom and pan** functionality for exploring large graphs
- **Dynamic graph generation** with random node and link creation
- **Responsive design** with modern UI styling
- **Real-time updates** with smooth animations
- **Development mode** with additional controls and features (enabled via environment variable)
- **HTTPS support** with automatic SSL certificate generation and HTTP to HTTPS redirect

## Project Structure

```
btcmap/
├── package.json          # Node.js dependencies and scripts
├── server.js            # Express web server
├── public/
│   ├── index.html       # Main HTML page with UI
│   ├── graph-data.js    # Graph data definitions and generators
│   └── graph.js         # D3.js graph logic and visualization
└── README.md            # This file
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to:
   ```
   HTTPS (recommended): https://localhost:3443
   HTTP (redirects to HTTPS): http://localhost:3000
   ```

## HTTPS Support

The server automatically supports both HTTP and HTTPS:

### Automatic Setup
- **Self-signed certificates** are automatically generated on first run
- **HTTPS server** runs on port 3443 by default
- **HTTP to HTTPS redirect** automatically redirects HTTP traffic to HTTPS
- **Fallback to HTTP-only** if HTTPS setup fails

### Manual Configuration
You can customize HTTPS settings using environment variables:

```bash
# Copy the example configuration
cp config.env.example .env

# Edit the configuration
nano .env
```

Available HTTPS options:
- `ENABLE_HTTPS=true/false` - Enable/disable HTTPS (default: true)
- `HTTPS_PORT=3443` - HTTPS port number
- `DOMAIN_NAME=localhost` - Domain name for SSL certificate (default: localhost)
- `SSL_KEY_PATH=./key.pem` - Path to private key file
- `SSL_CERT_PATH=./cert.pem` - Path to certificate file

### Example: Custom Domain
For production use with a real domain:

```bash
# .env file
DOMAIN_NAME=yourdomain.com
HTTPS_PORT=443
ENABLE_HTTPS=true
```

**Note**: For production domains, you'll need to:
1. Generate proper SSL certificates (not self-signed)
2. Use a certificate authority like Let's Encrypt
3. Place the certificates in the paths specified by `SSL_KEY_PATH` and `SSL_CERT_PATH`

### Manual Certificate Generation
If you prefer to generate certificates manually:

```bash
# Generate private key
openssl genrsa -out key.pem 2048

# Generate certificate (replace 'yourdomain.com' with your actual domain)
openssl req -new -x509 -key key.pem -out cert.pem -days 365 \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=yourdomain.com"
```

**For localhost development:**
```bash
openssl req -new -x509 -key key.pem -out cert.pem -days 365 \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

### Browser Security Warning
Since self-signed certificates are used, browsers will show security warnings. This is normal for development. Click "Advanced" and "Proceed to localhost" to continue.

## Usage

- **Generate Random Graph**: Click to create a new random graph with varying numbers of nodes and connections
- **Clear Graph**: Remove all nodes and links from the visualization
- **Drag Nodes**: Click and drag nodes to reposition them
- **Zoom**: Use mouse wheel or pinch gestures to zoom in/out
- **Pan**: Click and drag on empty space to pan around the graph

## Technologies Used

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: D3.js v7 (loaded via CDN)
- **Physics**: D3.js force simulation for automatic layout

## Customization

You can easily modify the graph by editing these files:

- **`public/graph-data.js`**: Graph data structure, node/link properties, random generation logic
- **`public/graph.js`**: D3.js visualization logic, layout forces, interaction handling
- **`public/index.html`**: UI styling, layout, and controls

**Key customization areas:**
- **Node properties**: Size, color, labels, groups
- **Link properties**: Thickness, color, distance
- **Layout forces**: Repulsion, attraction, collision detection
- **Visual styling**: Colors, fonts, sizes

## Development

### Dev Mode

Dev mode provides additional development features like:
- Node dragging and repositioning
- Export/import of node positions
- Development controls panel
- Position persistence

To enable dev mode, set the `DEV_MODE` environment variable:

```bash
# Enable dev mode
DEV_MODE=true npm start

# Or on Windows
set DEV_MODE=true && npm start

# Or export for the session
export DEV_MODE=true
npm start
```

To run in development mode with auto-restart:
```bash
npm run dev
```

The server will automatically restart when you make changes to the code.

## License

MIT License - feel free to use this project for learning and development purposes.
