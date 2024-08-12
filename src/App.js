import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';

function App() {
  const [bannerData, setBannerData] = useState({
    description: 'Welcome to our website!',
    link: 'https://example.com',
    timer: 60, // Default timer in seconds
    isVisible: true,
  });

  useEffect(() => {
    // Fetch initial data from backend
    fetch('http://localhost:5000/banner')
      .then((res) => res.json())
      .then((data) => setBannerData(data))
      .catch((err) => console.error('Failed to fetch banner data:', err));
  }, []);

  const handleBannerUpdate = (data) => {
    // Ensure banner is visible with the new data
    const updatedData = { ...data, isVisible: true };
    
    setBannerData(updatedData);

    // Update the backend with new data
    fetch('http://localhost:5000/banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.text())
      .then((message) => console.log(message))
      .catch((err) => console.error(err));
  };

  const handleTimerEnd = () => {
    setBannerData({ ...bannerData, isVisible: false });
  };

  return (
    <div className="App">
      <Banner
        description={bannerData.description}
        link={bannerData.link}
        timer={bannerData.timer}
        isVisible={bannerData.isVisible}
        onTimerEnd={handleTimerEnd}
      />
      <Dashboard bannerData={bannerData} onBannerUpdate={handleBannerUpdate} />
    </div>
  );
}

export default App;
