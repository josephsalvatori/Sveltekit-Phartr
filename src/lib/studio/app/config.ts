import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from "$env/static/public";
import { defineConfig } from "sanity";
import components from "./config/components";
import document from "./config/document";
import plugins from "./config/plugins";
import schema from "./config/schema";
import "./static/custom.css";

export default defineConfig({
	name: "sanity-theme",
	title: "Sanity Theme",
	basePath: "/studio",
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	liveEdit: false,
	plugins,
	schema,
	document,
	studio: {
		components
	}
});