import express from 'express'
import { createAdminClient } from "../../config/appwrite.js";
import { ID } from 'node-appwrite';

const router = express.Router()
const databaseID = process.env.APPWRITE_DATABASE_ID;
const collectionID = process.env.APPWRITE_USERS_COLLECTION_ID;


router.post('/signup', async (req, res) => {
    const { database, account } = await createAdminClient()
    const { firstName, lastName, balance, email, password } = req.body;

    const name = `${lastName} ${firstName}`
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        database.createDocument(
            databaseID,
            collectionID,
            newAccount.$id,
            {
                firstName: firstName,
                lastName: lastName,
                name: name,
                email: email,
                balance: balance
            }
        )
        return res.status(200).json({ success: true, message: 'Sikeres fióklétrehozás!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error})
    }
    
})  

export default router;