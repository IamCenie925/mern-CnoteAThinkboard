import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    //per user
  try {
    //const { success } = await ratelimit.limit("userid"); - if havingauthentication, or IP address
    const { success } = await ratelimit.limit("my-rate-limit");
    if (!success) {
      return res.status(429).json({ //too many requests
        message: "Too many requests, please try again later",
      });
    }  
    next();
    //if success, call next function (), application will run as expected
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
