import express from 'express'
import { createSessionClient } from "../../config/appwrite.js";
import { Query } from 'node-appwrite';

const router = express.Router()

const databaseID = process.env.APPWRITE_DATABASE_ID;
const collectionID = process.env.APPWRITE_USERS_COLLECTION_ID;

router.get('/get', async (req, res) => {
    const { account, database } = await createSessionClient(req);
    
    try {
        const user = await account.get();
        let userData = [];
        
        if (req.query.userData === 'true') {
            const collectionResponse = await database.listDocuments(databaseID, collectionID, 
            [
              Query.equal('$id', user.$id)
            ]);
            userData = collectionResponse.documents;
        };

        res.status(200).json({
            user,
            collectionData: userData.length ? userData : undefined,
        });
    } catch (error) {
        return res.status(500).json({message: error});
    }
})  

export default router;