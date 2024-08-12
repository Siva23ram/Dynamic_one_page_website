import React, { useState } from 'react';

const Dashboard = ({ onBannerUpdate }) => {
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBannerUpdate({ description, link, timer, isVisible });

    // Reset the input fields after submission
    setDescription('');
    setLink('');
    setTimer(0); // Reset timer to 0 or any default value
    setIsVisible(false);
  };

  const handleTimerChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setTimer(isNaN(value) ? 0 : value); // Handle NaN by defaulting to 0
  };

  return (
    <div className="dashboard" style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px', marginTop: '20px' }}>
      <h2>Banner Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Link:
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Timer (seconds):
            <input
              type="number"
              value={timer}
              onChange={handleTimerChange}
            />
          </label>
        </div>
        <div>
          <label>
            Visibility:
            <input
              type="checkbox"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit">Update Banner</button>
      </form>
    </div>
  );
};

export default Dashboard;
