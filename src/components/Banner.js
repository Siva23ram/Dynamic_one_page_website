import React, { useEffect, useState } from 'react';

const Banner = ({ description, link, timer, isVisible, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    if (isVisible) {
      setTimeLeft(timer); // Reset the timer when the banner becomes visible
    }
  }, [timer, isVisible]); // Depend on timer and visibility changes

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timeLeft <= 0) {
      onTimerEnd();
    }
  }, [isVisible, timeLeft, onTimerEnd]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div className="banner" style={styles.banner}>
      <p>{description}</p>
      <p>Time left: {formatTime(timeLeft)}</p>
      <a href={link}  rel="noopener noreferrer">
        {link}
      </a>
    </div>
  );
};

const styles = {
  banner: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
  },
};

export default Banner;
