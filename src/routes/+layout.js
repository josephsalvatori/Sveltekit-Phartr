
import { setPreviewing } from "@sanity/svelte-loader";

/** @type {import('./$types').LayoutLoad} */
export async function load({ data: { preview }}) {
	setPreviewing(preview);
};