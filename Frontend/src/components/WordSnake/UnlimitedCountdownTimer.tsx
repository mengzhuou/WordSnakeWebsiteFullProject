import React, { useState, useEffect, useRef } from 'react';

type Props = {
  duration: number;
  onTimeUp: () => void;
  onTimeTick: (timeLeft: number) => void; //update every time the timer is running
};

const UnlimitedCountdownTimer: React.FC<Props> = ({ duration, onTimeUp, onTimeTick }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft > 0 ? timeLeft - 1 : 0);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    onTimeTick(timeLeft);

    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}: ${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='countdownTimer'>{formatTime(timeLeft)}</div>
  );
};

export default UnlimitedCountdownTimer;
