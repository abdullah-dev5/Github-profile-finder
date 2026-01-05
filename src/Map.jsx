import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Globe from 'globe.gl';
import useUserStore from './Store';
import Lottie from 'lottie-react';
import lottieJson from './assets/locationNotfound.json';

const MergedComponent = () => {
  const { fetchedUser, setLocationFetched, locationFetched, history } = useUserStore();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const globeRef = useRef(null);
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    if (!fetchedUser.location) {
      setLoading(false);
      setError('No location available for the user.');
      return;
    }

    console.log("Location from store ", fetchedUser.location);
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://api.geoapify.com/v1/geocode/search', {
          params: {
            text: `${fetchedUser.location}`,
            apiKey: '08df587f51e84542a76a3398eb8d2e83'
          }
        });

        console.log("Working in geoapify");
        const lat = response.data?.features[0].properties.lat;
        const lon = response.data?.features[0].properties.lon;

        setLatitude(lat);
        setLongitude(lon);

        setLoading(false);
        console.log("lon", lon);
        console.log("lat", lat);

        // Set location in the store after updating the local state
        const labelName = fetchedUser.login
          ? `${fetchedUser.login} · ${fetchedUser.location}`
          : fetchedUser.location;
        setLocationFetched({ latitude: lat, longitude: lon, name: labelName });
      } catch (error) {
        console.error('Error fetching location:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLocation();
  }, [fetchedUser.location, setLocationFetched]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (locationFetched.latitude && locationFetched.longitude) {
      const geoJsonData = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "name": locationFetched.name,
              "latitude": locationFetched.latitude,
              "longitude": locationFetched.longitude,
              "pop_max": 499900
            },
            "geometry": {
              "type": "Point",
              "coordinates": [locationFetched.longitude, locationFetched.latitude]
            }
          }
        ]
      };

      const world = Globe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .labelsData(geoJsonData.features)
        .labelLat(d => d.properties.latitude)
        .labelLng(d => d.properties.longitude)
        .labelText(d => d.properties.name)
        .labelSize(d => Math.sqrt(d.properties.pop_max) * 4e-4)
        .labelDotRadius(d => Math.sqrt(d.properties.pop_max) * 4e-4)
        .labelColor(() => 'rgba(255, 165, 0, 0.75)')
        .labelResolution(2);

      if (globeRef.current) {
        world(globeRef.current);
        world.width(windowSize.width);
        world.height(windowSize.height);
      }
    }
  }, [windowSize, locationFetched]);

  if (loading) {
    return (
      <div className="pt-24 pb-24 flex justify-center items-center">
        <p className="text-lg font-medium text-slate-800">Loading location...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-24 flex flex-col items-center justify-center">
        <Lottie animationData={lottieJson} className="w-40 h-40" />
        <p className="text-xl mt-4 text-slate-800">{error}</p>
      </div>
    );
  }

  const locationCount = new Set(
    history
      .map((h) => h.location && h.location.trim().toLowerCase())
      .filter(Boolean)
  ).size;

  return (
    <div className="pt-16 pb-16">
      <div style={{ margin: 0, height: '70vh', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <div ref={globeRef} style={{ height: '100%', width: '100%' }} />
        <button
          onClick={() => navigate(-1)} // Navigate back
          className="absolute top-4 left-4 px-4 py-2 bg-slate-900/80 text-white rounded-md cursor-pointer text-sm"
        >
          Back
        </button>
        <div className="absolute top-4 right-4 px-3 py-2 bg-white/90 rounded-md text-[11px] text-slate-800 shadow">
          <p>Searched profiles: {history.length}</p>
          <p>Locations found: {locationCount}</p>
        </div>
      </div>
    </div>
  );
};

export default MergedComponent;
