// import adapter from "@sveltejs/adapter-auto";
import adapter from "@sveltejs/adapter-vercel";
import { sveltePreprocess} from "svelte-preprocess";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			"$sanity": "./src/lib/studio/app",
			"$ext": "./ext"
		},
		paths: {
			relative: false
		},
		prerender: {
			crawl: false,
			entries: []
		}
	},
	preprocess: [
		sveltePreprocess({
			postcss: join(__dirname, "postcss.config.cjs"),
			preserve: ["ld+json"]
		})
	],
};

export default config;
