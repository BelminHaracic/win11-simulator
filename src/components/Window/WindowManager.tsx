'use client';
import { useWindowStore } from '@/stores/windowStore';
import Window from './Window';
import './Apps.css';
import FileExplorer from '../Apps/FileExplorer';
import SettingsApp from '../Apps/settings/SettingsApp';
// DODAJ OVE IMPORT-E
import SpaceInvaders from '../Apps/games/SpaceInvaders';
import MusicPlayer from '../Apps/media/MusicPlayer';
import PixelArt from '../Apps/creative/PixelArt';

export default function WindowManager() {
  const { windows } = useWindowStore();

  const renderAppContent = (window: any) => {
    switch (window.type) {
      case 'notepad':
        return (
          <div className="notepad-app">
            <div className="notepad-toolbar">
              <div className="notepad-menu">
                <span>File</span>
                <span>Edit</span>
                <span>Format</span>
                <span>View</span>
                <span>Help</span>
              </div>
            </div>
            <textarea 
              className="notepad-textarea"
              placeholder="Start typing..."
            />
          </div>
        );
      case 'explorer':
        return <FileExplorer />;
      case 'browser':
        return (
          <div className="browser-app">
            <div className="browser-toolbar">
              <div className="browser-nav">
                <button className="nav-button">←</button>
                <button className="nav-button">→</button>
                <button className="nav-button">↻</button>
                <input 
                  className="address-bar"
                  value="https://www.microsoft.com/edge"
                  readOnly
                />
              </div>
            </div>
            <div className="browser-content">
              <div className="browser-welcome">
                <h1>Microsoft Edge</h1>
                <p>Welcome to the web browser</p>
              </div>
            </div>
          </div>
        );
      case 'terminal':
        return (
          <div className="terminal-app">
            <div className="terminal-header">
              <span>Windows Terminal</span>
            </div>
            <div className="terminal-content">
              <div className="terminal-output">
                <div>Microsoft Windows [Version 10.0.22621.2428]</div>
                <div>(c) Microsoft Corporation. All rights reserved.</div>
                <br/>
                <div>C:\Users\User&gt;</div>
              </div>
              <input 
                className="terminal-input"
                type="text"
                placeholder="Type commands here..."
              />
            </div>
          </div>
        );
      case 'settings':
        return <SettingsApp />;
      // DODAJ OVE NOVE CASE-OVE
      case 'space-invaders':
        return <SpaceInvaders />;
      case 'music-player':
        return <MusicPlayer />;
      case 'pixel-art':
        return <PixelArt />;
      default:
        return <div>Unknown app: {window.type}</div>;
    }
  };

  return (
    <>
      {windows.map((window) => (
        <Window key={window.id} window={window}>
          {renderAppContent(window)}
        </Window>
      ))}
    </>
  );
}