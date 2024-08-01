import { previewAction } from "../lib/components/previewAction";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["home","settings"]);

const document = {
	actions: (input, context) => {

		let appliedInputs = [...input, previewAction];

		if(singletonTypes.has(context.schemaType)) {

			appliedInputs.filter(({ action }) => action && singletonActions.has(action));
		}

		return appliedInputs;
	}
};

export default document;