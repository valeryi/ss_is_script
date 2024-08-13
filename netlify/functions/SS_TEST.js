exports.handler = (event, context, callback) => {
  const scriptContent = `
      (function() {
          console.log('SS_TEST.js loaded');
          window.SS_TEST = {
              onInit: function() {
                  /** triggered when we switched over payment mode (initially it's in preview mode) */
                  console.log('SS_TEST.js', 'on script init hook');
              },
              onOpen: function() {
                  /** triggered when we open frame */
                  console.log('SS_TEST.js', 'on frame open hook');
              },
              onClose: function() {
                  /** triggered when we close frame */
                  console.log('SS_TEST.js', 'on frame close hook');
              },
              onPay: function() {
                  /** triggered when we press button */
                  console.log('SS_TEST.js', 'on frame pay method');
              },
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
