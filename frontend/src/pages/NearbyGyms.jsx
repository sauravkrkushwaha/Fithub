import React, { useEffect, useState, useRef } from "react";

const API_KEY = "AIzaSyCwBDUauxwyuNxOfDiqmLjewPuRIaf2bc4";

export default function NearbyGyms() {
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps && window.google.maps.places) {
          resolve();
          return;
        }

        const existingScript = document.querySelector(
          `script[src^="https://maps.googleapis.com/maps/api/js"]`
        );

        if (existingScript) {
          existingScript.addEventListener("load", resolve);
          existingScript.addEventListener("error", reject);
          return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = () => reject("Failed to load Google Maps script");

        document.head.appendChild(script);
      });
    };

    loadGoogleMaps()
      .then(() => {
        getGyms();
      })
      .catch((err) => setError(err.toString()));
  }, []);

  const getGyms = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Create a dummy map to use the PlacesService
        mapRef.current = new window.google.maps.Map(document.createElement("div"));

        const service = new window.google.maps.places.PlacesService(mapRef.current);
        const location = new window.google.maps.LatLng(lat, lng);

        const request = {
          location,
          radius: 15000, // 15 km
          type: "gym",
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setGyms(results);
          } else {
            setError("Places search failed: " + status);
          }
        });
      },
      () => {
        setError("Unable to retrieve your location");
      }
    );
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Nearby Gyms (15 km radius)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          border: "2px solid #333",
          height: 400,
          overflowY: "auto",
          padding: 10,
          backgroundColor: "#f9f9f9",
          borderRadius: 8,
        }}
      >
        {!error && gyms.length === 0 && <p>Loading gyms near you...</p>}
        {gyms.map((gym) => (
          <div key={gym.place_id} style={{ marginBottom: 12 }}>
            <strong>{gym.name}</strong>
            <br />
            <small>{gym.vicinity || gym.formatted_address}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
