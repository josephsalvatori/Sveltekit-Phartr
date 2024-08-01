import { structureTool } from "sanity/structure";
import { CogIcon, HomeIcon } from "@sanity/icons";

export const structure = structureTool({
	structure: (S) =>
		S.list()
			.title("Content")
			.items([
				S.listItem()
					.title("Home")
					.id("home")
					.icon(HomeIcon)
					.child(
						S.document()
							.schemaType("home")
							.documentId("home")
					),
				S.documentTypeListItem("page"),
				S.divider(),
				S.divider(),
				S.documentTypeListItem("linkList"),
				S.divider(),
				S.listItem()
					.title("Settings")
					.id("settings")
					.icon(CogIcon)
					.child(
						S.document()
							.schemaType("settings")
							.documentId("settings")
					),
			]),
});