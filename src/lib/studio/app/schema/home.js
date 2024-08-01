import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { isUniqueAcrossAllDocuments } from "../lib/functions/isUniqueAcrossAllDocuments";
import { stringComponent, stringComponentWithCharacterCount } from "../lib/components/customStringComponents";
import { richtextEditorComponent } from "../lib/components/richtextEditor";
import { metadataFieldGroup } from "../lib/fields/metadataGroup";
import { pagebuilderFieldGroup } from "../lib/fields/pagebuilderGroup";

export const homeType = defineType({
	name: "home",
	title: "Home",
	type: "document",
	icon: HomeIcon,
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
			initialValue: "Home",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			group: "main",
			initialValue: "home",
			validation: (Rule) => Rule.required(),
			options: {
				source: "title",
				isUnique: isUniqueAcrossAllDocuments
			}
		}),
		...pagebuilderFieldGroup,
		...metadataFieldGroup
	]
});