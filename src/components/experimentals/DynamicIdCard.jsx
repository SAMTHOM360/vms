import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DynamicIdCard = () => {
  // State to store meeting details
  const [meetingDetails, setMeetingDetails] = useState(null);
  // State to handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch meeting details
    const fetchMeetingDetails = async () => {
      try {
        // Extract ID from the URL path
        const id = window.location.pathname.split('/').pop();

        // Make API request
        const apiUrl = `http://192.168.12.58:8080/api/meeting/meeting-details/${id}`;

        // Fetch data
        const response = await axios.get(apiUrl);
        console.log("Dynamic Id Response", response)
        
        // Handle the API response data
        setMeetingDetails(response.data);
      } catch (error) {
        // Handle errors
        setError('Error fetching meeting details');
        console.error('Error fetching meeting details:', error);
      } finally {
        // Set loading state to false regardless of success or failure
        setLoading(false);
      }
    };

    // Call the fetchMeetingDetails function
    fetchMeetingDetails();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div>
      <h1>Meeting Details</h1>
      {loading && <p>Loading meeting details...</p>}
      {error && <p>{error}</p>}
      {meetingDetails && (
        <div>
          {/* <p>Title: {meetingDetails.title}</p>
          <p>Date: {meetingDetails.date}</p> */}
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default DynamicIdCard;
