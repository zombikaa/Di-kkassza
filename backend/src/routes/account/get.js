import express from 'express'
import { createSessionClient } from "../../config/appwrite.js";

const router = express.Router()

router.get('/get', async (req, res) => {
    const { account } = await createSessionClient(req);
    
    try {
        const user = await account.get()
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json(error);
    }
})  

export default router;