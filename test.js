const fs = require('fs');
const path = require('path');

// Test suite for data consistency
class DataConsistencyTester {
    constructor(options = {}) {
        this.verbose = options.verbose || false;
        this.errors = [];
        this.warnings = [];
        this.testResults = {
            descriptions: { passed: 0, failed: 0, total: 0 },
            links: { passed: 0, failed: 0, total: 0 },
            linkTexts: { passed: 0, failed: 0, total: 0 },
            linkHandlers: { passed: 0, failed: 0, total: 0 },
            linkHandlerExecution: { passed: 0, failed: 0, total: 0, networkErrors: 0 }
        };
    }

    // Test 1: Check if all descriptions have corresponding nodes/frames
    testDescriptions() {
        console.log('\n🔍 Testing descriptions consistency...');
        
        const descriptionsDir = path.join(__dirname, 'public', 'descriptions');
        const graphDataPath = path.join(__dirname, 'public', 'graph-data.js');
        
        if (!fs.existsSync(descriptionsDir)) {
            this.addError('Descriptions directory not found');
            return;
        }
        
        if (!fs.existsSync(graphDataPath)) {
            this.addError('Graph data file not found');
            return;
        }

        // Read graph data to extract all node IDs
        const graphDataContent = fs.readFileSync(graphDataPath, 'utf8');
        const allNodes = this.extractAllNodes(graphDataContent);
        
        if (this.verbose) {
            console.log(`Found ${allNodes.length} nodes in graph-data.js`);
        }
        
        // Get all description files
        const descriptionFiles = fs.readdirSync(descriptionsDir)
            .filter(file => file.endsWith('.html'))
            .map(file => file.replace('.html', ''));
        
        this.testResults.descriptions.total = descriptionFiles.length;
        
        for (const descFile of descriptionFiles) {
            if (allNodes.includes(descFile)) {
                this.testResults.descriptions.passed++;
                if (this.verbose) {
                    console.log(`  ✅ ${descFile}.html -> found node`);
                }
            } else {
                this.testResults.descriptions.failed++;
                this.addError(`Description file '${descFile}.html' has no corresponding node in graph-data.js`);
            }
        }
        
        console.log(`✅ Descriptions test: ${this.testResults.descriptions.passed}/${this.testResults.descriptions.total} passed`);
    }

    // Test 2: Check if all links have valid source and target nodes
    testLinks() {
        console.log('\n🔗 Testing links consistency...');
        
        const graphDataPath = path.join(__dirname, 'public', 'graph-data.js');
        
        if (!fs.existsSync(graphDataPath)) {
            this.addError('Graph data file not found');
            return;
        }

        const graphDataContent = fs.readFileSync(graphDataPath, 'utf8');
        const allNodes = this.extractAllNodes(graphDataContent);
        const links = this.extractLinks(graphDataContent);
        
        this.testResults.links.total = links.length;
        
        if (this.verbose) {
            console.log(`Found ${links.length} links to validate`);
        }
        
        for (const link of links) {
            if (allNodes.includes(link.source) && allNodes.includes(link.target)) {
                this.testResults.links.passed++;
                if (this.verbose) {
                    console.log(`  ✅ ${link.source} -> ${link.target}`);
                }
            } else {
                this.testResults.links.failed++;
                if (!allNodes.includes(link.source)) {
                    this.addError(`Link has invalid source node: '${link.source}' -> '${link.target}'`);
                }
                if (!allNodes.includes(link.target)) {
                    this.addError(`Link has invalid target node: '${link.source}' -> '${link.target}'`);
                }
            }
        }
        
        console.log(`✅ Links test: ${this.testResults.links.passed}/${this.testResults.links.total} passed`);
    }

    // Test 3: Check if all links in links.js correspond to existing links with text:true
    testLinkTexts() {
        console.log('\n📝 Testing link text consistency...');
        
        const linksJsPath = path.join(__dirname, 'links.js');
        const graphDataPath = path.join(__dirname, 'public', 'graph-data.js');
        
        if (!fs.existsSync(linksJsPath) || !fs.existsSync(graphDataPath)) {
            this.addError('Required files not found for link text test');
            return;
        }

        const linksJsContent = fs.readFileSync(linksJsPath, 'utf8');
        const graphDataContent = fs.readFileSync(graphDataPath, 'utf8');
        
        const linksWithText = this.extractLinksWithText(graphDataContent);
        const linkHandlers = this.extractLinkHandlers(linksJsContent);
        
        this.testResults.linkTexts.total = linksWithText.length;
        
        if (this.verbose) {
            console.log(`Found ${linksWithText.length} links with text:true and ${linkHandlers.length} handlers`);
        }
        
        for (const link of linksWithText) {
            const linkKey = `${link.source}->${link.target}`;
            if (linkHandlers.includes(linkKey)) {
                this.testResults.linkTexts.passed++;
                if (this.verbose) {
                    console.log(`  ✅ ${linkKey} -> handler found`);
                }
            } else {
                this.testResults.linkTexts.failed++;
                this.addError(`Link with text:true '${linkKey}' has no corresponding handler in links.js`);
            }
        }
        
        console.log(`✅ Link texts test: ${this.testResults.linkTexts.passed}/${this.testResults.linkTexts.total} passed`);
    }

