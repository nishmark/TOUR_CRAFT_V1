# Tour Builder Chrome Extension

A Chrome extension for building guided tours by tracking user interactions on websites. Perfect for creating interactive onboarding flows and product tours.

## Files Created

- **manifest.json** - Extension configuration file with permissions
- **popup.html** - The tour builder control interface
- **popup.css** - Modern styling for the popup
- **popup.js** - Interactive functionality and API communication
- **content.js** - Main content script for element detection and highlighting
- **background.js** - Service worker for message passing
- **highlight.css** - CSS for element highlighting during tour building

## How to Install

1. Open Chrome browser
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select this folder (my_extension)
6. The extension should now appear in your browser toolbar

## How to Use

1. **Set up your webapp**: Open `http://localhost:3000/Buildtour` in your browser
2. **Start building**: Click the extension icon and press "Start Building Tour"
3. **Navigate**: Go to the website where you want to build the tour
4. **Record steps**:
   - Hover over elements to see them highlighted in red
   - Click on elements to record them as tour steps
   - Each click sends data to your API endpoint
5. **Stop building**: Click "Stop Building" when finished

## Features

- 🎯 **Element Detection**: Automatically detects and highlights DOM elements
- 📊 **Real-time Tracking**: Sends element data to your API as you click
- 🔍 **Smart Selectors**: Generates reliable CSS selectors for elements
- 📍 **Position Tracking**: Captures element positions and dimensions
- 🎨 **Visual Feedback**: Live highlighting and notifications
- 📈 **Step Counter**: Tracks number of recorded steps
- 🔄 **Status Management**: Shows building status in real-time

## Data Sent to API

Each click sends this data structure to `http://localhost:3000/Buildtour`:

```json
{
  "tourData": {
    "selector": "#submit-button",
    "tagName": "button",
    "textContent": "Submit Form",
    "attributes": { "id": "submit-button", "class": "btn primary" },
    "position": { "x": 300, "y": 150, "width": 120, "height": 40 },
    "viewportPosition": { "x": 300, "y": 150 },
    "timestamp": "2024-01-15T10:30:00Z",
    "stepNumber": 1,
    "url": "https://example.com/form"
  },
  "metadata": {
    "userAgent": "Mozilla/5.0...",
    "url": "https://example.com/form",
    "title": "Contact Form"
  }
}
```

## API Configuration

- **Endpoint**: `http://localhost:3000/Buildtour`
- **Method**: POST
- **Auth**: Bearer token with API key `apikey1234`
- **Content-Type**: application/json

## Customization

You can easily customize:

- API endpoint in `content.js` (API_ENDPOINT constant)
- API key in `content.js` (API_KEY constant)
- Highlight colors in `highlight.css`
- UI styling in `popup.css`
- Data structure in the `extractElementData` function
