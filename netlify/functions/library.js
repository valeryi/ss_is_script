exports.handler = (event, context, callback) => {
  const scriptContent = `
      (function() {
          window.myLib = {
              sayHello: function() {
                  console.log('Hello, world!');
              }
          };
      })();
  `;

  callback(null, {
    statusCode: 200,
    headers: {
        'Content-Type': 'application/javascript',
    },
    body: scriptContent,
  });
};
