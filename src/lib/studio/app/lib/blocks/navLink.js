import { defineField, defineType } from "sanity";
import { stringComponent, stringComponentWithCharacterCount } from "../components/customStringComponents";

export const navLink = defineType({
	name: "navLink",
	type: "object",
	title: "Nav Link",
	fields: [
		defineField({
			name: "text",
			type: "string",
			title: "Text",
			components: {
				input: stringComponent
			}
		}),
		defineField({
			name: "external",
			type: "boolean",
			initialValue: true
		}),
		defineField({
			name: "link",
			type: "url"
		})
	]
});