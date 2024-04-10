import * as _ from 'lodash';

export const handler = async (event) => {
    const max = 10;
    const val = _.random(max);
    // TODO implement
    const response = {
      statusCode: 200,
      body: `the random number is ${val}.`,
    };
    return response;
  };
  