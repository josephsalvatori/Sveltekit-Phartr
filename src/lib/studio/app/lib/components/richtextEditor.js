import { DocumentIcon } from "@sanity/icons";

/**
 * Richtext Component
 * @param {Object} settings
 * @param {string} settings.name
 * @param {string} settings.title
 * @param {Array<string>} settings.filterTypes
 * @param {Array<string>} settings.filterStyles
 * @param {Array<string>} settings.filterLinks
 * @param {Array<string>} settings.filterLists bullet | number
 * @param {Array<string>} settings.linkedContentTypes
 * @returns
 */
export const richtextEditorComponent = (settings = {}) => {

	const defaults = {
		name: "content",
		title: "Content",
		filterTypes: [],
		filterStyles: [],
		filterLinks: [],
		filterLists: [],
		linkedContentTypes: [
			"page"
		]
	};

	const config = { ...defaults, ...settings };

	return {
		name: config.name,
		type: "array",
		title: config.title,
		of: [
			{
				type: "block",
				lists: [
					{ title: "Bullet", value: "bullet" },
					{ title: "Number", value: "number" }
				].filter((item) => (!config.filterLists.includes(item.value) && !config.filterLists.includes(item.title))),
				marks: {
					annotations: [
						{
							name: "link",
							type: "object",
							title: "External Link",
							fields: [
								{
									name: "href",
									type: "url",
									title: "URL"
								},
								{
									title: "Open in new tab",
									name: "blank",
									description: "Read https://css-tricks.com/use-target_blank/",
									type: "boolean"
								}
							]
						},
						{
							name: "internalLink",
							type: "object",
							title: "Internal Link",
							icon: DocumentIcon,
							fields: [
								{
									name: "reference",
									type: "reference",
									title: "Reference",
									to: config.linkedContentTypes.map((type) => ({ type }))
								}
							]
						}
					].filter((item) => !config.filterLinks.includes(item.name)),
					decorators: [
						{ title: "Strong", value: "strong" },
						{ title: "Emphasis", value: "em" },
						{ title: "Underline", value: "underline" },
						{ title: "Strike", value: "strike-through" },
						{ title: "Code", value: "code" }
					]
				},
				styles: [
					{ title: "Paragraph", value: "normal" },
					{ title: "Heading 1", value: "h1" },
					{ title: "Heading 2", value: "h2" },
					{ title: "Heading 3", value: "h3" },
					{ title: "Heading 4", value: "h4" },
					{ title: "Heading 5", value: "h5" },
					{ title: "Heading 6", value: "h6" },
					{ title: "Blockquote", value: "blockquote" }
				].filter((item) => (!config.filterStyles.includes(item.value) && !config.filterStyles.includes(item.title)))
			},
			{
				type: "image"
			},
			{
				type: "code"
			}
		].filter((item) => !config.filterTypes.includes(item.type))
	}
};