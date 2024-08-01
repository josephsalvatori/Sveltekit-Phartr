import { defineField } from "sanity";
import { stringComponentWithCharacterCount } from "../components/customStringComponents";
import { mediaAssetSource } from "sanity-plugin-media";
import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

export const metadataFieldGroup = [
	defineField({
		name: "metaTitle",
		title: "Meta Title",
		type: "string",
		group: "metadata",
		custom: {
			maxLength: 60
		},
		components: {
			input: stringComponentWithCharacterCount
		},
		validation: (Rule) => Rule.max(60)
	}),
	defineField({
		name: "metaDescription",
		title: "Meta Description",
		description: "Here is a description",
		type: "string",
		group: "metadata",
		custom: {
			maxLength: 160
		},
		components: {
			input: stringComponentWithCharacterCount
		},
		validation: (Rule) => Rule.max(160)
	}),
	defineField({
		name: "metaImage",
		title: "Meta Image",
		type: "image",
		group: "metadata",
		options: {
			sources: [
				mediaAssetSource,
				unsplashAssetSource
			]
		}
	}),
];