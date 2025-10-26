'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useWindowStore, WindowState } from '@/stores/windowStore';
import './Window.css';

interface WindowProps {
  window: WindowState;
  children?: React.ReactNode;
}

export default function Window({ window: windowProp, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore();

  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ 
    x: 0, y: 0, 
    width: 0, height: 0,
    direction: ''
  });

  // Destructure prop to avoid conflict with global window object
  const { minimized, maximized, position, size, id, focused, type, title, zIndex } = windowProp;

  if (minimized) {
    return null;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && 
        (e.target.closest('.window-control') || e.target.closest('.resize-handle'))) {
      return;
    }
    
    focusWindow(id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    focusWindow(id);
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      direction
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !maximized) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, viewportWidth - 100));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, viewportHeight - 50));
        
        updateWindowPosition(id, { x: newX, y: newY });
      }

      if (isResizing && !maximized) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = position.x;
        let newY = position.y;

        switch (resizeStart.direction) {
          case 'right':
            newWidth = Math.max(320, resizeStart.width + deltaX);
            break;
          case 'bottom':
            newHeight = Math.max(240, resizeStart.height + deltaY);
            break;
          case 'bottom-right':
            newWidth = Math.max(320, resizeStart.width + deltaX);
            newHeight = Math.max(240, resizeStart.height + deltaY);
            break;
          case 'left':
            newWidth = Math.max(320, resizeStart.width - deltaX);
            newX = Math.max(0, position.x + deltaX);
            break;
          case 'top':
            newHeight = Math.max(240, resizeStart.height - deltaY);
            newY = Math.max(0, position.y + deltaY);
            break;
          case 'top-right':
            newWidth = Math.max(320, resizeStart.width + deltaX);
            newHeight = Math.max(240, resizeStart.height - deltaY);
            newY = Math.max(0, position.y + deltaY);
            break;
          case 'bottom-left':
            newWidth = Math.max(320, resizeStart.width - deltaX);
            newHeight = Math.max(240, resizeStart.height + deltaY);
            newX = Math.max(0, position.x + deltaX);
            break;
          case 'top-left':
            newWidth = Math.max(320, resizeStart.width - deltaX);
            newHeight = Math.max(240, resizeStart.height - deltaY);
            newX = Math.max(0, position.x + deltaX);
            newY = Math.max(0, position.y + deltaY);
            break;
        }

        updateWindowSize(id, { width: newWidth, height: newHeight });
        if (newX !== position.x || newY !== position.y) {
          updateWindowPosition(id, { x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = isDragging ? 'grabbing' : 'default';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [
    isDragging, 
    isResizing, 
    dragOffset, 
    resizeStart, 
    maximized, 
    id, 
    position,
    updateWindowPosition, 
    updateWindowSize
  ]);

  const getWindowIcon = (appType: string) => {
    const icons: { [key: string]: string } = {
      'explorer': '📁',
      'browser': '🌐',
      'notepad': '📄',
      'terminal': '💻',
      'settings': '⚙️',
      'space-invaders': '🎮',
      'music-player': '🎵',
      'pixel-art': '🎨'
    };
    return icons[appType] || '📁';
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        className={`window ${focused ? 'window-focused' : ''} ${maximized ? 'window-maximized' : ''}`}
        style={{
          left: maximized ? 0 : position.x,
          top: maximized ? 0 : position.y,
          width: maximized ? '100vw' : size.width,
          height: maximized ? '100vh' : size.height,
          zIndex: zIndex,
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={() => focusWindow(id)}
      >
        {/* Title Bar */}
        <div 
          className="window-titlebar"
          onMouseDown={handleMouseDown}
        >
          <div className="titlebar-left">
            <div className="window-icon">{getWindowIcon(type)}</div>
            <span className="window-title">{title || getDefaultTitle(type)}</span>
          </div>
          <div className="titlebar-right">
            <div className="window-controls">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                className="window-control window-minimize"
                title="Minimize"
              >
                <span className="control-symbol">−</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  maximizeWindow(id);
                }}
                className="window-control window-maximize"
                title={maximized ? "Restore" : "Maximize"}
              >
                <span className="control-symbol">{maximized ? '❐' : '□'}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(id);
                }}
                className="window-control window-close"
                title="Close"
              >
                <span className="control-symbol">×</span>
              </button>
            </div>
          </div>
        </div>

        {/* Window Content */}
        <div className="window-content">
          {children}
        </div>

        {/* Resize Handles - samo kada nije maximized */}
        {!maximized && (
          <>
            <div className="resize-handle resize-right" onMouseDown={(e) => handleResizeMouseDown(e, 'right')}/>
            <div className="resize-handle resize-bottom" onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}/>
            <div className="resize-handle resize-bottom-right" onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}/>
            <div className="resize-handle resize-left" onMouseDown={(e) => handleResizeMouseDown(e, 'left')}/>
            <div className="resize-handle resize-top" onMouseDown={(e) => handleResizeMouseDown(e, 'top')}/>
            <div className="resize-handle resize-top-right" onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}/>
            <div className="resize-handle resize-bottom-left" onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}/>
            <div className="resize-handle resize-top-left" onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}/>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function getDefaultTitle(type: string): string {
  const titles: { [key: string]: string } = {
    'explorer': 'File Explorer',
    'browser': 'Microsoft Edge',
    'notepad': 'Notepad',
    'terminal': 'Windows Terminal',
    'settings': 'Settings',
    'space-invaders': 'Space Invaders',
    'music-player': 'Music Player',
    'pixel-art': 'Pixel Art'
  };
  return titles[type] || 'Application';
}