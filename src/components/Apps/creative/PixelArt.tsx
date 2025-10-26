'use client';
import { useState, useRef, useCallback } from 'react';
import './PixelArt.css';

const CANVAS_SIZE = 400;
const GRID_SIZE = 16;

export default function PixelArt() {
  const [color, setColor] = useState('#ff6b6b');
  const [pixels, setPixels] = useState<Record<string, string>>({});
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#222f3e', '#c8d6e5', '#ffffff', '#000000'
  ];

  const getPixelKey = (x: number, y: number) => `${x},${y}`;

  const handlePixelClick = (x: number, y: number) => {
    const key = getPixelKey(x, y);
    setPixels(prev => ({
      ...prev,
      [key]: prev[key] === color ? '' : color
    }));
  };

  const handleMouseDown = (x: number, y: number) => {
    setIsDrawing(true);
    handlePixelClick(x, y);
  };

  const handleMouseEnter = (x: number, y: number) => {
    if (isDrawing) {
      handlePixelClick(x, y);
    }
  };

  const clearCanvas = () => {
    setPixels({});
  };

  const saveImage = () => {
    alert('Pixel art saved! (This would download the image in a real app)');
  };

  return (
    <div className="pixel-art">
      <div className="toolbar">
        <h3>Pixel Art Studio</h3>
        <div className="tools">
          <button onClick={clearCanvas} className="tool-btn">Clear</button>
          <button onClick={saveImage} className="tool-btn">Save</button>
        </div>
      </div>

      <div className="editor">
        <div className="color-palette">
          {colors.map((paletteColor) => (
            <button
              key={paletteColor}
              className={`color-swatch ${color === paletteColor ? 'active' : ''}`}
              style={{ backgroundColor: paletteColor }}
              onClick={() => setColor(paletteColor)}
            />
          ))}
        </div>

        <div
          ref={canvasRef}
          className="pixel-canvas"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: CANVAS_SIZE,
            height: CANVAS_SIZE
          }}
          onMouseLeave={() => setIsDrawing(false)}
          onMouseUp={() => setIsDrawing(false)}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const pixelColor = pixels[getPixelKey(x, y)];

            return (
              <div
                key={index}
                className="pixel"
                style={{ backgroundColor: pixelColor || '#f0f0f0' }}
                onMouseDown={() => handleMouseDown(x, y)}
                onMouseEnter={() => handleMouseEnter(x, y)}
                onTouchStart={() => handleMouseDown(x, y)}
              />
            );
          })}
        </div>

        <div className="editor-info">
          <div className="current-color">
            Current: <div className="color-preview" style={{ backgroundColor: color }} />
          </div>
          <div className="hotkeys">
            Click and drag to draw • Double-click color to pick
          </div>
        </div>
      </div>
    </div>
  );
}