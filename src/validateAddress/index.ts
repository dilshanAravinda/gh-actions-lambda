// const axios = require("axios");

// const data = {
//   address: {
//     regionCode: "US",
//     locality: "Mountain View",
//     addressLines: ["1600 Amphitheatre Pkwy"],
//   },
// };

// const apiKey = "AIzaSyCt_LMsL_E198Qcfucq6A_KpPPH1QYFmew"; // Assuming you have the API key stored in an environment variable

// const headers = {
//   "Content-Type": "application/json",
// };

// axios
//   .post(
//     `https://addressvalidation.googleapis.com/v1:validateAddress?key=${apiKey}`,
//     data,
//     { headers }
//   )
//   .then((response) => {
//     const addressComponents =
//       response?.data?.result?.address?.addressComponents;

//     for (const component of addressComponents) {
//       // Check if the component type is "postal_code" and the confirmation level is "CONFIRMED"
//       if (
//         component.componentType === "postal_code" &&
//         component.confirmationLevel === "CONFIRMED"
//       ) {
//         console.log("Postal code is confirmed.");
//         // You can perform further actions here if needed
//         break; // Exit the loop since we found the confirmed postal code
//       }
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error.response.data);
//   });


import axios from 'axios';

exports.handler = async (event) => {
  try {
    // Extract address data from query parameters
    const queryParams = event.queryStringParameters;
    const { regionCode, locality, postalCode } = queryParams;

    // Construct data object for API call
    const data = {
      address: {
        regionCode,
        locality,
        addressLines: [postalCode], 
      },
    };

    const apiKey = "AIzaSyCt_LMsL_E198Qcfucq6A_KpPPH1QYFmew"; // Assuming you have the API key stored in an environment variable

    const headers = {
      "Content-Type": "application/json",
    };

    // Make API call to Google Address Validation API
    const response = await axios.post(
      `https://addressvalidation.googleapis.com/v1:validateAddress?key=${apiKey}`,
      data,
      { headers }
    );

    // Extract postal code validation result from the response
    const addressComponents =
      response?.data?.result?.address?.addressComponents;

    let postalCodeConfirmed = false;

    for (const component of addressComponents) {
      if (
        component.componentType === "postal_code" &&
        component.confirmationLevel === "CONFIRMED"
      ) {
        postalCodeConfirmed = true;
        break;
      }
    }

    if (postalCodeConfirmed) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isValid: true }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ isValid: false }),
      };
    }
  } catch (error) {
    console.error("Error:", error.response.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" , error}),
    };
  }
};