    // Test 4: Check if all links in links.js correspond to existing links with text:true
    testLinkHandlers() {
        console.log('\n⚙️ Testing link handlers consistency...');
        
        const linksJsPath = path.join(__dirname, 'links.js');
        const graphDataPath = path.join(__dirname, 'public', 'graph-data.js');
        
        if (!fs.existsSync(linksJsPath) || !fs.existsSync(graphDataPath)) {
            this.addError('Required files not found for link handlers test');
            return;
        }

        const linksJsContent = fs.readFileSync(linksJsPath, 'utf8');
        const graphDataContent = fs.readFileSync(graphDataPath, 'utf8');
        
        const linksWithText = this.extractLinksWithText(graphDataContent);
        const linkHandlers = this.extractLinkHandlers(linksJsContent);
        
        this.testResults.linkHandlers.total = linkHandlers.length;
        
        for (const handler of linkHandlers) {
            const [source, target] = handler.split('->');
            const hasCorrespondingLink = linksWithText.some(link => 
                link.source === source && link.target === target
            );
            
            if (hasCorrespondingLink) {
                this.testResults.linkHandlers.passed++;
                if (this.verbose) {
                    console.log(`  ✅ ${handler} -> link with text:true found`);
                }
            } else {
                this.testResults.linkHandlers.failed++;
                this.addError(`Link handler '${handler}' has no corresponding link with text:true in graph-data.js`);
            }
        }
        
        console.log(`✅ Link handlers test: ${this.testResults.linkHandlers.passed}/${this.testResults.linkHandlers.total} passed`);
    }

    // Test 5: Check if all link handlers can actually execute and return data
    async testLinkHandlerExecution() {
        console.log('\n🔧 Testing link handler execution...');
        
        const linksJsPath = path.join(__dirname, 'links.js');
        
        if (!fs.existsSync(linksJsPath)) {
            this.addError('Links.js file not found for handler execution test');
            return;
        }

        try {
            // Dynamically import the links.js file to access the handlers
            const linksModule = require('./links.js');
            
            // Get the LINK_LABEL_HANDLERS from the module
            const linksJsContent = fs.readFileSync(linksJsPath, 'utf8');
            const linkHandlers = this.extractLinkHandlers(linksJsContent);
            
            this.testResults.linkHandlerExecution = { passed: 0, failed: 0, total: 0, networkErrors: 0 };
            this.testResults.linkHandlerExecution.total = linkHandlers.length;
            
            if (this.verbose) {
                console.log(`Found ${linkHandlers.length} handlers to test`);
            }
            
            // Temporarily suppress console.error to avoid network error spam
            const originalConsoleError = console.error;
            if (!this.verbose) {
                console.error = () => {}; // Suppress errors in non-verbose mode
            }
            
            try {
                // Test each handler by trying to execute it
                for (const handlerKey of linkHandlers) {
                    try {
                        // Try to get the link label using the getLinkLabel function
                        const result = await linksModule.getLinkLabel(...handlerKey.split('->'));
                        
                        if (result !== null && result !== undefined) {
                            // Check if the result indicates an error or loading state
                            if (result === 'Error' || result === 'Loading...' || result === 'Loading' || result.includes('Error') || result.includes('Loading')) {
                                this.testResults.linkHandlerExecution.failed++;
                                this.addError(`Link handler '${handlerKey}' returned error/loading state: ${result}`);
                            } else {
                                this.testResults.linkHandlerExecution.passed++;
                                if (this.verbose) {
                                    console.log(`  ✅ ${handlerKey} -> executed successfully (${typeof result})`);
                                }
                            }
                        } else {
                            this.testResults.linkHandlerExecution.failed++;
                            this.addError(`Link handler '${handlerKey}' returned null/undefined`);
                        }
                    } catch (error) {
                        // Check if it's a network error (common for RPC endpoints)
                        if (error.code === 'ENOTFOUND' || error.message.includes('fetch') || error.message.includes('network') || error.message.includes('invalid json')) {
                            this.testResults.linkHandlerExecution.networkErrors++;
                            if (this.verbose) {
                                console.log(`  ⚠️ ${handlerKey} -> network error (${error.message})`);
                            }
                            // Network errors should count as failures since they indicate the handler can't work
                            this.testResults.linkHandlerExecution.failed++;
                        } else {
                            this.testResults.linkHandlerExecution.failed++;
                            this.addError(`Link handler '${handlerKey}' failed to execute: ${error.message}`);
                        }
                    }
                }
            } finally {
                // Restore console.error
                console.error = originalConsoleError;
            }
            
            const networkErrorCount = this.testResults.linkHandlerExecution.networkErrors;
            const successCount = this.testResults.linkHandlerExecution.passed;
            const failureCount = this.testResults.linkHandlerExecution.failed;
            
            console.log(`✅ Link handler execution test: ${successCount}/${this.testResults.linkHandlerExecution.total} passed`);
            if (networkErrorCount > 0) {
                console.log(`⚠️ Network errors: ${networkErrorCount} (these don't count as failures)`);
            }
            
        } catch (error) {
            this.addError(`Failed to test link handlers: ${error.message}`);
        }
    }

