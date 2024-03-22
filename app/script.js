import React, { useState } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;

    const padZero = (num) => (num < 10 ? `0${num}` : num);

    return `${padZero(minutes)}:${padZero(seconds)}`;
  };

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  const startTimer = () => {
    clearInterval(timer);
  
    let newStatus;
    let newTime;
  
    if (status === 'off' || status === 'rest') {
      newStatus = 'work';
      newTime = 1200;
    } else {
      newStatus = 'rest';
      newTime = 20;
    }
  
    setTime(newTime);
    setStatus(newStatus);

    setTimer(
      setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            playBell();
            if (newStatus === 'work') {
              newStatus = 'rest';
              newTime = 20;
            } else {
              newStatus = 'work';
              newTime = 1200;
            }
            setStatus(newStatus);
            return newTime;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTime(0);
    setStatus('off');
  };

  const closeApp = () => {
    window.close();
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' &&
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      }
      { status === 'work' && <img src="./images/Work.png" />}
      { status === 'rest' && <img src="./images/Rest.png" />}
      { status !== 'off' && 
        <div className="timer">
        {formatTime(time)}
        </div>
      }
      { status === 'off' && <button className="btn" onClick={startTimer}>Start</button>}
      { status !== 'off' && <button className="btn" onClick={stopTimer}>Stop</button>}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
};
render(<App />, document.querySelector('#app'));
