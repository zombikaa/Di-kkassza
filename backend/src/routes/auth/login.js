import express from 'express'
import { createAdminClient } from "../../config/appwrite.js";

const router = express.Router()

router.post('/login', async (req, res) => {
    const { account } = await createAdminClient()
    const { email, password } = req.body;

    try {
        const session = await account.createEmailPasswordSession(email, password);
        res.cookie('session', session.secret, {
            httpOnly: true,
            secure: true, 
            sameSite: 'strict',
            maxAge: new Date(session.expire) - Date.now(),
            path: '/'
        });

        return res.status(200).json({ success: true });

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Hibás bejelentkezési adatok.' });
    }
});

export default router;
