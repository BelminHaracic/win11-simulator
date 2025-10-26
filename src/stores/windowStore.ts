import { create } from 'zustand';

// U windowStore.ts, ažuriraj AppType:
export type AppType = 'notepad' | 'explorer' | 'browser' | 'terminal' | 'settings' | 'space-invaders' | 'music-player' | 'pixel-art';

export interface WindowState {
  id: string;
  type: AppType;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  focused: boolean;
}

interface WindowStore {
  windows: WindowState[];
  openWindow: (type: AppType, title: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  toggleWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  
  openWindow: (type, title) => {
    const { windows } = get();
    
    const newWindow: WindowState = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      position: { 
        x: Math.max(0, 100 + windows.length * 20), 
        y: Math.max(0, 100 + windows.length * 20) 
      },
      size: { width: 800, height: 600 },
      zIndex: windows.length + 1,
      minimized: false,
      maximized: false,
      focused: true,
    };
    
    set({
      windows: [
        ...windows.map(w => ({ ...w, focused: false })), 
        newWindow
      ],
    });
  },
  
  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    }));
  },
  
  focusWindow: (id) => {
    const { windows } = get();
    const maxZIndex = Math.max(...windows.map(w => w.zIndex));
    
    set((state) => ({
      windows: state.windows.map((window) => ({
        ...window,
        zIndex: window.id === id ? maxZIndex + 1 : window.zIndex,
        focused: window.id === id,
        minimized: window.id === id ? false : window.minimized,
      })),
    }));
  },
  
  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, minimized: true } : window
      ),
    }));
  },
  
  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, maximized: !window.maximized } : window
      ),
    }));
  },
  
  toggleWindow: (id) => {
    const { windows } = get();
    const window = windows.find(w => w.id === id);
    
    if (window) {
      if (window.minimized) {
        const maxZIndex = Math.max(...windows.map(w => w.zIndex));
        set({
          windows: windows.map(w => 
            w.id === id 
              ? { ...w, minimized: false, focused: true, zIndex: maxZIndex + 1 }
              : { ...w, focused: false }
          ),
        });
      } else if (window.focused) {
        set({
          windows: windows.map(w => 
            w.id === id 
              ? { ...w, minimized: true, focused: false }
              : w
          ),
        });
      } else {
        const maxZIndex = Math.max(...windows.map(w => w.zIndex));
        set({
          windows: windows.map(w => 
            w.id === id 
              ? { ...w, focused: true, zIndex: maxZIndex + 1 }
              : { ...w, focused: false }
          ),
        });
      }
    }
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, position } : window
      ),
    }));
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, size } : window
      ),
    }));
  },
}));