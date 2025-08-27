# 4-7-8 Breathing Timer

A simple, elegant breathing timer that guides you through the 4-7-8 breathing technique using Tailwind CSS.

## Features

- **4-7-8 Breathing Pattern**: 4 seconds inhale, 7 seconds hold, 8 seconds exhale
- **Visual Progress Bar**: Segments that fill as time progresses
- **Customizable Cycles**: Set the number of breathing cycles to complete
- **Clean UI**: Modern, minimalist design with Tailwind CSS
- **Responsive**: Works on desktop and mobile devices

## Project Structure

```
4-7-8-timer/
├── public/           # Public assets
│   ├── index.html    # Main HTML file
│   └── script.js     # JavaScript functionality
├── src/              # Source files
│   └── input.css     # Tailwind CSS source
├── dist/             # Build output
│   └── output.css    # Compiled CSS
├── package.json      # NPM configuration
├── tailwind.config.js # Tailwind configuration
└── postcss.config.js # PostCSS configuration
```

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build CSS**:
   ```bash
   npm run build
   ```

3. **Development mode** (watch for changes):
   ```bash
   npm run dev
   ```

## Usage

1. Open `public/index.html` in your browser
2. Set the number of cycles you want to complete
3. Click "Start" to begin the breathing session
4. Follow the visual cues and timer
5. Use "Reset" to stop and return to the beginning

## Development

- **Build CSS**: `npm run build`
- **Watch mode**: `npm run dev` or `npm run watch`
- **Source files**: Edit `src/input.css` for styles, `public/script.js` for functionality

## Technologies

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **PostCSS**: CSS processing
- **Autoprefixer**: Vendor prefixing

## License

[MIT](LICENSE)