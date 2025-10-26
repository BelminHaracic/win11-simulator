'use client';
import { useWindowStore } from '@/stores/windowStore';
import { AppType } from '@/stores/windowStore';
import './Desktop.css';

interface DesktopIcon {
  type: AppType;
  name: string;
  icon: string;
}

const desktopIcons: DesktopIcon[] = [
  { type: 'notepad', name: 'Notepad', icon: '/icons/notepad.png' },
  { type: 'explorer', name: 'File Explorer', icon: '/icons/explorer.png' },
  { type: 'browser', name: 'Microsoft Edge', icon: '/icons/edge.png' },
  { type: 'terminal', name: 'Terminal', icon: '/icons/terminal.png' },
  { type: 'settings', name: 'Settings', icon: '/icons/settings.png' },
];

export default function Desktop() {
  const { openWindow } = useWindowStore();

  const handleDoubleClick = (type: AppType, name: string) => {
    openWindow(type, name);
  };

  return (
    <div className="desktop">
      <div className="desktop-icons">
        {desktopIcons.map((item) => (
          <button
            key={item.type}
            className="desktop-icon"
            onDoubleClick={() => handleDoubleClick(item.type, item.name)}
          >
            <div className="desktop-icon-image">
              <img src={item.icon} alt={item.name} className="desktop-icon-img" />
            </div>
            <span className="desktop-icon-label">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}