    // Helper methods
    extractAllNodes(graphDataContent) {
        const nodes = new Set();
        
        // Extract nodes from frames
        const frameMatches = graphDataContent.match(/nodes:\s*\[([^\]]+)\]/g);
        if (frameMatches) {
            frameMatches.forEach(match => {
                const nodeList = match.match(/\[([^\]]+)\]/)[1];
                const nodeNames = nodeList.split(',').map(n => n.trim().replace(/"/g, ''));
                nodeNames.forEach(node => nodes.add(node));
            });
        }
        
        // Extract standalone nodes (not in frames)
        const standaloneMatches = graphDataContent.match(/id:\s*"([^"]+)"/g);
        if (standaloneMatches) {
            standaloneMatches.forEach(match => {
                const nodeId = match.match(/"([^"]+)"/)[1];
                // Include both frame IDs and node IDs
                nodes.add(nodeId);
            });
        }
        
        return Array.from(nodes);
    }

    extractLinks(graphDataContent) {
        const links = [];
        // More comprehensive regex to catch all link patterns
        const linkMatches = graphDataContent.match(/\{\s*source:\s*"([^"]+)",\s*target:\s*"([^"]+)"[^}]*\}/g);
        
        if (linkMatches) {
            linkMatches.forEach(match => {
                const sourceMatch = match.match(/source:\s*"([^"]+)"/);
                const targetMatch = match.match(/target:\s*"([^"]+)"/);
                
                if (sourceMatch && targetMatch) {
                    links.push({
                        source: sourceMatch[1],
                        target: targetMatch[1]
                    });
                }
            });
        }
        
        return links;
    }

    extractLinksWithText(graphDataContent) {
        const links = [];
        // More comprehensive regex to catch all links with text:true
        const linkMatches = graphDataContent.match(/\{\s*source:\s*"([^"]+)",\s*target:\s*"([^"]+)"[^}]*text:\s*true[^}]*\}/g);
        
        if (linkMatches) {
            linkMatches.forEach(match => {
                const sourceMatch = match.match(/source:\s*"([^"]+)"/);
                const targetMatch = match.match(/target:\s*"([^"]+)"/);
                
                if (sourceMatch && targetMatch) {
                    links.push({
                        source: sourceMatch[1],
                        target: targetMatch[1]
                    });
                }
            });
        }
        
        return links;
    }

    extractLinkHandlers(linksJsContent) {
        const handlers = [];
        // More comprehensive regex to catch all handler definitions
        const handlerMatches = linksJsContent.match(/'([^']+->[^']+)':\s*\{/g);
        
        if (handlerMatches) {
            handlerMatches.forEach(match => {
                const handler = match.match(/'([^']+)'/)[1];
                handlers.push(handler);
            });
        }
        
        return handlers;
    }

    addError(message) {
        this.errors.push(message);
        console.log(`❌ ${message}`);
    }

    addWarning(message) {
        this.warnings.push(message);
        console.log(`⚠️ ${message}`);
    }

    async runAllTests() {
        console.log('🚀 Starting data consistency tests...\n');
        
        this.testDescriptions();
        this.testLinks();
        this.testLinkTexts();
        this.testLinkHandlers();
        await this.testLinkHandlerExecution(); // Wait for async test to complete
        
        this.printSummary();
    }

    printSummary() {
        console.log('\n📊 Test Summary');
        console.log('================');
        
        const totalTests = Object.values(this.testResults).reduce((sum, category) => sum + category.total, 0);
        const totalPassed = Object.values(this.testResults).reduce((sum, category) => sum + category.passed, 0);
        const totalFailed = Object.values(this.testResults).reduce((sum, category) => sum + category.failed, 0);
        
        console.log(`Total tests: ${totalTests}`);
        console.log(`Passed: ${totalPassed}`);
        console.log(`Failed: ${totalFailed}`);
        
        if (this.errors.length > 0) {
            console.log(`\n❌ Errors (${this.errors.length}):`);
            this.errors.forEach((error, index) => {
                console.log(`  ${index + 1}. ${error}`);
            });
        }
        
        if (this.warnings.length > 0) {
            console.log(`\n⚠️ Warnings (${this.warnings.length}):`);
            this.warnings.forEach((warning, index) => {
                console.log(`  ${index + 1}. ${warning}`);
            });
        }
        
        if (totalFailed === 0) {
            console.log('\n🎉 All tests passed! Data consistency is maintained.');
        } else {
            console.log('\n💥 Some tests failed. Please review the errors above.');
        }
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    // Check for command line arguments
    const args = process.argv.slice(2);
    const verbose = args.includes('--verbose') || args.includes('-v');
    
    const tester = new DataConsistencyTester({ verbose });
    
    // Handle async execution
    tester.runAllTests().catch(error => {
        console.error('❌ Test execution failed:', error);
        process.exit(1);
    });
}

module.exports = DataConsistencyTester;
