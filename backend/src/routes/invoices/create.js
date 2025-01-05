import express from 'express'
import { createAdminClient, createSessionClient } from "../../config/appwrite.js";
import { ID, Permission, Role } from 'node-appwrite';

const router = express.Router()

const databaseID = process.env.APPWRITE_DATABASE_ID;
const collectionID = process.env.APPWRITE_INVOICES_COLLECTION_ID;

router.post('/create', async (req, res) => {
    const { account } = await createSessionClient(req);
    const { database } = await createAdminClient();
    const { type, amount, category } = req.body;
    
    try {
        const user = await account.get();
        database.createDocument(
            databaseID,
            collectionID,
            ID.unique(),
            {
                type: type,
                amount: amount,
                category: category,
                user: user.$id
            },
            [
                Permission.read(Role.user(user.$id)),
            ]
        )

        return res.status(200).json({ success: true, message: 'Számla sikeresen létrehozva!' });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})  

export default router;