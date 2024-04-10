import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
// import * as _ from 'lodash';

// export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
//   const max = 20;
//   const val = _.random(max);
//   const response = {
//     statusCode: 200,
//     body: `The random value (max ${max}) is: ${val}`,
//   };
//   return response;
// };
import axios from 'axios';

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> =>{
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
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
