import React, { useEffect, useState, useRef } from "react";

const API_KEY = "AIzaSyCwBDUauxwyuNxOfDiqmLjewPuRIaf2bc4"; // Replace with your actual API key

export default function NearbyGyms() {
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState("");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps && window.google.maps.places) {
          resolve();
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
      .then(() => getGymsAndMap())
      .catch((err) => setError(err.toString()));
  }, []);

  const getGymsAndMap = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const userLocation = new window.google.maps.LatLng(lat, lng);

        // Initialize the visible map
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 14,
        });

        // Marker for user's location
        new window.google.maps.Marker({
          position: userLocation,
          map: mapInstanceRef.current,
          title: "Your Location",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });

        // Places API to find gyms
        const service = new window.google.maps.places.PlacesService(mapInstanceRef.current);
        const request = {
          location: userLocation,
          radius: 15000,
          type: "gym",
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setGyms(results);

            // Place gym markers
            results.forEach((gym) => {
              new window.google.maps.Marker({
                position: gym.geometry.location,
                map: mapInstanceRef.current,
                title: gym.name,
              });
            });
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Map Section */}
      <div
        ref={mapRef}
        style={{
          width: "60%",
          minWidth: "300px",
          height: "500px",
          border: "2px solid #333",
          borderRadius: 8,
        }}
      ></div>

      {/* Gym List Section */}
      <div
        style={{
          width: "35%",
          minWidth: "250px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: 8,
          backgroundColor: "#f9f9f9",
          height: "500px",
          overflowY: "auto",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Nearby Gyms</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error && gyms.length === 0 && <p>Loading gyms near you...</p>}

        {gyms.map((gym) => (
          <div
            key={gym.place_id}
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${gym.geometry.location.lat()},${gym.geometry.location.lng()}`,
                "_blank"
              )
            }
            style={{
              marginBottom: 12,
              cursor: "pointer",
              padding: 6,
              borderRadius: 6,
              backgroundColor: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
          >
            <strong>{gym.name}</strong>
            <br />
            <small>{gym.vicinity || gym.formatted_address}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
