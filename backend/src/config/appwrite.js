import { Account, Client, Databases } from 'node-appwrite';

const projectID = process.env.APPWRITE_PROJECT_ID;
const endpoint = process.env.APPWRITE_ENDPOINT;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;

const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectID)
    .setKey(APPWRITE_API_KEY)
    .setLocale('hu')

  return {
    get account() {
      return new Account(client)
    },
    get database() {
      return new Databases(client)
    }
  }
}

const createSessionClient = async (req) => {
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectID)
    .setLocale('hu')

    const session = req.cookies.session;

    if (session) {
      client.setSession(session)
    }

  return {
    get account() {
      return new Account(client)
    },
    get database() {
      return new Databases(client)
    }
  }
}

export { createAdminClient, createSessionClient }