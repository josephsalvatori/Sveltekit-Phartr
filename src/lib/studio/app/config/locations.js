import { map } from "rxjs";

export const locate = (params, context) => {

	// types will need to be added as they are created
	if(params.type === "page") {

		const page$ = context.documentStore.listenQuery(`*[_id == $id || references($id)]{_id,_type,slug,title}`, params, { perspective: "previewDrafts" });

		return page$.pipe(map((docs) => {

			if(!docs) {

				return {
					message: "Unable to map document type to locations",
					tone: "critical"
				};
			}

			const docIncludes = docs.filter(({ _id, slug }) => (_id !== params.id)).map(({ _type, title, slug }) => {
				return {
					title: title || "Untitled",
					href: `/${slug.current}/`
				};
			});

			return {
				locations: docIncludes
			};
		}));
	}

	return null;
};