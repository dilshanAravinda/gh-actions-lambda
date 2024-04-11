// import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
// import axios from 'axios';

// export const handler = async (event:any) =>{
//   try {
//     const { latitude, longitude, radius, place } = event.queryStringParameters; // Extract values from query parameters
//     const apiKey = 'AIzaSyCt_LMsL_E198Qcfucq6A_KpPPH1QYFmew'; // Assuming you have the API key stored in an environment variable
    
//     const response = await axios.post('https://places.googleapis.com/v1/places:autocomplete', {
//       input: place,
//       locationBias: {
//         circle: {
//           center: {
//             latitude,
//             longitude
//           },
//           radius
//         }
//       }
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Goog-Api-Key': apiKey
//       }
//     });

//     return {
//       statusCode: 200,
//       body: JSON.stringify(response.data)
//     };
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error})
//     };
//   }
// };


export const handler = async (event: any) => {
  try {
    const { latitude, longitude, radius, place } = event.queryStringParameters; // Extract values from query parameters
    const apiKey = 'AIzaSyCt_LMsL_E198Qcfucq6A_KpPPH1QYFmew'; // Assuming you have the API key stored in an environment variable

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey
      },
      body: JSON.stringify({
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
      })
    };

    const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(responseData)
    };
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' })
    };
  }
};
