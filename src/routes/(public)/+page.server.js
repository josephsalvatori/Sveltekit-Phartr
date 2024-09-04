import { textToPhonemes } from "$lib/helpers/textToSound";

export const ssr = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {

	return {}
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ fetch, request }) => {

		const data = await request.formData();

		let text = data.get("text");
		let phonemes = await textToPhonemes(text);

		if(!phonemes) {
			return { success: false, error: "No phonemes found" };
		}

		return { success: true, phonemes: phonemes };
	}
};