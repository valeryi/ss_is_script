import { paymentHandler, paymentResponse } from "./payment";

paymentResponse.url = "https://ssisscript-preview.netlify.app/library.js";

exports.handler = paymentHandler(paymentResponse);
