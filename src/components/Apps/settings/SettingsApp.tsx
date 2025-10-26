'use client';
import { useState } from 'react';
import './SettingsApp.css';

type SettingsCategory = 'system' | 'personalization' | 'accounts' | 'privacy' | 'apps' | 'network' | 'gaming';

export default function SettingsApp() {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('system');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'system' as SettingsCategory, name: 'System', icon: '⚙️', description: 'Display, sound, notifications, power' },
    { id: 'personalization' as SettingsCategory, name: 'Personalization', icon: '🎨', description: 'Background, colors, themes' },
    { id: 'accounts' as SettingsCategory, name: 'Accounts', icon: '👤', description: 'Your accounts, sync settings' },
    { id: 'privacy' as SettingsCategory, name: 'Privacy & security', icon: '🔒', description: 'Location, camera, microphone' },
    { id: 'apps' as SettingsCategory, name: 'Apps', icon: '📱', description: 'Uninstall, default apps' },
    { id: 'network' as SettingsCategory, name: 'Network & internet', icon: '🌐', description: 'Wi-Fi, Ethernet, VPN' },
    { id: 'gaming' as SettingsCategory, name: 'Gaming', icon: '🎮', description: 'Game mode, graphics, Xbox' },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSettingsContent = () => {
    switch (activeCategory) {
      case 'system':
        return <SystemSettings />;
      case 'personalization':
        return <PersonalizationSettings />;
      case 'accounts':
        return <AccountsSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'apps':
        return <AppsSettings />;
      case 'network':
        return <NetworkSettings />;
      case 'gaming':
        return <GamingSettings />;
      default:
        return <SystemSettings />;
    }
  };

  return (
    <div className="settings-app">
      {/* Header */}
      <div className="settings-header">
        <div className="header-left">
          <h1 className="settings-title">Settings</h1>
        </div>
        <div className="header-right">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Find a setting"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="settings-content">
        {/* Navigation Sidebar */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                className={`nav-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="nav-icon">{category.icon}</span>
                <div className="nav-text">
                  <div className="nav-name">{category.name}</div>
                  <div className="nav-description">{category.description}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="settings-main">
          <div className="settings-panel">
            {renderSettingsContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

// System Settings Component
function SystemSettings() {
  const [displayBrightness, setDisplayBrightness] = useState(80);
  const [volume, setVolume] = useState(70);
  const [batterySaver, setBatterySaver] = useState(false);
  const [focusAssist, setFocusAssist] = useState('off');

  return (
    <div className="settings-panel-content">
      <h2>System</h2>
      <p className="panel-description">Display, sound, notifications, power</p>
      
      <div className="settings-section">
        <h3>Display</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Brightness</label>
            <span className="setting-value">{displayBrightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={displayBrightness}
            onChange={(e) => setDisplayBrightness(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Night light</label>
            <span className="setting-value">Off</span>
          </div>
          <button className="toggle-button">Configure</button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Sound</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Volume</label>
            <span className="setting-value">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>

      <div className="settings-section">
        <h3>Power & battery</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Battery saver</label>
            <span className="setting-value">{batterySaver ? 'On' : 'Off'}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={batterySaver}
              onChange={(e) => setBatterySaver(e.target.checked)}
            />
            <span className="slider-round"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Power mode</label>
            <span className="setting-value">Balanced</span>
          </div>
          <select className="dropdown">
            <option>Best power efficiency</option>
            <option>Balanced</option>
            <option>Best performance</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>Focus assist</h3>
        <div className="setting-item">
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="focusAssist"
                value="off"
                checked={focusAssist === 'off'}
                onChange={(e) => setFocusAssist(e.target.value)}
              />
              <span className="radio-label">Off</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="focusAssist"
                value="priority"
                checked={focusAssist === 'priority'}
                onChange={(e) => setFocusAssist(e.target.value)}
              />
              <span className="radio-label">Priority only</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="focusAssist"
                value="alarms"
                checked={focusAssist === 'alarms'}
                onChange={(e) => setFocusAssist(e.target.value)}
              />
              <span className="radio-label">Alarms only</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// Personalization Settings Component
function PersonalizationSettings() {
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('#0078d4');
  const [transparency, setTransparency] = useState(true);

  const colors = [
    '#0078d4', '#107c10', '#5c2d91', '#d83b01', 
    '#e3008c', '#008272', '#0078d4', '#76608a'
  ];

  return (
    <div className="settings-panel-content">
      <h2>Personalization</h2>
      <p className="panel-description">Background, colors, themes</p>

      <div className="settings-section">
        <h3>Background</h3>
        <div className="background-options">
          {['Windows spotlight', 'Picture', 'Solid color', 'Slideshow'].map(option => (
            <div key={option} className="background-option">
              <div className="option-preview"></div>
              <span className="option-label">{option}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3>Colors</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Choose your mode</label>
          </div>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            className="dropdown"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Accent color</label>
          </div>
          <div className="color-picker">
            {colors.map(color => (
              <button
                key={color}
                className={`color-option ${accentColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setAccentColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Transparency effects</label>
            <span className="setting-value">{transparency ? 'On' : 'Off'}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={transparency}
              onChange={(e) => setTransparency(e.target.checked)}
            />
            <span className="slider-round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

// Accounts Settings Component
function AccountsSettings() {
  const [users, setUsers] = useState([
    { name: 'Local User', email: 'user@localhost', type: 'Local account' },
    { name: 'Microsoft Account', email: 'user@outlook.com', type: 'Microsoft account' }
  ]);

  return (
    <div className="settings-panel-content">
      <h2>Your accounts</h2>
      <p className="panel-description">Your accounts, sync settings, work access</p>

      <div className="settings-section">
        <h3>Your info</h3>
        <div className="account-card">
          <div className="account-avatar">👤</div>
          <div className="account-info">
            <div className="account-name">Local User</div>
            <div className="account-email">Local account</div>
          </div>
          <button className="account-button">Manage account</button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Email & accounts</h3>
        {users.map((user, index) => (
          <div key={index} className="account-item">
            <div className="account-details">
              <div className="account-name">{user.name}</div>
              <div className="account-email">{user.email}</div>
            </div>
            <button className="text-button">Remove</button>
          </div>
        ))}
        <button className="add-account-button">+ Add account</button>
      </div>

      <div className="settings-section">
        <h3>Sync your settings</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Sync settings</label>
            <span className="setting-value">Off</span>
          </div>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider-round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

// Privacy Settings Component
function PrivacySettings() {
  const [location, setLocation] = useState(true);
  const [camera, setCamera] = useState(false);
  const [microphone, setMicrophone] = useState(false);

  return (
    <div className="settings-panel-content">
      <h2>Privacy & security</h2>
      <p className="panel-description">Location, camera, microphone</p>

      <div className="settings-section">
        <h3>Location</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Location services</label>
            <span className="setting-value">{location ? 'On' : 'Off'}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={location}
              onChange={(e) => setLocation(e.target.checked)}
            />
            <span className="slider-round"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>App permissions</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Camera</label>
            <span className="setting-value">{camera ? 'On' : 'Off'}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={camera}
              onChange={(e) => setCamera(e.target.checked)}
            />
            <span className="slider-round"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Microphone</label>
            <span className="setting-value">{microphone ? 'On' : 'Off'}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={microphone}
              onChange={(e) => setMicrophone(e.target.checked)}
            />
            <span className="slider-round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

// Apps Settings Component
function AppsSettings() {
  const apps = [
    { name: 'Microsoft Edge', size: '256 MB', version: '120.0.2210.91' },
    { name: 'Windows Terminal', size: '48 MB', version: '1.18.3181.0' },
    { name: 'Notepad', size: '2.1 MB', version: '10.2103.28.0' },
    { name: 'File Explorer', size: '15 MB', version: '10.0.22621.2428' }
  ];

  return (
    <div className="settings-panel-content">
      <h2>Apps</h2>
      <p className="panel-description">Uninstall, default apps</p>

      <div className="settings-section">
        <h3>Installed apps</h3>
        <div className="apps-list">
          {apps.map((app, index) => (
            <div key={index} className="app-item">
              <div className="app-icon">📱</div>
              <div className="app-info">
                <div className="app-name">{app.name}</div>
                <div className="app-details">{app.size} • {app.version}</div>
              </div>
              <button className="uninstall-button">Uninstall</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Network Settings Component
function NetworkSettings() {
  const [wifi, setWifi] = useState(true);
  const [vpn, setVpn] = useState(false);

  return (
    <div className="settings-panel-content">
      <h2>Network & internet</h2>
      <p className="panel-description">Wi-Fi, Ethernet, VPN</p>

      <div className="settings-section">
        <h3>Wi-Fi</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Wi-Fi</label>
            <span className="setting-value">{wifi ? 'On' : 'Off'}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={wifi}
              onChange={(e) => setWifi(e.target.checked)}
            />
            <span className="slider-round"></span>
          </label>
        </div>

        <div className="network-list">
          <div className="network-item connected">
            <div className="network-icon">📶</div>
            <div className="network-info">
              <div className="network-name">Home Network</div>
              <div className="network-status">Connected</div>
            </div>
          </div>
          <div className="network-item">
            <div className="network-icon">📶</div>
            <div className="network-info">
              <div className="network-name">Guest WiFi</div>
              <div className="network-status">Available</div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>VPN</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">VPN</label>
            <span className="setting-value">{vpn ? 'On' : 'Off'}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={vpn}
              onChange={(e) => setVpn(e.target.checked)}
            />
            <span className="slider-round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

// Gaming Settings Component
function GamingSettings() {
  const [gameMode, setGameMode] = useState(true);
  const [gameBar, setGameBar] = useState(true);

  return (
    <div className="settings-panel-content">
      <h2>Gaming</h2>
      <p className="panel-description">Game mode, graphics, Xbox</p>

      <div className="settings-section">
        <h3>Game Mode</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Game Mode</label>
            <span className="setting-description">
              Optimize your PC for gaming by allocating more CPU and GPU resources
            </span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={gameMode}
              onChange={(e) => setGameMode(e.target.checked)}
            />
            <span className="slider-round"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Game Bar</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label className="setting-label">Game Bar</label>
            <span className="setting-description">
              Record gameplay, take screenshots, and broadcast with Game bar
            </span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={gameBar}
              onChange={(e) => setGameBar(e.target.checked)}
            />
            <span className="slider-round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}