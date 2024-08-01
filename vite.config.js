import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwind from "tailwindcss";

const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ["sanity"]
	},
	css: {
		preprocesserOptions: {
			plugins: [tailwind],
			typescript: {
				compilerOptions: {
					strict: true
				}
			}
		}
	},
	server: {
		fs: {
			allow: [".."]
		}
	},
	define: {
		global: {}
	}
};

export default defineConfig(config);