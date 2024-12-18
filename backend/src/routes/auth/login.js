import express from 'express'
import { createAdminClient } from "../../config/appwrite.js";

const router = express.Router()

router.post('/login', async (req, res) => {
    const { account } = await createAdminClient()
    const { email, password } = req.body;
    const session = await account.createEmailPasswordSession(email, password)

    res.cookie('session', session.secret, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: new Date(session.expire),
        path: '/'
    })
    return res.status(200).json({ success: true });
})  

export default router;