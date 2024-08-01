import { defineArrayMember, defineField, defineType } from "sanity";
import { mediaBlock } from "../blocks/media";

export const pagebuilderFieldGroup = [
	defineField({
		name: "pageBuilder",
		type: "array",
		title: "Page Builder",
		group: "builder",
		of: [
			// defineArrayMember({
			// 	name: "Media",
			// 	type: "media"
			// })
			defineArrayMember({
				"name": "Single Column",
				"type": "object",
				"fields": [
					defineField({
						"name": "content",
						"type": "array",
						"of": [
							defineArrayMember({
								"name": "Media",
								"type": "media"
							}),
							defineArrayMember({
								"name": "Richtext",
								"type": "object",
								"fields": [
									defineField({
										"name": "content",
										"type": "string"
									})
								]
							})
						]
					})
				]
			}),
			defineArrayMember({
				"name": "Two Column",
				"type": "object",
				"fields": [
					defineField({
						"name": "content",
						"type": "array",
						"of": [
							defineArrayMember({
								"name": "Media",
								"type": "media"
							}),
							defineArrayMember({
								"name": "Richtext",
								"type": "object",
								"fields": [
									defineField({
										"name": "content",
										"type": "string"
									})
								]
							})
						]
					})
				]
			})
		]
	})
];