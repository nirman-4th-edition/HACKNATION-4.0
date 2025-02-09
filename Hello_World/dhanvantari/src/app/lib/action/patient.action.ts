'use server'

import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
import {
  NEXT_PUBLIC_BUCKET_ID as BUCKET_ID,
  NEXT_PUBLIC_DATABASE_ID as DATABASE_ID,
  NEXT_PUBLIC_ENDPOINT as ENDPOINT,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID as PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_PROJECT_ID as PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";

console.log(ENDPOINT);

export interface CreateUserParams {
  email: string;
  phone: string;
  name: string;
}

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      undefined,
      undefined,
      user.name
    );
    return newUser;
  } catch (err: any) {
    console.error("Error creating user:", err.message);

    if (err.code === 409) {
      const documents = await users.list([
        Query.equal("email", [user.email]),
      ]);
      return documents?.users?.[0];
    }

    throw err;
  }
};