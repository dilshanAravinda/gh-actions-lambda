import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import axios from 'axios';

export const handler = async (event:any) =>{
  try {
    const { latitude, longitude, radius, place } = event.queryStringParameters; // Extract values from query parameters
    const apiKey = 'AIzaSyCt_LMsL_E198Qcfucq6A_KpPPH1QYFmew'; // Assuming you have the API key stored in an environment variable
    
    const response = await axios.post('https://places.googleapis.com/v1/places:autocomplete', {
      input: place,
      locationBias: {
        circle: {
          center: {
            latitude,
            longitude
          },
          radius
        }
      }
    }, {
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
// latitude=6.9074944&longitude=79.8425088&radius=500.0&place=colombo

// handler({
//   queryStringParameters:{
//     latitude:6.9074944, longitude: 79.8425088, radius: 500.0, place: "colombo"
//   }
// }).then(data => {
//   console.log(data)
// })