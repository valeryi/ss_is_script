exports.handler = (event, context, callback) => {
  try {
      const response = {
          url: 'https://example.com/index.js' // Replace with your actual script URL
      };
      callback(null, {
          statusCode: 200,
          body: JSON.stringify(response),
      });
  } catch (error) {
      console.error("Error in handler:", error);
      callback(null, {
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' }),
      });
  }
};
