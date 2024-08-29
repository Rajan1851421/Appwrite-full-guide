import { Client, Account, Databases, Storage, ID } from "appwrite";

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Set the Appwrite API endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Set the Appwrite project ID

// Initialize the Account object for authentication-related operations
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const getAllFiles = async () => {
  try {
    const response = await storage.listFiles(import.meta.env.VITE_APPWRITE_BUCKET_ID);
    return response.files; // Return the list of files
  } catch (error) {
    console.error("Failed to fetch files:", error.message);
    throw error; // Re-throw the error for further handling
  }
};