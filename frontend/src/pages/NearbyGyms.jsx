import React, { useEffect, useState } from 'react';

function NearbyGyms() {
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchNearbyGyms, () => {
        setError('Failed to get location.');
      });
    } else {
      setError('Geolocation is not supported.');
    }
  }, []);

  const fetchNearbyGyms = async (position) => {
    const { latitude, longitude } = position.coords;
    const radius = 15000; // meters (15km radius = 30km diameter)

    const proxy = 'https://cors-anywhere.herokuapp.com/'; // Use a proxy in development if CORS error
    const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your API Key

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=gym&key=${apiKey}`;

    try {
      const response = await fetch(proxy + url);
      const data = await response.json();
      if (data.results) setGyms(data.results);
      else setError('No gyms found.');
    } catch (err) {
      setError('Failed to fetch gyms.');
    }
  };

  return (
    <div style={styles.container}>
      <h3>Nearby Gyms (30×30 km)</h3>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.box}>
        {gyms.length === 0 && !error && <p>Loading gyms...</p>}
        {gyms.map((gym, index) => (
          <div key={index} style={styles.gymCard}>
            <strong>{gym.name}</strong>
            <p>{gym.vicinity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    fontFamily: 'Arial',
  },
  box: {
    width: 300,
    height: 300,
    border: '2px solid #333',
    overflowY: 'scroll',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  gymCard: {
    marginBottom: 10,
    padding: 5,
    borderBottom: '1px solid #ccc',
  },
  error: {
    color: 'red',
  },
};

export default NearbyGyms;
