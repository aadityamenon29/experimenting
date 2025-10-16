# Train Journey - Interactive 3D Experience

A beautiful, elegant React application featuring an immersive 3D train interior visualization built with Three.js and React Three Fiber.

## Features

- 🚂 **Interactive 3D Train Interior** - Explore the inside of a train with realistic compartments
- 👥 **Diverse Animated Passengers** - Various characters including a businessman, student, elderly person, mother with child, worker, tourist, doctor, and artist
- 🎨 **Beautiful Animations** - Each passenger performs unique animated activities:
  - Businessman working on laptop
  - Student reading a book
  - Elderly person with a cane
  - Mother holding a baby
  - Child playing with a toy
  - Worker with tools
  - Tourist taking photos
  - Doctor reviewing clipboard
  - Artist painting on canvas
- 🎮 **Full Camera Controls** - Rotate, pan, and zoom to explore every detail
- 💫 **Elegant Design** - Modern UI with smooth animations and atmospheric lighting

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Controls

- **Left Click + Drag**: Rotate the camera view
- **Right Click + Drag**: Pan around the scene
- **Mouse Wheel**: Zoom in and out

## Technology Stack

- **React** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Vite** - Build tool and dev server

## Project Structure

```
├── public/
│   └── train.svg          # Favicon
├── src/
│   ├── components/
│   │   ├── TrainScene.jsx      # Main 3D scene setup
│   │   ├── TrainInterior.jsx   # Train structure (walls, seats, windows)
│   │   └── Passengers.jsx      # Animated passenger characters
│   ├── App.jsx            # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## License

ISC
