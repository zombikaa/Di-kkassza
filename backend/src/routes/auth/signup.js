import express from 'express'
import { createAdminClient } from "../../config/appwrite.js";
import { ID, Permission, Role } from 'node-appwrite';

const router = express.Router()
const databaseID = process.env.APPWRITE_DATABASE_ID;
const collectionID = process.env.APPWRITE_USERS_COLLECTION_ID;


router.post('/signup', async (req, res) => {
    const { database, account } = await createAdminClient();
    const { firstname, lastname, balance, email, password, scholarship, salary } = req.body;

    const name = `${lastname} ${firstname}`;

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
                firstName: firstname,
                lastName: lastname,
                name: name,
                balance: balance,
                scholarship: scholarship,
                salary: salary,
            },
            [
                Permission.read(Role.user(newAccount.$id)),
            ]
        );

        return res.status(200).json({ success: true, message: 'Sikeres fióklétrehozás!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


export default router;