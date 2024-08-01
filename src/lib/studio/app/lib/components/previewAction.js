import { EyeOpenIcon } from "@sanity/icons";
import { useRouter } from "sanity/router";

const getRouteByType = (type, slug) => {

	if(!slug || slug === "home") {
		return "";
	}

	if(type === "page") {

		return `${slug}`;
	}

	return "";
};

export function previewAction(props) {

	if(!props.draft) return null;

	let previewUrl = `/studio/presentation/${props.type}/${props.id}?preview=/${getRouteByType(props.type, props?.draft?.slug?.current)}`;

	const router = useRouter();

	return {
		label: "Preview",
		icon: EyeOpenIcon,
		// shortcut: "Ctrl+Alt+",
		onHandle: () => {
			router.navigateUrl({
				path: previewUrl
			});
		}
	}
};