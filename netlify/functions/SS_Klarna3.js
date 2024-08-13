exports.handler = (event, context, callback) => {
  const scriptContent = `
      (function() {
          console.log('SS_Klarna3.js script debug');
          window.SS_Klarna3 = {
              ready: false,
              onInit: function() {
                  /** triggered when we switched over payment mode (initially it's in preview mode) */
                  console.log('SS_Klarna3', 'on script init hook');
              },
              onOpen: function() {
                  /** triggered when we open frame */
                  console.log('SS_Klarna3', 'on frame open hook');
                  const klarna3Container = document.getElementById('klarna3-container');
                  const klarna3Button = document.getElementById('script-frame__button--klarna3');

                    if (klarna3Container && !klarna3Button) {
                        const klarna3Button = document.createElement('button');
                        klarna3Button.id = 'script-frame__button--klarna3';
                        klarna3Button.innerText = 'Pay with Klarna';
                        klarna3Button.onclick = window.SS_Klarna3.onPay;
                        klarna3Button.style.display = 'none';
                        klarna3Container.appendChild(klarna3Button);
                    }

                    Klarna.Payments.load({ container: '#klarna3-container', payment_method_category: 'pay_later', }, function (res) { if (res.show_form) { document.getElementById('script-frame__button--klarna3').style.display = 'block'; } });
              },
              onClose: function() {
                  /** triggered when we close frame */
                  console.log('SS_Klarna3', 'on frame close hook');
              },
              onPay: function() {
                  /** triggered when we press button */
                  console.log('SS_Klarna3', 'on frame pay method');
                  Klarna.Payments.authorize( {}, {}, function(res) { fetch('https://api3-dev.aws.ssyii.com/api/v3/payments/klarna3/create-order/159937/6178/?v2=true&domain=2&lang=en&country=de&raw=1&admin=true' , {method: "POST", body: JSON.stringify(res), headers: {"Content-Type": "application/json"}}) .then(async (response) => { const resp = await response.json(); if (resp?.redirect_url) { window.top.location.href=resp.redirect_url; } else if (typeof InstallTrigger !== 'undefined' && window.self !== window.top) { window.top.location.href='https://api3-dev.aws.ssyii.com/api/v3/payments/klarna3/payments-frame/159937?v2=true&domain=2&lang=en&country=de&raw=1'; return; } else { window.top.location.href='https://api3-dev.aws.ssyii.com/checkout/fail/ba090fa4eaa34ea24a931d941275ca3f554a87a9'; } }) .catch((err) => { window.top.location.href='https://api3-dev.aws.ssyii.com/checkout/fail/ba090fa4eaa34ea24a931d941275ca3f554a87a9?err='+err.toString(); }); } )
              },
              onLoad: function() {
                  /** triggered when script is loaded */
                  console.log('SS_Klarna3.js loaded successfully');

                  function appendScript(src, callback) {
                    const script = document.createElement('script');
                    script.src = src;
                    script.onload = callback;
                    document.head.appendChild(script);
                    console.log('SS_Klarna3.js script appended');
                  }

                  if (window.Klarna && window.Klarna.Payments) {
                    console.log('not adding script again just do SS_Klarna3.js Klarna.Payments.init');
                    Klarna.Payments.init({ client_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyMzA1ZWJjLWI4MTEtMzYzNy1hYTRjLTY2ZWNhMTg3NGYzZCJ9.eyJzZXNzaW9uX2lkIjoiMjZiZjRkMjMtMWJhNi02ZDE5LWI4YmYtODE3Yzk3YWY1YzlhIiwiYmFzZV91cmwiOiJodHRwczovL2pzLnBsYXlncm91bmQua2xhcm5hLmNvbS9ldS9rcCIsImRlc2lnbiI6ImtsYXJuYSIsImxhbmd1YWdlIjoiZGUiLCJwdXJjaGFzZV9jb3VudHJ5IjoiREUiLCJlbnZpcm9ubWVudCI6InBsYXlncm91bmQiLCJtZXJjaGFudF9uYW1lIjoiUGxheWdyb3VuZCBEZW1vIE1lcmNoYW50Iiwic2Vzc2lvbl90eXBlIjoiUEFZTUVOVFMiLCJjbGllbnRfZXZlbnRfYmFzZV91cmwiOiJodHRwczovL2V1LnBsYXlncm91bmQua2xhcm5hZXZ0LmNvbSIsInNjaGVtZSI6dHJ1ZSwiZXhwZXJpbWVudHMiOlt7Im5hbWUiOiJrcGMtcHNlbC00NDI5IiwidmFyaWF0ZSI6ImEifSx7Im5hbWUiOiJrcC1jbGllbnQtb25lLXB1cmNoYXNlLWZsb3ciLCJ2YXJpYXRlIjoidmFyaWF0ZS0xIn0seyJuYW1lIjoia3AtY2xpZW50LXV0b3BpYS1mbG93IiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwYy0xay1zZXJ2aWNlIiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwLWNsaWVudC11dG9waWEtc3RhdGljLXdpZGdldCIsInZhcmlhdGUiOiJpbmRleCIsInBhcmFtZXRlcnMiOnsiZHluYW1pYyI6InRydWUifX0seyJuYW1lIjoiaW4tYXBwLXNkay1uZXctaW50ZXJuYWwtYnJvd3NlciIsInBhcmFtZXRlcnMiOnsidmFyaWF0ZV9pZCI6Im5ldy1pbnRlcm5hbC1icm93c2VyLWVuYWJsZSJ9fSx7Im5hbWUiOiJrcC1jbGllbnQtdXRvcGlhLXNkay1mbG93IiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwLWNsaWVudC11dG9waWEtd2Vidmlldy1mbG93IiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImluLWFwcC1zZGstY2FyZC1zY2FubmluZyIsInBhcmFtZXRlcnMiOnsidmFyaWF0ZV9pZCI6ImNhcmQtc2Nhbm5pbmctZW5hYmxlIn19XSwicmVnaW9uIjoiZXUiLCJvcmRlcl9hbW91bnQiOjU2NjQsIm9mZmVyaW5nX29wdHMiOjIsIm9vIjoiNXciLCJ2ZXJzaW9uIjoidjEuMTAuMC0xNTkwLWczZWJjMzkwNyIsImEiOjB9.M_-iAUWG5Q3yDqlLskKOIZ0nWr21SB7k4Mbg_5EMoPmbHZuvgjMeACAq9LjbpwcoYYRm3woLYt9MLGOAWCwCTAc0cfwtspfk8DBqCf-g9Lgc6sIJakXGFrSjph2bkmF3q5hoGTYfQ9mMelg3VSiNoVg5GkjXPLZ6rqkXHLIcALf_zq5okAPr237wO-eMeRB9DHWBUe_sJ0zN6XJhzR_R5IQiVwNMpE2FXBAQK6M9DtwPkodAmCHf-Uy1i52eqU_koQPDf6olIudO4CvlvJA5XNhHwYz-CtPo1sEfz6qRaG-Wqq7qXmYL3D72rV6KUHwnMKEAuatTop7UkUvTdbXYqQ' }); 
                    window.SS_Klarna3.ready = true; /** on frontend in some places I check whether lib is ready to work with - our custom lib and all it's deps. when everything is ready we reassign true to ready prop  */
                  } else {
                    console.log('adding SS_Klarna3.js and Klarna.Payments.init');
                    appendScript('https://x.klarnacdn.net/kp/lib/v1/api.js', () => {
                        Klarna.Payments.init({ client_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyMzA1ZWJjLWI4MTEtMzYzNy1hYTRjLTY2ZWNhMTg3NGYzZCJ9.eyJzZXNzaW9uX2lkIjoiMjZiZjRkMjMtMWJhNi02ZDE5LWI4YmYtODE3Yzk3YWY1YzlhIiwiYmFzZV91cmwiOiJodHRwczovL2pzLnBsYXlncm91bmQua2xhcm5hLmNvbS9ldS9rcCIsImRlc2lnbiI6ImtsYXJuYSIsImxhbmd1YWdlIjoiZGUiLCJwdXJjaGFzZV9jb3VudHJ5IjoiREUiLCJlbnZpcm9ubWVudCI6InBsYXlncm91bmQiLCJtZXJjaGFudF9uYW1lIjoiUGxheWdyb3VuZCBEZW1vIE1lcmNoYW50Iiwic2Vzc2lvbl90eXBlIjoiUEFZTUVOVFMiLCJjbGllbnRfZXZlbnRfYmFzZV91cmwiOiJodHRwczovL2V1LnBsYXlncm91bmQua2xhcm5hZXZ0LmNvbSIsInNjaGVtZSI6dHJ1ZSwiZXhwZXJpbWVudHMiOlt7Im5hbWUiOiJrcGMtcHNlbC00NDI5IiwidmFyaWF0ZSI6ImEifSx7Im5hbWUiOiJrcC1jbGllbnQtb25lLXB1cmNoYXNlLWZsb3ciLCJ2YXJpYXRlIjoidmFyaWF0ZS0xIn0seyJuYW1lIjoia3AtY2xpZW50LXV0b3BpYS1mbG93IiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwYy0xay1zZXJ2aWNlIiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwLWNsaWVudC11dG9waWEtc3RhdGljLXdpZGdldCIsInZhcmlhdGUiOiJpbmRleCIsInBhcmFtZXRlcnMiOnsiZHluYW1pYyI6InRydWUifX0seyJuYW1lIjoiaW4tYXBwLXNkay1uZXctaW50ZXJuYWwtYnJvd3NlciIsInBhcmFtZXRlcnMiOnsidmFyaWF0ZV9pZCI6Im5ldy1pbnRlcm5hbC1icm93c2VyLWVuYWJsZSJ9fSx7Im5hbWUiOiJrcC1jbGllbnQtdXRvcGlhLXNkay1mbG93IiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImtwLWNsaWVudC11dG9waWEtd2Vidmlldy1mbG93IiwidmFyaWF0ZSI6InZhcmlhdGUtMSJ9LHsibmFtZSI6ImluLWFwcC1zZGstY2FyZC1zY2FubmluZyIsInBhcmFtZXRlcnMiOnsidmFyaWF0ZV9pZCI6ImNhcmQtc2Nhbm5pbmctZW5hYmxlIn19XSwicmVnaW9uIjoiZXUiLCJvcmRlcl9hbW91bnQiOjU2NjQsIm9mZmVyaW5nX29wdHMiOjIsIm9vIjoiNXciLCJ2ZXJzaW9uIjoidjEuMTAuMC0xNTkwLWczZWJjMzkwNyIsImEiOjB9.M_-iAUWG5Q3yDqlLskKOIZ0nWr21SB7k4Mbg_5EMoPmbHZuvgjMeACAq9LjbpwcoYYRm3woLYt9MLGOAWCwCTAc0cfwtspfk8DBqCf-g9Lgc6sIJakXGFrSjph2bkmF3q5hoGTYfQ9mMelg3VSiNoVg5GkjXPLZ6rqkXHLIcALf_zq5okAPr237wO-eMeRB9DHWBUe_sJ0zN6XJhzR_R5IQiVwNMpE2FXBAQK6M9DtwPkodAmCHf-Uy1i52eqU_koQPDf6olIudO4CvlvJA5XNhHwYz-CtPo1sEfz6qRaG-Wqq7qXmYL3D72rV6KUHwnMKEAuatTop7UkUvTdbXYqQ' });
                        window.SS_Klarna3.ready = true; /** on frontend in some places I check whether lib is ready to work with - our custom lib and all it's deps. when everything is ready we reassign true to ready prop  */
                    });
                  }
              },
          };
      })();
  `

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/javascript',
    },
    body: scriptContent,
  })
}
