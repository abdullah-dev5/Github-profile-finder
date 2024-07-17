import React,{useState,useEffect} from 'react';
import axios from 'axios';
import useUserStore from './Store';





const LocationComponent = () => {
  const { fetchedUser, setLocationFetched } = useUserStore();

  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://api.geoapify.com/v1/geocode/search', {
          params: {
            text: `${fetchedUser.location}`,
            apiKey: '08df587f51e84542a76a3398eb8d2e83'
          }
        });
        console.log("Working in geopify   ")
        setAddress(response.data?.features[0]?.properties?.geometry);
        setLoading(false);
        console.log("getting  "+address)
        setLocationFetched(address)
      } catch (error) {
        console.error('Error fetching location:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Optional: Add a loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Optional: Display error message
  }

  return (
    <div className="flex flex-col justify-center items-center my-20 mx-4 sm:mx-20 gap-5">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <div className="bg-gray-200 text-black p-4 rounded-lg shadow-md">
            <p className="font-mono whitespace-normal">{address}</p>
     
            
 \         </div>
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
 