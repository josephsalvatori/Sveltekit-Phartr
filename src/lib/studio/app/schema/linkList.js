import { defineField, defineType } from "sanity";
import { UlistIcon } from "@sanity/icons";
import { stringComponent, stringComponentWithCharacterCount } from "../lib/components/customStringComponents";

export const linkListType = defineType({
	name: "linkList",
	title: "Link List",
	type: "document",
	icon: UlistIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			validation: (Rule) => Rule.required(),
			components: {
				input: stringComponent
			}
		}),
		defineField({
			name: "primaryLink",
			type: "array",
			title: "Primary link",
			of: [{ type: "navLink" }, { type: "navDocument" }],
			validation: rule => rule.max(1)
		}),
		defineField({
			name: "subLinks",
			type: "array",
			title: "Secondary links",
			of: [{ type: "navLink" }, { type: "navDocument" }]
		})
	]
});