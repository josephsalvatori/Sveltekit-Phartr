import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";
import { isUniqueAcrossAllDocuments } from "../lib/functions/isUniqueAcrossAllDocuments";
import { richtextEditorComponent } from "../lib/components/richtextEditor";
import { metadataFieldGroup } from "../lib/fields/metadataGroup";
import { pagebuilderFieldGroup } from "../lib/fields/pagebuilderGroup";

let richtextEditor = richtextEditorComponent();

export const fartType = defineType({
	name: "farts",
	title: "Farts",
	type: "document",
	icon: StarIcon,
	groups: [
		{
			name: "main",
			title: "Main Content",
			default: true
		}
	],
	fields: [
		defineField({
			name: "title",
			type: "string",
			group: "main",
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			group: "main",
			validation: (Rule) => Rule.required(),
			options: {
				source: "title",
				isUnique: isUniqueAcrossAllDocuments
			}
		}),
		defineField(richtextEditor),
	]
});