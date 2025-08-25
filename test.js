const fs = require('fs');
const path = require('path');

// Import the GraphData class to access the graph data directly
const { GraphData } = require('./public/graph-data.js');
// Import the link handlers directly instead of parsing
const { LINK_LABEL_HANDLERS } = require('./links.js');

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
            linkHandlerExecution: { passed: 0, failed: 0, total: 0, networkErrors: 0 },
            nodeDescriptions: { passed: 0, failed: 0, total: 0 }
        };
        
        // Get the graph data once during initialization
        this.graphData = GraphData.getSampleGraph();
    }

    // Test 1: Check if all descriptions have corresponding nodes/frames
    testDescriptions() {
        console.log('\n🔍 Testing descriptions consistency...');
        
        const descriptionsDir = path.join(__dirname, 'public', 'descriptions');
        
        if (!fs.existsSync(descriptionsDir)) {
            this.addError('Descriptions directory not found');
            return;
        }
        
        // Extract all node IDs from the graph data
        const allNodes = this.extractAllNodes();
        
        if (this.verbose) {
            console.log(`Found ${allNodes.length} nodes in graph data`);
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
                this.addError(`Description file '${descFile}.html' has no corresponding node in graph data`);
            }
        }
        
        console.log(`✅ Descriptions test: ${this.testResults.descriptions.passed}/${this.testResults.descriptions.total} passed`);
    }

    // Test 2: Check if all links have valid source and target nodes
    testLinks() {
        console.log('\n🔗 Testing links consistency...');
        
        const allNodes = this.extractAllNodes();
        const links = this.graphData.links || [];
        
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

    // Test 2.5: Check if all nodes and frames have corresponding description files
    testNodeDescriptions() {
        console.log('\n📚 Testing node descriptions coverage...');
        
        const descriptionsDir = path.join(__dirname, 'public', 'descriptions');
        
        if (!fs.existsSync(descriptionsDir)) {
            this.addError('Descriptions directory not found');
            return;
        }
        
        // Get all nodes from the graph data
        const allNodes = this.extractAllNodes();
        
        // Get all description files
        const descriptionFiles = fs.readdirSync(descriptionsDir)
            .filter(file => file.endsWith('.html'))
            .map(file => file.replace('.html', ''));
        
        // Create a set for faster lookup
        const descriptionSet = new Set(descriptionFiles);
        
        this.testResults.nodeDescriptions = { passed: 0, failed: 0, total: 0 };
        this.testResults.nodeDescriptions.total = allNodes.length;
        
        if (this.verbose) {
            console.log(`Found ${allNodes.length} nodes to check for descriptions`);
        }
        
        for (const node of allNodes) {
            if (descriptionSet.has(node)) {
                this.testResults.nodeDescriptions.passed++;
                if (this.verbose) {
                    console.log(`  ✅ ${node} -> description found`);
                }
            } else {
                this.testResults.nodeDescriptions.failed++;
                this.addError(`Node '${node}' has no corresponding description file`);
            }
        }
        
        console.log(`✅ Node descriptions test: ${this.testResults.nodeDescriptions.passed}/${this.testResults.nodeDescriptions.total} passed`);
    }

    // Test 3: Check if all links in links.js correspond to existing links with text:true
    testLinkTexts() {
        console.log('\n📝 Testing link text consistency...');
        
        const linksWithText = this.extractLinksWithText();
        const linkHandlers = this.extractLinkHandlers();
        
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
        
        const linksWithText = this.extractLinksWithText();
        const linkHandlers = this.extractLinkHandlers();
        
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
                this.addError(`Link handler '${handler}' has no corresponding link with text:true in graph data`);
            }
        }
        
        console.log(`✅ Link handlers test: ${this.testResults.linkHandlers.passed}/${this.testResults.linkHandlers.total} passed`);
    }

    // Test 5: Check if all link handlers can actually execute and return data
    async testLinkHandlerExecution() {
        console.log('\n🔧 Testing link handler execution...');
        
        try {
            // Dynamically import the links.js file to access the handlers
            const linksModule = require('./links.js');
            
            // Get the link handlers directly
            const linkHandlers = this.extractLinkHandlers();
            
            this.testResults.linkHandlerExecution = { passed: 0, failed: 0, total: 0, networkErrors: 0 };
            this.testResults.linkHandlerExecution.total = linkHandlers.length;
            
            if (this.verbose) {
                console.log(`Found ${linkHandlers.length} handlers to test`);
                console.log('Running tests in parallel for better performance...');
            } else {
                console.log(`Testing ${linkHandlers.length} handlers in parallel...`);
            }
            
            // Temporarily suppress console.error to avoid network error spam
            const originalConsoleError = console.error;
            if (!this.verbose) {
                console.error = () => {}; // Suppress errors in non-verbose mode
            }
            
            try {
                // Create an array of promises for all handler tests with staggered start times
                // to avoid overwhelming RPC endpoints while maintaining parallel execution
                const handlerPromises = linkHandlers.map(async (handlerKey, index) => {
                    // Add a small staggered delay to avoid overwhelming RPC endpoints
                    const delay = index * 50; // 50ms delay between each handler start
                    if (delay > 0) {
                        await new Promise(resolve => setTimeout(resolve, delay));
                    }
                    
                    try {
                        // Try to get the link label using the getLinkLabel function
                        const result = await linksModule.getLinkLabel(...handlerKey.split('->'));
                        
                        if (result !== null && result !== undefined) {
                            // Check if the result indicates an error state
                            if (result === 'Error' || result.includes('Error')) {
                                return { handlerKey, success: false, result, error: null, type: 'error_state' };
                            } else {
                                return { handlerKey, success: true, result, error: null, type: 'success' };
                            }
                        } else {
                            return { handlerKey, success: false, result, error: null, type: 'null_result' };
                        }
                    } catch (error) {
                        // Check if it's a network error (common for RPC endpoints)
                        if (error.code === 'ENOTFOUND' || error.message.includes('fetch') || error.message.includes('network') || error.message.includes('invalid json')) {
                            return { handlerKey, success: false, result: null, error, type: 'network_error' };
                        } else {
                            return { handlerKey, success: false, result: null, error, type: 'execution_error' };
                        }
                    }
                });
                
                // Execute all handlers in parallel
                const results = await Promise.allSettled(handlerPromises);
                
                // Process the results
                for (const result of results) {
                    if (result.status === 'fulfilled') {
                        const { handlerKey, success, result: handlerResult, error, type } = result.value;
                        
                        if (success) {
                            this.testResults.linkHandlerExecution.passed++;
                            if (this.verbose) {
                                console.log(`  ✅ ${handlerKey} -> executed successfully (${typeof handlerResult})`);
                            }
                        } else {
                            this.testResults.linkHandlerExecution.failed++;
                            
                            switch (type) {
                                case 'error_state':
                                    this.addError(`Link handler '${handlerKey}' returned error state: ${handlerResult}`);
                                    break;
                                case 'null_result':
                                    this.addError(`Link handler '${handlerKey}' returned null/undefined`);
                                    break;
                                case 'network_error':
                                    this.testResults.linkHandlerExecution.networkErrors++;
                                    if (this.verbose) {
                                        console.log(`  ⚠️ ${handlerKey} -> network error (${error.message})`);
                                    }
                                    break;
                                case 'execution_error':
                                    this.addError(`Link handler '${handlerKey}' failed to execute: ${error.message}`);
                                    break;
                            }
                        }
                    } else {
                        // This shouldn't happen with our current implementation, but handle it just in case
                        this.testResults.linkHandlerExecution.failed++;
                        this.addError(`Link handler test failed with unexpected error: ${result.reason}`);
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

    // Helper methods - now using the imported graph data instead of regex parsing
    extractAllNodes() {
        const nodes = new Set();
        
        // Extract nodes from frames
        if (this.graphData.frames) {
            this.graphData.frames.forEach(frame => {
                if (frame.nodes && Array.isArray(frame.nodes)) {
                    frame.nodes.forEach(node => nodes.add(node));
                }
                // Also add frame IDs
                nodes.add(frame.id);
            });
        }
        
        // Extract standalone nodes that are referenced in links but not in frames
        if (this.graphData.links) {
            this.graphData.links.forEach(link => {
                nodes.add(link.source);
                nodes.add(link.target);
            });
        }
        
        return Array.from(nodes);
    }

    extractLinksWithText() {
        const links = [];
        
        if (this.graphData.links) {
            this.graphData.links.forEach(link => {
                if (link.text === true) {
                    links.push({
                        source: link.source,
                        target: link.target
                    });
                }
            });
        }
        
        return links;
    }

    extractLinkHandlers() {
        // Use the imported LINK_LABEL_HANDLERS object directly
        return Object.keys(LINK_LABEL_HANDLERS);
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
        this.testNodeDescriptions(); // Added this line
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
