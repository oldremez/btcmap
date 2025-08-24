# Data Consistency Test Suite

This test suite validates the consistency of data across your Bitcoin Liquidity Map project files.

## What It Tests

The test suite performs four main consistency checks:

### 1. Descriptions Consistency ✅
- **Purpose**: Ensures all HTML description files in `public/descriptions/` have corresponding nodes or frames in `graph-data.js`
- **What it checks**: Every `.html` file should represent either a node ID or a frame ID that exists in the graph data
- **Common issues**: Description files that don't have corresponding nodes or frames
- **Note**: The test checks both individual nodes and frame containers, so descriptions can match either type

### 2. Links Consistency ✅
- **Purpose**: Validates that all links in `graph-data.js` have valid source and target nodes
- **What it checks**: Every link's `source` and `target` should reference existing nodes
- **Common issues**: Typos in node names or references to non-existent nodes

### 3. Link Text Consistency ✅
- **Purpose**: Ensures all links with `text: true` have corresponding handlers in `links.js`
- **What it checks**: Links that should display dynamic text must have backend handlers
- **Common issues**: Missing handler definitions for links that need dynamic labels

### 4. Link Handlers Consistency ✅
- **Purpose**: Verifies that all handlers in `links.js` correspond to links with `text: true`
- **What it checks**: Every handler should serve a link that actually needs dynamic text
- **Common issues**: Orphaned handlers or missing `text: true` properties

### 5. Link Handler Execution ✅
- **Purpose**: Validates that all link handlers can actually execute and return valid data
- **What it checks**: Each handler can be called successfully and returns valid results (not error/loading states)
- **Common issues**: Network errors, invalid RPC endpoints, or handler implementation bugs
- **Note**: Handlers that return "Error" or "Loading..." are considered failures since they indicate the handler can't provide real data

## How to Run

### Option 1: Using npm scripts (recommended)

#### Standard test run
```bash
npm test
```

#### Verbose test run (shows detailed progress)
```bash
npm run test:verbose
```

### Option 2: Direct execution

#### Standard mode
```bash
node test.js
```

#### Verbose mode
```bash
node test.js --verbose
# or
node test.js -v
```

## Test Output

The test provides detailed feedback:

- ✅ **Passed tests**: Data is consistent
- ❌ **Failed tests**: Data inconsistencies found
- 📊 **Summary**: Overall test results and recommendations

### Verbose Mode Benefits

When running with `--verbose` flag, you get:
- **Node counts**: Total number of nodes, links, and handlers found
- **Individual results**: Each successful test shows what was validated
- **Progress tracking**: Real-time feedback on what's being tested
- **Debugging help**: Easier to identify where issues occur

## Example Output

### Standard Mode
```
🚀 Starting data consistency tests...

🔍 Testing descriptions consistency...
✅ Descriptions test: 68/70 passed

🔗 Testing links consistency...
✅ Links test: 140/140 passed

📝 Testing link text consistency...
✅ Link texts test: 106/121 passed

⚙️ Testing link handlers consistency...
✅ Link handlers test: 106/121 passed

🔧 Testing link handler execution...
❌ Link handler 'lombard->lbtc-sui' returned error/loading state: Loading...
❌ Link handler 'lombard->lbtc-sonic' returned error/loading state: Loading...
❌ Link handler 'lombard->lbtc-katana' returned error/loading state: Loading...
✅ Link handler execution test: 118/121 passed

📊 Test Summary
================
Total tests: 576
Passed: 570
Failed: 6

❌ Errors (6):
  1. Link with text:true 'int3face->btc-int3-osmosis' has no corresponding handler in links.js
  2. Link with text:true 'int3face->btc-int3-neutron' has no corresponding handler in links.js
  3. Link with text:true 'btc-int3-osmosis->allbtc-osmosis-issuer' has no corresponding handler in links.js
  4. Link handler 'lombard->lbtc-sui' returned error/loading state: Loading...
  5. Link handler 'lombard->lbtc-sonic' returned error/loading state: Loading...
  6. Link handler 'lombard->lbtc-katana' returned error/loading state: Loading...

💡 Recommendations:
  1. Ensure all links with text:true have corresponding handlers in links.js
  2. Verify that all handlers in links.js correspond to links with text:true in graph-data.js
  3. Check network connectivity for RPC endpoints that are failing
```

### Verbose Mode
```
🚀 Starting data consistency tests...

🔍 Testing descriptions consistency...
Found 283 nodes in graph-data.js
  ✅ allbtc-osmosis-issuer.html -> found node
  ✅ allbtc-osmosis.html -> found node
❌ Description file 'bob-frame.html' has no corresponding node in graph-data.js
  ✅ bitcoin.html -> found node
  ✅ bitgo.html -> found node
✅ Descriptions test: 68/70 passed

🔗 Testing links consistency...
Found 140 links to validate
  ✅ bitcoin -> btc
  ✅ btc -> babylon
  ✅ btc -> bitgo
✅ Links test: 140/140 passed
...
```

## Fixing Common Issues

### Frame Descriptions Without Nodes
If you see errors like `'bob-frame.html' has no corresponding node`:
- Either remove the description file if it's not needed
- Or add a corresponding node to `graph-data.js`

### Missing Link Handlers
If you see errors like `'wbtc-eth->wbtc-eth-polygon' has no corresponding handler`:
- Add a handler definition in `links.js` for the missing link
- Or remove `text: true` from the link if it doesn't need dynamic text

### Orphaned Handlers
If you see errors like `'handler-name' has no corresponding link with text:true`:
- Either add the corresponding link to `graph-data.js` with `text: true`
- Or remove the handler if it's no longer needed

## Integration

This test can be integrated into your development workflow:

- **Pre-commit hooks**: Run tests before committing changes
- **CI/CD pipelines**: Automate consistency checks
- **Development workflow**: Run tests after making data changes

### Recommended Workflow
1. **After data changes**: Run `npm test` to check consistency
2. **Debugging issues**: Use `npm run test:verbose` for detailed output
3. **Pre-commit**: Ensure all tests pass before committing

## File Dependencies

The test requires these files to exist:
- `public/graph-data.js` - Graph structure and links
- `public/descriptions/` - HTML description files
- `links.js` - Link handler definitions

## Contributing

To add new test cases:
1. Extend the `DataConsistencyTester` class
2. Add your test method
3. Update the `runAllTests()` method
4. Add test results tracking

## Troubleshooting

If tests fail unexpectedly:
1. Check file paths and permissions
2. Verify file syntax (valid JavaScript/HTML)
3. Ensure all required files exist
4. Check for special characters in file names

### Common Error Patterns
- **Missing files**: Ensure all required files exist and are readable
- **Syntax errors**: Check for valid JavaScript/HTML syntax
- **Path issues**: Verify relative paths are correct
- **Permission errors**: Ensure read access to all files
