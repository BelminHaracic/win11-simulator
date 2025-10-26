'use client';
import { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const tracks = [
  {
    id: 1,
    title: 'Night Drive',
    artist: 'Synthwave Collective',
    duration: '3:45',
    cover: '🎵',
    color: '#ff6b6b'
  },
  {
    id: 2,
    title: 'Digital Dreams',
    artist: 'Neon Waves',
    duration: '4:20',
    cover: '🎶',
    color: '#4ecdc4'
  },
  {
    id: 3,
    title: 'Cyber City',
    artist: 'Future Bass',
    duration: '3:15',
    cover: '🎧',
    color: '#45b7d1'
  }
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };

  return (
    <div className="music-player">
      <div className="player-header">
        <h2>Groove Player</h2>
        <div className="window-controls">
          <button>−</button>
          <button>□</button>
          <button>×</button>
        </div>
      </div>

      <div className="player-main">
        <div 
          className="album-art"
          style={{ backgroundColor: tracks[currentTrack].color }}
        >
          {tracks[currentTrack].cover}
        </div>

        <div className="track-info">
          <h3 className="track-title">{tracks[currentTrack].title}</h3>
          <p className="track-artist">{tracks[currentTrack].artist}</p>
        </div>

        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="time-display">
            <span>{formatTime(progress * 180 / 100)}</span>
            <span>{tracks[currentTrack].duration}</span>
          </div>
        </div>

        <div className="controls">
          <button className="control-btn" onClick={prevTrack}>⏮</button>
          <button 
            className="play-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸' : '⏵'}
          </button>
          <button className="control-btn" onClick={nextTrack}>⏭</button>
        </div>

        <div className="volume-control">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-slider"
          />
        </div>
      </div>

      <div className="playlist">
        <h4>Playlist</h4>
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
            onClick={() => {
              setCurrentTrack(index);
              setProgress(0);
            }}
          >
            <div className="item-cover">{track.cover}</div>
            <div className="item-info">
              <div className="item-title">{track.title}</div>
              <div className="item-artist">{track.artist}</div>
            </div>
            <div className="item-duration">{track.duration}</div>
          </div>
        ))}
      </div>

      <audio
        ref={audioRef}
        onEnded={nextTrack}
        onTimeUpdate={(e) => {
          const current = e.currentTarget.currentTime;
          const duration = e.currentTarget.duration || 180;
          setProgress((current / duration) * 100);
        }}
      />
    </div>
  );
}