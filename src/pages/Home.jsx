import React, { useEffect } from 'react';
import { account, createJWT } from '../appwrite/config';

function Home() {
  useEffect(() => {
    const fetchJWT = async () => {
      try {
        const jwt = await createJWT();
        console.log('JWT token:', jwt);
        // Use the JWT token as needed, such as setting it in state or localStorage
      } catch (error) {
        console.error('Error fetching JWT:', error.message);
        // Additional error handling can be done here
      }
    };

    fetchJWT();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      I am home page
    </div>
  );
}

export default Home;
