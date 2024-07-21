export const paymentResponse = {
  url: 'https://ssisscript.netlify.app/library.js',
};

export const paymentHandler = (response) => (_event, _context, callback) => {
  try {
      callback(null, {
          statusCode: 200,
          body: JSON.stringify(response),
      });
  } catch (error) {
      callback(null, {
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' }),
      });
  }
};

exports.handler = paymentHandler(paymentResponse);
