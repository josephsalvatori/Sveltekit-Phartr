import { defineField, defineType } from "sanity";
import { ChartUpwardIcon, CogIcon } from "@sanity/icons";
import { stringComponent, stringComponentWithCharacterCount } from "../lib/components/customStringComponents";

export const settingsType = defineType({
	name: "settings",
	title: "Settings",
	type: "document",
	icon: CogIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
			initialValue: "Site Settings",
			readOnly: true,
			hidden: true,
			components: {
				input: stringComponent
			}
		}),
		// Main Site info
		defineField({
			name: "info",
			title: "Website Information",
			type: "object",
			options: {
				collapsible: true,
				collapsed: false
			},
			fields: [
				defineField({
					name: "siteTitle",
					title: "Site Title",
					type: "string",
					components: {
						input: stringComponent
					}
				}),
				defineField({
					name: "siteDescription",
					title: "Site Description",
					type: "string",
					custom: {
						maxLength: 160
					},
					components: {
						input: stringComponentWithCharacterCount
					},
					validation: (Rule) => Rule.max(160)
				}),
				defineField({
					name: "siteFavicon",
					title: "Site Favicon",
					type: "image"
				})
			]
		}),
		// Organization info
		defineField({
			name: "organization",
			title: "Organization Information",
			type: "object",
			options: {
				collapsible: true,
				collapsed: true
			},
			fields: [
				defineField({
					name: "orgName",
					title: "Organization Name",
					type: "string",
					components: {
						input: stringComponent
					}
				}),
				defineField({
					name: "orgLegalName",
					title: "Organization Legal Name",
					type: "string",
					components: {
						input: stringComponent
					}
				}),
				defineField({
					name: "orgDescription",
					title: "Organization Description",
					type: "string",
					components: {
						input: stringComponent
					}
				}),
				defineField({
					name: "orgUrl",
					title: "Organization Url",
					type: "url",
					components: {
						input: stringComponent
					},
					custom: {
						type: "url"
					},
					validation: (Rule) => Rule.uri({
						scheme: ["https"],
					}),
				})
			]
		}),
		// Social Links
		defineField({
			name: "socialLinks",
			title: "Social Links",
			type: "object",
			options: {
				collapsible: true,
				collapsed: true,
				columns: 2
			},
			fields: [
				defineField({
					name: "facebook",
					title: "Facebook",
					type: "url",
					components: {
						input: stringComponent
					},
					custom: {
						type: "url"
					},
					validation: (Rule) => Rule.uri({
						scheme: ["https"],
					}),
				}),
				defineField({
					name: "instagram",
					title: "Instagram",
					type: "url",
					components: {
						input: stringComponent
					},
					custom: {
						type: "url"
					},
					validation: (Rule) => Rule.uri({
						scheme: ["https"],
					}),
				}),
				defineField({
					name: "threads",
					title: "Threads",
					type: "url",
					components: {
						input: stringComponent
					},
					custom: {
						type: "url"
					},
					validation: (Rule) => Rule.uri({
						scheme: ["https"],
					}),
				}),
				defineField({
					name: "tiktok",
					title: "TikTok",
					type: "url",
					components: {
						input: stringComponent
					},
					custom: {
						type: "url"
					},
					validation: (Rule) => Rule.uri({
						scheme: ["https"],
					}),
				}),
				defineField({
					name: "twitter",
					title: "Twitter",
					type: "url",
					components: {
						input: stringComponent
					},
					custom: {
						type: "url"
					},
					validation: (Rule) => Rule.uri({
						scheme: ["https"],
					}),
				}),
				defineField({
					name: "youtube",
					title: "YouTube",
					type: "url",
					components: {
						input: stringComponent
					},
					custom: {
						type: "url"
					},
					validation: (Rule) => Rule.uri({
						scheme: ["https"],
					}),
				}),
				defineField({
					name: "pinterest",
					title: "Pinterest",
					type: "url",
					components: {
						input: stringComponent
					},
					custom: {
						type: "url"
					},
					validation: (Rule) => Rule.uri({
						scheme: ["https"],
					}),
				}),
				defineField({
					name: "spotify",
					title: "Spotify",
					type: "url",
					components: {
						input: stringComponent
					},
					custom: {
						type: "url"
					},
					validation: (Rule) => Rule.uri({
						scheme: ["https"],
					}),
				})
			]
		}),
		// Analytics
		defineField({
			name: "analytics",
			title: "Analytics",
			type: "object",
			icon: ChartUpwardIcon,
			options: {
				collapsible: true,
				collapsed: true
			},
			fields: [
				defineField({
					name: "gaID",
					title: "GA Measurement ID",
					type: "string",
					components: {
						input: stringComponent
					}
				}),
				defineField({
					name: "fbID",
					title: "Facebook Pixel ID",
					type: "string",
					components: {
						input: stringComponent
					}
				}),
				defineField({
					name: "siteScripts",
					description: "Place any sitewide scripts or pixels here",
					title: "Site Scripts / Pixels",
					type: "code",
					options: {
						language: "HTML"
					}
				})
			]
		})
	]
});