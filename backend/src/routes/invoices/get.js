import express from 'express'
import { createSessionClient } from "../../config/appwrite.js";
import { Query } from 'node-appwrite';

const router = express.Router()

const databaseID = process.env.APPWRITE_DATABASE_ID;
const collectionID = process.env.APPWRITE_INVOICES_COLLECTION_ID;

router.get('/get', async (req, res) => {
    const { account, database } = await createSessionClient(req);
    
    try {
        const user = await account.get();
        
        const collectionResponse = await database.listDocuments(databaseID, collectionID, 
        [
          Query.equal('user', user.$id),
          Query.orderDesc('$createdAt')
        ]);

        res.status(200).json({
            invoices: collectionResponse
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})  

export default router;