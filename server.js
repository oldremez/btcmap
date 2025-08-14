const express = require('express');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const { BlockchainUtils, TokenHandlers } = require('./helpers');
const { getLinkLabel } = require('./links');

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

// Route to query link labels
app.post('/api/link-label', async (req, res) => {
    try {
        const { source, target } = req.body;
        
        // Determine label based on source/target combination
        const sourceId = typeof source === 'object' ? source.id : source;
        const targetId = typeof target === 'object' ? target.id : target;
        
        // Get the label using the new function
        const label = await getLinkLabel(sourceId, targetId);
        
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
