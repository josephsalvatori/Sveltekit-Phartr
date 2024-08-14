import { dev } from "$app/environment";
import client from "$lib/server/database/client";
import { ObjectId } from "mongodb";
import type { UserDoc } from "./schema";

// TODO: REWRITE FOR POSTGRES
let environment = dev ? "Development" : "Production";

export const getUserByEmail = async (email: string): Promise<UserDoc | null> => {

	const db = await client.db(environment);
	const user = await db.collection("users").findOne({ email });

	if(!user || user.length === 0) {
		return null;
	}

	return user;
}

export const getUserByToken = async (token: string): Promise<UserDoc | null> => {

	const db = await client.db(environment);
	const user = await db.collection("users").findOne({ auth_token: token });

	if(user.length === 0) {
		return null;
	}

	return user;
}

export const updateUser = async (id: object | string, user: UserDoc): Promise<UserDoc> => {

	if(typeof id === "string") id = new ObjectId(id);

	console.log("typeof", typeof id);

	const db = await client.db(environment);
	const result = await db.collection("users").findOneAndUpdate({
		_id: id
	}, {
		$set: user
	}, {
		includeResultMetadata: true,
		upsert: true,
		returnDocument: "after",
	});

	return result;
}

export const createUser = async (user: UserDoc): Promise<UserDoc> => {

	let errors = [];
	const db = await client.db(environment);
	const result = await db.collection("users").findOneAndUpdate({
		email: user.email
	}, {
		$setOnInsert: user
	}, {
		includeResultMetadata: true,
		upsert: true,
		returnDocument: "after",
	});

	// User already exists
	if(result?.ok !== 1 || result?.lastErrorObject?.updatedExisting === true) {

		// TODO: Bind errors to globally managed error handler
		return null;
	}

	// Return user, only if they were new
	if(result?.ok === 1 && result?.value?._id && result.lastErrorObject?.updatedExisting === false) {

		return result.value;
	}

	return null;
}