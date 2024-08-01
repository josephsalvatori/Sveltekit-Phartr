import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { lucia } from "$lib/server/lucia";
import { createRequestHandler, setServerClient } from "@sanity/svelte-loader";
import { serverClient } from "$lib/studio/server/sanity";

setServerClient(serverClient);

const sanityHandler = createRequestHandler();

/** @type {import('@sveltejs/kit').Handle} */
const appHandler = async ({ event, resolve }) => {

	const startTimer = Date.now();

	let date = new Date();

	date.setFullYear(date.getFullYear() + 1);

	event.locals.startTimer = startTimer;

	const uid = event.cookies.get("uid");
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if(!sessionId) {

		event.locals.user = null;
		event.locals.userId = uid || crypto.randomUUID();
		event.locals.session = null;

		event.cookies.set("uid", event.locals.userId, {
			httpOnly: true,
			path: "/",
			expires: date
		});

		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	let sessionCookie;

	if(session && session.fresh) {

		sessionCookie = lucia.createSessionCookie(sessionId);
	}

	if(!session) {

		sessionCookie = lucia.createBlankSessionCookie();
	}

	if(sessionCookie) {

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}

	if(typeof user?.id === "object") user.id = user.id.toString();

	event.locals.user = user;
	event.locals.session = session;

	if(user?.uid) {

		event.locals.userId = user.uid;
		event.cookies.set("uid", event.locals.userId, {
			httpOnly: true,
			path: "/",
			expires: date
		});
	}

	if(event.route.id?.startsWith("/(protected)")) {

		if(!user) redirect(302, "/login");
		if(!user.verified) redirect(302, "/verify/email");
	}

	return resolve(event);
};

/** @type {import('@sveltejs/kit/hooks').sequence} */
export const handle = sequence(sanityHandler, appHandler);