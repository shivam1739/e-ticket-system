
import rateLimit from 'express-rate-limit';


const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 300,
    message: 'Too many requests from this IP, please try again later.',
    headers: true,
});

export default limiter;
