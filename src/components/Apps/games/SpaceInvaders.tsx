'use client';
import { useState, useEffect, useCallback } from 'react';
import './SpaceInvaders.css';

export default function SpaceInvaders() {
  const [playerPos, setPlayerPos] = useState(50);
  const [aliens, setAliens] = useState<any[]>([]);
  const [bullets, setBullets] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  // Initialize aliens
  useEffect(() => {
    const newAliens = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        newAliens.push({
          id: `${row}-${col}`,
          x: col * 60 + 50,
          y: row * 50 + 50,
          alive: true
        });
      }
    }
    setAliens(newAliens);
  }, []);

  // Handle keyboard controls
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameActive) return;
    
    if (e.key === 'ArrowLeft') {
      setPlayerPos(prev => Math.max(10, prev - 20));
    } else if (e.key === 'ArrowRight') {
      setPlayerPos(prev => Math.min(90, prev + 20));
    } else if (e.key === ' ') {
      // Shoot bullet
      setBullets(prev => [...prev, {
        id: Date.now(),
        x: playerPos,
        y: 85
      }]);
    }
  }, [playerPos, gameActive]);

  // Game loop
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    const gameLoop = setInterval(() => {
      if (!gameActive) return;

      // Move bullets
      setBullets(prev => 
        prev.map(bullet => ({ ...bullet, y: bullet.y - 5 }))
          .filter(bullet => bullet.y > 0)
      );

      // Move aliens
      setAliens(prev => 
        prev.map(alien => ({ ...alien, x: alien.x + 1 }))
      );

      // Check collisions
      setBullets(prev => {
        const newBullets = [...prev];
        const newAliens = [...aliens];
        
        newBullets.forEach((bullet, bulletIndex) => {
          newAliens.forEach((alien, alienIndex) => {
            if (alien.alive && 
                Math.abs(bullet.x - alien.x) < 20 && 
                Math.abs(bullet.y - alien.y) < 20) {
              newAliens[alienIndex].alive = false;
              newBullets.splice(bulletIndex, 1);
              setScore(s => s + 100);
            }
          });
        });
        
        setAliens(newAliens);
        return newBullets;
      });

      // Check win condition
      if (aliens.every(alien => !alien.alive)) {
        setGameActive(false);
      }

    }, 100);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameActive, aliens, handleKeyPress]);

  return (
    <div className="space-invaders">
      <div className="game-header">
        <div className="score">SCORE: {score}</div>
        <div className="controls">CONTROLS: ← → ARROWS | SPACE TO SHOOT</div>
      </div>
      
      <div className="game-area">
        {/* Aliens */}
        {aliens.map(alien => alien.alive && (
          <div 
            key={alien.id}
            className="alien"
            style={{ left: `${alien.x}%`, top: `${alien.y}%` }}
          >
            👾
          </div>
        ))}
        
        {/* Bullets */}
        {bullets.map(bullet => (
          <div 
            key={bullet.id}
            className="bullet"
            style={{ left: `${bullet.x}%`, top: `${bullet.y}%` }}
          >
            •
          </div>
        ))}
        
        {/* Player */}
        <div 
          className="player"
          style={{ left: `${playerPos}%` }}
        >
          🚀
        </div>
      </div>

      {!gameActive && (
        <div className="game-over">
          <h2>YOU WIN! 🎉</h2>
          <button onClick={() => window.location.reload()}>PLAY AGAIN</button>
        </div>
      )}
    </div>
  );
}