const rateLimit = require("express-rate-limit")

const apiLimiter = rateLimit({
     windowMs: 60 * 1000, //for an amounth of time of 15 mins 
     max: 100 //limiting the number of calls
});

module.exports = apiLimiter 