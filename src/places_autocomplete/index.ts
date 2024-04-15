import axios from 'axios';

export const handler = async (event) =>{
  try {
    const { latitude, longitude, radius, place } = event.queryStringParameters; // Extract values from query parameters
    
    const apiKey = process.env.api_key; // Assuming you have the API key stored in an environment variable
    
    const response = await axios.post('https://places.googleapis.com/v1/places:autocomplete?languageCode=en', 
    {
      input: place,
      locationBias: {
        circle: {
          center: {
            latitude,
            longitude
          },
          radius,
        }
      },
      
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error})
    };
  }
};
