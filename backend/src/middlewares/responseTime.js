export const responseTimeMiddleware = (req, res, next) => {
    req.startTime = Date.now(); 
    next(); 
};
