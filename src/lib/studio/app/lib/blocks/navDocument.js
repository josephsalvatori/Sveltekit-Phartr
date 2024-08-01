import { defineField, defineType } from "sanity";
import { stringComponent, stringComponentWithCharacterCount } from "../components/customStringComponents";

export const navDocument = defineType({
	name: "navDocument",
	type: "object",
	title: "Nav Document",
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
			name: "reference",
			type: "reference",
			to: [{ type: "page" }],
			weak: true
		})
	]
});