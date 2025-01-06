import { Client, Account, Avatars } from "appwrite";

export const appwriteConfig = {
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client.setProject(appwriteConfig.projectID),
client.setEndpoint(appwriteConfig.endpoint),
client.setLocale("hu")

export const account = new Account(client);
export const avatars = new Avatars(client);