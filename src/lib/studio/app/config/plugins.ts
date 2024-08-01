
import { PUBLIC_SANITY_STUDIO_URL } from "$env/static/public";
import { dev } from "$app/environment";
import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { media } from "sanity-plugin-media";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { locate } from "./locations";
import { structure } from "./structure";

const staticOrigin = "http://localhost:5173";
const plugins = [
	structure,
	presentationTool({
		previewUrl: {
			origin: (!dev) ? (PUBLIC_SANITY_STUDIO_URL || staticOrigin) : staticOrigin,
			previewMode: {
				enable: "/api/preview"
			}
		},
		resolve: {
			locations: locate
		}
	}),
	visionTool(),
	media(),
	unsplashImageAsset(),
	codeInput()
];

export default plugins;