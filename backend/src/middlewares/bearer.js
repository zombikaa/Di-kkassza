const VALID_API_KEY = process.env.DIKA_API_KEY;

export const apiKeyMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const apiKey = authHeader.split(' ')[1];

    if (!apiKey) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (apiKey !== VALID_API_KEY) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
};
