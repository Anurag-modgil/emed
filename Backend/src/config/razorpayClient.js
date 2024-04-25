const Razorpay = require("razorpay");

apiKey = "rzp_test_nIN8FXgvfHAhT1";
apiSecret = "47P6X401ZyS7OQR2MuGZ0ffw";

const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});

module.exports = razorpay;
