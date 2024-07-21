const paymentResponse = {
  url: 'https://ssisscript.netlify.app/library.js',
};

const paymentHandler = (response) => (_event, _context, callback) => {
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

module.exports = {
  paymentResponse,
  paymentHandler,
  handler: paymentHandler(paymentResponse),
};