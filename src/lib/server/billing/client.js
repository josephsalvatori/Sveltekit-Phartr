import Stripe from "stripe";
import { STRIPE_SECRET } from "$env/static/private";

let client;

if(!client) {
	console.log("new cache");
	client = new Stripe(STRIPE_SECRET);
} else {
	console.log("now from cache");
}

export default client;