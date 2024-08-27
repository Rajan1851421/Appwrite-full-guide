// config.js

import { Client, Account } from "appwrite";

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Set the Appwrite API endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Set the Appwrite project ID

// Initialize the Account object for authentication-related operations
export const account = new Account(client);

// Function to create a JWT token for the logged-in user
export const createJWT = async () => {
  try {
    // Check if the user is logged in
    const currentSession = await account.getSession('current');
    
    if (currentSession) {
      // Create a JWT token for the current session
      const jwt = await account.createJWT();
      console.log("Created Token");

      return jwt; // Return the JWT token
    } else {
      console.error("User is not authenticated");
      throw new Error("User is not authenticated");
    }
  } catch (error) {
    console.error("Failed to create JWT:", error.message);
    throw error; // Re-throw the error for further handling
  }
};
