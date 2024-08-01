// Document types
import { homeType } from "../schema/home";
import { linkListType } from "$sanity/schema/linkList";
import { pageType } from "../schema/page";
import { settingsType } from "../schema/settings";

// Block types
import { navDocument } from "../lib/blocks/navDocument";
import { navLink } from "../lib/blocks/navLink";
import { mediaBlock } from "../lib/blocks/media";

const singletonTypes = new Set(["home","settings"]);

const blocks = [
	navDocument,
	navLink,
	mediaBlock
];

const documents = [
	homeType,
	linkListType,
	pageType,
	settingsType
];

const schema = {
	types: [
		...documents,
		...blocks
	],
	templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType))
};

export default schema;