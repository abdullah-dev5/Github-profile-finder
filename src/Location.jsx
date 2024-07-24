import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUserStore from './Store';

const LocationComponent = () => {
  const { fetchedUser, setLocationFetched, locationFetched } = useUserStore();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        setLocationFetched({ latitude: lat, longitude: lon ,name:fetchedUser.location });
      } catch (error) {
        console.error('Error fetching location:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLocation();
  }, [fetchedUser.location, setLocationFetched]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center my-20 mx-4 sm:mx-20 gap-5">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <div className="bg-gray-200 text-black p-4 rounded-lg shadow-md">
            <p className="font-mono whitespace-normal">Latitude: {latitude}</p>
            <p className="font-mono whitespace-normal">Longitude: {longitude}</p>
            <p className="font-mono whitespace-normal">Values from store:</p>
            <p className="font-mono whitespace-normal">Latitude: {locationFetched.latitude}</p>
            <p className="font-mono whitespace-normal">Longitude: {locationFetched.longitude}</p>
            <p className="font-mono whitespace-normal">Longitude: {locationFetched.name}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
