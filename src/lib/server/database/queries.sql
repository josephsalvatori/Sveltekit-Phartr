-- create a table named Companies with different columns

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "user" (
	id TEXT PRIMARY KEY,
	auth_token TEXT,
	created_at TIMESTAMP DEFAULT NOW(),
	date_of_birth TIMESTAMP DEFAULT NULL,
	first_name TEXT DEFAULT NULL,
	last_name TEXT DEFAULT NULL,
	title TEXT DEFAULT NULL,
	email VARCHAR(255) NOT NULL,
	marketing BOOLEAN,
	provider TEXT DEFAULT NULL,
	provider_id TEXT DEFAULT NULL,
	uid UUID DEFAULT uuid_generate_v4(),
	updated_at TIMESTAMP DEFAULT NOW(),
	verified BOOLEAN
);

CREATE TABLE IF NOT EXISTS "user_session" (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id TEXT NOT NULL REFERENCES "user" ("id")
);