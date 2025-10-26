'use client';
import Desktop from '@/components/Desktop/Desktop';
import Taskbar from '@/components/Taskbar/Taskbar';
import WindowManager from '@/components/Window/WindowManager';

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900 flex flex-col">
      <div className="flex-1 relative">
        <Desktop />
        <WindowManager />
      </div>
      <Taskbar />
    </div>
  );
}