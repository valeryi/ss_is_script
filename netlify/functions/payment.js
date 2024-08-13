const host = 'http://localhost:8888'
// const host = 'https://ssisscript.netlify.app';

// const paymentResponse = {
//   url: `${host}/library.js`,
// };

const responseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Credentials': 'true',
};

const paymentResponse = [
  {
    type: 'payment',
    id: 3,
    attributes: {
      name: 'CheckoutCard',
      is_iframe: true,
      is_button: false,
      is_script: false,
      content:
        'https://api3-dev.aws.ssyii.com/api/v3/payments/cko/frame/153002?domain=2&lang=en&country=de',
      img: 's3://ssresource/res/media/payment/payment-systems/1dwlVzvSjdmapxbyvAYza7usvYMJ5XAb.svg+xml',
      sandbox: true,
      i18n: {
        discount_description: '',
      },
      deferred: {
        max: 0,
        days: 0,
      },
      script_src: null,
    },
  },
  {
    type: 'payment',
    id: 13,
    attributes: {
      name: 'Cheque',
      is_iframe: false, // TODO: should be only one true value/type
      is_button: true,
      is_script: false,
      content:
        'https://api3-dev.aws.ssyii.com/api/v3/payments/cheque/frame/153002?domain=2&lang=en&country=de',
      img: 's3://ssresource/res/media/payment/payment-systems/7FpRyHYjDSnEpmzdSvMpJpImd37RdlBT.svg+xml',
      sandbox: true,
      i18n: {
        cta_name: 'CTA',
      },
      deferred: {
        max: 0,
        days: 0,
      },
      script_src: null,
    },
  },
  {
    type: 'payment',
    id: 14,
    attributes: {
      name: 'Klarna3',
      is_iframe: false, /** 1. нужно глянуть чтобы всегда был только один флаг - true. Сейчас местами может быть два */
      is_button: false,
      is_script: true,
      content:
        'https://api3-dev.aws.ssyii.com/api/v3/payments/klarna3/payments-frame/153002?domain=2&lang=en&country=de',
      img: 's3://ssresource/res/media/payment/payment-systems/ZT8hoo4hPLG6v101SQ2Q7kluwrdI4cDt.png',
      sandbox: true,
      i18n: {},
      deferred: {
        max: 0,
        days: 0,
      },
      script_src: `${host}/SS_Klarna3.js`, /** 2. это путь к библиотеке где я буду дергать методы на различных ивентах */
      script_name: 'SS_Klarna3', /** 3. название библиотеки window[name]. желательно чтобы было в нашем неймспейсе оно */
      script_container_id: 'klarna3-container', /** 4. id контейнера куда будет вставляться фрейм */
    },
  },
  // {
  //   type: 'payment',
  //   id: 149,
  //   attributes: {
  //     name: 'Test',
  //     is_iframe: false, /** 1. нужно глянуть чтобы всегда был только один флаг - true. Сейчас местами может быть два */
  //     is_button: false,
  //     is_script: true,
  //     content:
  //       'https://api3-dev.aws.ssyii.com/api/v3/payments/klarna3/payments-frame/153002?domain=2&lang=en&country=de',
  //     img: 's3://ssresource/res/media/payment/payment-systems/ZT8hoo4hPLG6v101SQ2Q7kluwrdI4cDt.png',
  //     sandbox: true,
  //     i18n: {},
  //     deferred: {
  //       max: 0,
  //       days: 0,
  //     },
  //     script_src: `${host}/SS_TEST.js`, /** 2. это путь к библиотеке где я буду дергать методы на различных ивентах */
  //     script_name: 'SS_TEST', /** 3. название библиотеки window[name]. желательно чтобы было в нашем неймспейсе оно */
  //     script_container_id: 'test-container', /** 4. id контейнера куда будет вставляться фрейм */
  //   },
  // },
  {
    type: 'payment',
    id: 25,
    attributes: {
      name: 'CheckoutPaypal2',
      is_iframe: true,
      is_button: false,
      is_script: false,
      content:
        'https://api3-dev.aws.ssyii.com/api/v3/payments/paypal/ckoframe/153002?domain=2&lang=en&country=de',
      img: 's3://ssresource/res/media/payment/payment-systems/fXp1GsRe7zv3JtrENhYg6UDLGxEDXeT2.svg+xml',
      sandbox: true,
      i18n: {},
      deferred: {
        max: 0,
        days: 0,
      },
      script_src: null,
    },
  },
]

const paymentHandler = (response) => (_event, _context, callback) => {
  try {
    callback(null, {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(response),
    })
    // setTimeout(() => {
    //   callback(null, {
    //     statusCode: 200,
    //     headers: responseHeaders,
    //     body: JSON.stringify(response),
    //   })
    // }, 3000);
  } catch (error) {
    callback(null, {
      statusCode: 500,
      headers: responseHeaders,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    })
  }
}

module.exports = {
  paymentResponse,
  paymentHandler,
  handler: paymentHandler(paymentResponse),
}
