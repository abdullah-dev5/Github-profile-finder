import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from 'globe.gl';

const GlobeComponent = () => {
  const globeRef = useRef(null);
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

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
    // GeoJSON data for Lahore and Sukkur
    const geoJsonData = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "Lahore",
            "latitude": 31.5497,
            "longitude": 74.3436,
            "pop_max": 11126285
          },
          "geometry": {
            "type": "Point",
            "coordinates": [74.3436, 31.5497]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sukkur",
            "latitude": 27.7052,
            "longitude": 68.8574,
            "pop_max": 499900
          },
          "geometry": {
            "type": "Point",
            "coordinates": [68.8574, 27.7052]
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
    }
  }, [windowSize]); // Re-render globe on window size change

  return (
    <div style={{ margin: 0, height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <div ref={globeRef} style={{ height: '100%', width: '100%' }} />
      <button
        onClick={() => navigate(-1)} // Navigate back
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px 20px',
          backgroundColor: 'transparent',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Back
      </button>
    </div>
  );
};

export default GlobeComponent;
