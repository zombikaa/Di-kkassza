import { createSessionClient } from "../config/appwrite.js";

export const protectedRouteMiddleware = async (req, res, next) => {
    const { account } = await createSessionClient(req);
    
    try {
        const user = await account.get();
        req.user = user;
        next();
    } catch (error) {
        if (error.code === 401) {
            return res.redirect('/login');
        }
        return res.status(500).json({ success: false, error: error.message });
    }
};