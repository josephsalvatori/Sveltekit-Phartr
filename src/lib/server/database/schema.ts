export interface userTable {
	_id: string;
	auth_token: string;
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

export interface sessionTable {
	_id: string;
	expires_at: Date;
	user_id: string;
}

export type UserDoc = userTable;
export type SessionDoc = sessionTable;