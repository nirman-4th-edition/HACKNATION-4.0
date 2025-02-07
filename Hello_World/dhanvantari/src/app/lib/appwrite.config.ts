import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT,
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_API_KEY,
  NEXT_PUBLIC_DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID,
} = process.env;

// Ensure environment variables are set correctly
if (!NEXT_PUBLIC_ENDPOINT || !NEXT_PUBLIC_PROJECT_ID || !NEXT_PUBLIC_API_KEY) {
  throw new Error("Missing Appwrite environment variables.");
}

// Initialize Appwrite client
const client = new sdk.Client();
client.setEndpoint(NEXT_PUBLIC_ENDPOINT).setProject(NEXT_PUBLIC_PROJECT_ID).setKey(NEXT_PUBLIC_API_KEY);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);