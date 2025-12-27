import './App.css';
import cake1 from './assets/cake1.png';
import cake2 from './assets/cake2.png';
import birthdayText from './assets/birthdaytext.png';
import birthdaySong from './assets/bdayaudio.mp3';
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const audioRef = useRef(null);
  const [cakeFrame, setCakeFrame] = useState(cake1);

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log('Autoplay blocked – Awaiting user interaction');
      }
    };
    playAudio();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCakeFrame(prev => (prev === cake1 ? cake2 : cake1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <audio ref={audioRef} src={birthdaySong} loop />

      <img src={birthdayText} alt="Happy Birthday" className="birthday-text" />
      
      <div className="cake-container">
        <img src={cakeFrame} alt="Cake" className="cake" />  
      </div>
      
    </div>
  );
}
