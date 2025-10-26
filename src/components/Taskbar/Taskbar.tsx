'use client';
import { useState, useEffect } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { AppType } from '@/stores/windowStore';
import './Taskbar.css';

interface PinnedApp {
  type: AppType;
  name: string;
  icon: string;
}

const pinnedApps: PinnedApp[] = [
  { type: 'explorer', name: 'File Explorer', icon: '/icons/explorer.png' },
  { type: 'browser', name: 'Microsoft Edge', icon: '/icons/edge.png' },
  { type: 'notepad', name: 'Notepad', icon: '/icons/notepad.png' },
  { type: 'terminal', name: 'Terminal', icon: '/icons/terminal.png' },
  { type: 'settings', name: 'Settings', icon: '/icons/settings.png' },
  { type: 'space-invaders', name: 'Space Invaders', icon: '/icons/game.png' },
  { type: 'music-player', name: 'Music Player', icon: '/icons/music.png' },
  { type: 'pixel-art', name: 'Pixel Art', icon: '/icons/paint.png' },
];

export default function Taskbar() {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { windows, openWindow, toggleWindow } = useWindowStore();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getWindowIcon = (type: AppType): string => {
    const icons: Record<AppType, string> = {
      'notepad': '/icons/notepad.png',
      'explorer': '/icons/explorer.png',
      'browser': '/icons/edge.png',
      'terminal': '/icons/terminal.png',
      'settings': '/icons/settings.png',
      'space-invaders': '/icons/game.png',
      'music-player': '/icons/music.png',
      'pixel-art': '/icons/paint.png'
    };
    return icons[type] || '/icons/explorer.png';
  };

  const handlePowerOption = (option: string) => {
    console.log(`Power option selected: ${option}`);
    setShowPowerMenu(false);
    setShowStartMenu(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <div className="taskbar">
        {/* Left Section */}
        <div className="taskbar-left">
          {/* Start Button */}
          <button
            onClick={() => setShowStartMenu(!showStartMenu)}
            className={`start-button ${showStartMenu ? 'start-button-active' : ''}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="start-button-icon">
              <path fill="currentColor" d="M12,3L4,9V21H20V9L12,3M12,7.7C13.1,7.7 14,8.6 14,9.7C14,10.8 13.1,11.7 12,11.7C10.9,11.7 10,10.8 10,9.7C10,8.6 10.9,7.7 12,7.7M18,19H6V17.6C6,15.6 10,14.5 12,14.5C14,14.5 18,15.6 18,17.6V19Z"/>
            </svg>
          </button>

          {/* Search Button */}
          <button className="search-button">
            <div className="search-button-content">
              <svg width="16" height="16" viewBox="0 0 16 16" className="search-button-icon">
                <path fill="currentColor" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <span>Search</span>
            </div>
          </button>

          {/* Taskbar Apps */}
          <div className="taskbar-apps">
            {pinnedApps.map((app) => (
              <button
                key={app.type}
                className="taskbar-app"
                onClick={() => openWindow(app.type, app.name)}
                title={app.name}
              >
                <img src={app.icon} alt={app.name} className="taskbar-app-icon" />
              </button>
            ))}
          </div>
        </div>

        {/* Center Section - Open Windows */}
        <div className="taskbar-center">
          {windows.map((window) => (
            <button
              key={window.id}
              onClick={() => toggleWindow(window.id)}
              className={`taskbar-window ${window.focused ? 'taskbar-window-active' : ''}`}
              title={window.title}
            >
              <div className="taskbar-window-content">
                <img src={getWindowIcon(window.type)} alt={window.title} className="taskbar-window-icon" />
                <span className="taskbar-window-title">{window.title}</span>
              </div>
              <div className="taskbar-window-indicator"></div>
            </button>
          ))}
        </div>

       {/* Right Section - System Tray */}
<div className="taskbar-right">
  <div className="system-tray">
    <div className="tray-icons">
      <button className="tray-icon hidden-icons" title="Show hidden icons">
        <img src="/icons/chevron-up.png" alt="Hidden icons" className="tray-icon-img" />
      </button>
      <div className="tray-separator"></div>
      <button className="tray-icon" title="Network">
        <img src="/icons/wifi.png" alt="Network" className="tray-icon-img" />
      </button>
      <button className="tray-icon" title="Volume">
        <img src="/icons/volume.png" alt="Volume" className="tray-icon-img" />
      </button>
      <button className="tray-icon" title="Battery">
        <img src="/icons/battery.png" alt="Battery" className="tray-icon-img" />
      </button>
    </div>
    <button className="time-date">
      <div className="time">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="date">
        {currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}
      </div>
    </button>
  </div>
</div></div>

      {/* Start Menu */}
      {showStartMenu && (
        <div className="start-menu">
          <div className="start-menu-search">
            <div className="search-container">
              <svg width="18" height="18" viewBox="0 0 18 18" className="search-icon-img">
                <path fill="currentColor" d="M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"/>
              </svg>
              <input
                type="text"
                placeholder="Type here to search"
                className="search-input"
              />
            </div>
          </div>
          <div className="start-menu-content">
            <div className="pinned-apps">
              <div className="apps-grid">
                {pinnedApps.map((app) => (
                  <button
                    key={app.type}
                    className="pinned-app"
                    onClick={() => {
                      openWindow(app.type, app.name);
                      setShowStartMenu(false);
                    }}
                  >
                    <div className="pinned-app-icon">
                      <img src={app.icon} alt={app.name} />
                    </div>
                    <span className="pinned-app-name">{app.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="recommended-section">
              <div className="section-title">Recommended</div>
              <div className="recommended-items">
                <div className="recommended-item">
                  <div className="item-icon">📄</div>
                  <div className="item-info">
                    <div className="item-title">Document.pdf</div>
                    <div className="item-subtitle">Today</div>
                  </div>
                </div>
                <div className="recommended-item">
                  <div className="item-icon">🖼️</div>
                  <div className="item-info">
                    <div className="item-title">Image.jpg</div>
                    <div className="item-subtitle">Yesterday</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="start-menu-footer">
              <button className="user-button">
                <div className="user-avatar">
                  <span>U</span>
                </div>
                <span className="user-name">User</span>
              </button>
              <div className="power-buttons">
                <button 
                  className="power-button" 
                  title="Power"
                  onClick={() => setShowPowerMenu(!showPowerMenu)}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" className="power-button-icon">
                    <path fill="currentColor" d="M9 3V1h1v2zm0 12V7h1v8zm4.9-10.9l-1.4-1.4 1.4 1.4zM4.1 4.1L2.7 5.5l1.4-1.4zM15 9c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Power Menu */}
          {showPowerMenu && (
            <div className="power-menu">
              <button 
                className="power-option"
                onClick={() => handlePowerOption('sleep')}
              >
                <div className="power-option-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" className="power-option-img">
                    <path fill="currentColor" d="M9 1v8h7l-2.5-2.5L15 5l-4-4-2 2V1z"/>
                  </svg>
                </div>
                <div className="power-option-info">
                  <div className="power-option-title">Sleep</div>
                  <div className="power-option-desc">Save your session</div>
                </div>
              </button>
              <button 
                className="power-option"
                onClick={() => handlePowerOption('restart')}
              >
                <div className="power-option-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" className="power-option-img">
                    <path fill="currentColor" d="M9 1v2a6 6 0 1 0 6 6h2a8 8 0 1 1-8-8z"/>
                  </svg>
                </div>
                <div className="power-option-info">
                  <div className="power-option-title">Restart</div>
                  <div className="power-option-desc">Update and restart</div>
                </div>
              </button>
              <button 
                className="power-option"
                onClick={() => handlePowerOption('shutdown')}
              >
                <div className="power-option-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" className="power-option-img">
                    <path fill="currentColor" d="M9 1v8h7l-2.5-2.5L15 5l-4-4-2 2V1z"/>
                  </svg>
                </div>
                <div className="power-option-info">
                  <div className="power-option-title">Shut down</div>
                  <div className="power-option-desc">Turn off the device</div>
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}