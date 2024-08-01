import { MongoClient } from "mongodb";
import { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_CLUSTER } from "$env/static/private";
import { dev } from "$app/environment";

/*
MONGODB_USER="qlmaadmin"
MONGODB_PASSWORD="4sPQyLccHSTTuFlv"
MONGODB_HOST="dseshhy.mongodb.net"
MONGODB_CLUSTER="marketingappdev"
MONGODB_REST_API_HOST="https://us-east-2.aws.data.mongodb-api.com/app/data-phjvpow/endpoint/data/v1/action/"
MONGODB_REST_API_ENDPOINT="data-phjvpow"
MONGODB_REST_API_KEY="RN9fuYP91dlcUylApD14FepRfqxmKHuUbsDWTwoOtbhgktYcZZidRRmPTDC4nYB1"
*/

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.${MONGODB_HOST}/?retryWrites=true&w=majority`;
// const db_connection = new MongoClient(uri);

let client;
let clientCache;

if(dev) {

	if(!clientCache) clientCache = new MongoClient(uri);

	client = clientCache;

} else  {

	client = new MongoClient(uri);
}

export default client;