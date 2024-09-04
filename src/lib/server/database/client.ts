import postgres from "postgres";
import { POSTGRES_DATABASE, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from "$env/static/private";
import { dev } from "$app/environment";

let client: any | undefined;
let clientCache: any | undefined;

if(dev) {

	if(!clientCache) clientCache = postgres({
		host: POSTGRES_HOST,
		port: 5432,
		database: POSTGRES_DATABASE,
		password: POSTGRES_PASSWORD,
		username: POSTGRES_USER,
		ssl: (dev) ? "require" : true
	});

	client = clientCache;

} else  {

	client = postgres({
		host: POSTGRES_HOST,
		port: 5432,
		database: POSTGRES_DATABASE,
		password: POSTGRES_PASSWORD,
		username: POSTGRES_USER,
		ssl: true
	});
}

export default client;