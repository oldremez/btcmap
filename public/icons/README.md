# Frame Icons

This directory contains SVG icons for the blockchain frames in the Bitcoin map visualization.

## How It Works

Icons are automatically detected and loaded based on the frame ID. The system follows this naming convention:

- Frame ID: `ethereum-frame` → Icon file: `ethereum-frame.svg`
- Frame ID: `solana-frame` → Icon file: `solana-frame.svg`
- Frame ID: `bitcoin-frame` → Icon file: `bitcoin-frame.svg`

## Adding Icons

To add an icon for a frame:

1. Create an SVG file named exactly the same as the frame ID
2. Place it in this `public/icons/` directory
3. The icon will automatically appear next to the frame label

## Icon Requirements

- **Format**: SVG files only
- **Size**: Recommended 24x24 viewBox for consistency
- **Naming**: Must match the frame ID exactly
- **Path**: Must be accessible at `/icons/{frame-id}.svg`

## Example

For a frame with ID `ethereum-frame`, create `public/icons/ethereum-frame.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <!-- Your icon content here -->
</svg>
```

## Current Icons

- `ethereum-frame.svg` - Ethereum blockchain icon
- `solana-frame.svg` - Solana blockchain icon  
- `bitcoin-frame.svg` - Bitcoin blockchain icon

## No Icon Fallback

If no icon file exists for a frame, only the text label will be displayed. No default or fallback icons are used.
