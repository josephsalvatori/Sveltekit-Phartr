import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { isUniqueAcrossAllDocuments } from "../lib/functions/isUniqueAcrossAllDocuments";
import { richtextEditorComponent } from "../lib/components/richtextEditor";
import { metadataFieldGroup } from "../lib/fields/metadataGroup";
import { pagebuilderFieldGroup } from "../lib/fields/pagebuilderGroup";

let richtextEditor = richtextEditorComponent();

export const pageType = defineType({
	name: "page",
	title: "Page",
	type: "document",
	icon: DocumentIcon,
	groups: [
		{
			name: "main",
			title: "Main Content",
			default: true
		},
		{
			name: "builder",
			title: "Page Builder",
		},
		{
			name: "metadata",
			title: "Metadata & SEO",
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
		...pagebuilderFieldGroup,
		...metadataFieldGroup
	]
});