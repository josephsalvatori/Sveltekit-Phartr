import { loadFlash } from "sveltekit-flash-message/server";

export const trailingSlash = "never";

/** @type {import('./$types').LayoutServerLoad} */
export const load = loadFlash(async ({ locals }) => {

	return {
		preview: locals.preview,
		user: locals.user,
		uid: locals.userId
	}
});