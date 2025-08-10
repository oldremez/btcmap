# D3.js Graph Visualization Web Server

A minimal web server that renders interactive graphs using D3.js. This project demonstrates a force-directed graph visualization with interactive features.

## Features

- **Force-directed graph layout** using D3.js physics simulation
- **Interactive nodes** that can be dragged and repositioned
- **Zoom and pan** functionality for exploring large graphs
- **Dynamic graph generation** with random node and link creation
- **Responsive design** with modern UI styling
- **Real-time updates** with smooth animations

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
   http://localhost:3000
   ```

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

To run in development mode:
```bash
npm run dev
```

The server will automatically restart when you make changes to the code.

## License

MIT License - feel free to use this project for learning and development purposes.
