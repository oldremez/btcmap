# Icons Directory

This directory contains SVG icons for the blockchain frames in the Bitcoin map.

## How to Add Icons

1. **Create SVG files**: Add your SVG icon files to this directory
2. **Update graph-data.js**: Add an `icon` property to the frame definition pointing to your icon file

## Example

```javascript
{
    id: "your-frame", 
    label: "Your Blockchain",
    nodes: [...],
    color: "#your-color",
    strokeWidth: 2,
    padding: 20,
    icon: "/icons/your-icon.svg"  // Path to your icon file
}
```

## Icon Requirements

- **Format**: SVG files only
- **Size**: Recommended 32x32 viewBox for consistency
- **Colors**: Use appropriate colors for the blockchain (e.g., Ethereum blue, Bitcoin orange)
- **Style**: Simple, recognizable logos work best at small sizes

## Current Icons

- `ethereum.svg` - Ethereum logo (blue)
- `bitcoin.svg` - Bitcoin logo (orange) 
- `solana.svg` - Solana logo (black with green accents)

## Notes

- Icons are only displayed when the `icon` property is specified
- No default icons are shown - frames without icons will display only text
- Icons are positioned to the left of the frame label text
