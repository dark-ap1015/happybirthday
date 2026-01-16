import './App.css';
import cake1 from './assets/cake1.png';
import cake2 from './assets/cake2.png';
import birthdayText from './assets/birthdaytext.png';
import birthdaySong from './assets/bdayaudio.mp3';
import photo1 from './assets/nguyen1.jpeg';
import photo2 from './assets/nguyen2.jpeg';
import photo3 from './assets/nguyen3.jpeg';
import photo4 from './assets/nguyen4.jpeg';
import photo5 from './assets/nguyen5.jpeg';
import photo6 from './assets/nguyen6.jpeg';
import photo7 from './assets/nguyen7.jpeg';
import photo8 from './assets/nguyen8.jpeg';
import photo9 from './assets/nguyen9.jpeg';
import photo10 from './assets/nguyen10.jpeg';
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const audioRef = useRef(null);
  const [cakeFrame, setCakeFrame] = useState(cake1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCakeFrame(prev => (prev === cake1 ? cake2 : cake1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const toggleCelebration = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setShowPhotos(true);
    } else {
      audioRef.current.pause();
      setShowPhotos(false);
    }
    setIsPlaying(prev => !prev);
  };

  const randomPosition = () => {
    return {
      top: `${10 + Math.random() * 80}%`,
      left: `${10 + Math.random() * 80}%`,
    };
  };

  return (
    <div className="App">
      <audio ref={audioRef} src={birthdaySong} loop />
      <img src={birthdayText} alt="Happy Birthday" className="birthday-text" />
      
      <div className="cake-container ui-layer">
        <img src={cakeFrame} alt="Cake" className="cake" />  
        <button className="celebration-button" onClick={toggleCelebration}>
          {isPlaying ? "Don't pause" : 'Celebrate!'}
        </button>
      </div>

      {showPhotos && (
        <div className="photo-gallery show">
          {[photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Memory ${i + 1}`}
              className="photo"
              style={{
                animationDelay: `${i * 0.35}s`,
                ...randomPosition(),
              }}
            />
          ))}
        </div>
      )}
      
    </div>
  );
};
