import { dev } from "$app/environment";
// import { Google } from "arctic";
import { Lucia, TimeSpan } from "lucia";
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import client from "./database/client";

const sql = client;

const adapter = new PostgresJsAdapter(sql, {
	user: "user",
	session: "user_session"
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: "session",
		expires: false,
		attributes: {
			secure: !dev
		}
	},
	sessionExpiresIn: new TimeSpan(30, "d"),
	getUserAttributes: (attributes) => {
		// Protected attributes, controls what the user object contains; will merge with `id`
		return {
			billing: attributes.billing,
			created_at: attributes.created_at,
			details: attributes.details,
			email: attributes.email,
			notifications: attributes.notifications,
			// phone: attributes.phone,
			provider: attributes.provider,
			provider_id: attributes.provider_id,
			uid: attributes.uid,
			updated_at: attributes.updated_at,
			verified: attributes.verified
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof Lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	id: string;
	auth_token: string;
	billing?: {
		id?: string | null;
		token?: string | null;
	},
	created_at: Date;
	details: {
		date_of_birth: string;
		first_name: string;
		last_name: string;
		title: string;
	};
	email: string;
	notifications: {
		marketing: boolean;
	};
	provider?: string;
	provider_id?: string;
	uid: string;
	updated_at: Date;
	verified: boolean;
}

// const googleRedirectUrl = dev ? "http://localhost:5173/oauth/google/callback" : `${BASE_URL}/oauth/google/callback`;

// export const googleOAuth = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, googleRedirectUrl);