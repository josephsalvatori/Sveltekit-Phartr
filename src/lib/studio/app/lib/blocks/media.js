import { defineField, defineType } from "sanity";

export const mediaBlock = defineType({
	name: "media",
	type: "object",
	title: "Media",
	fields: [
		defineField({
			name: "image",
			type: "image",
			options: {
				hotspot: true
			},
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Alt Text"
				})
			]
		})
	]
});