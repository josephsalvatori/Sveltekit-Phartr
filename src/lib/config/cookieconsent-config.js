import * as CookieConsent from "vanilla-cookieconsent";

const config = {
	categories: {
		necessary: {
			enabled: true,
			readOnly: true
		},
		analytics: {
			enabled: true,
			autoClear: {
				cookies: [
					{
						name: /^_ga/ // regex: match all cookies starting with "_ga"
					},
					// {
					// 	name: /^_gat/ // regex: match all cookies starting with "_gat"
					// },
					{
						name: "_gid" // regex: match exact cookie named "_gid"
					}
				]
			},
			services: {
				ga: {
					label: "Google Analytics",
					onAccept: () => {
						console.log("Accept GA");
					},
					onReject: () => {
						console.log("Reject GA");
					}
				},
				another: {
					label: "Another Analytics Service",
					onAccept: () => {},
					onReject: () => {}
				}
			}
		},
		ads: {
			enabled: true,
		}
	},
	onFirstConsent: ({ cookie }) => {
		console.log("onFirstConsent fired", cookie);
	},
	onConsent: ({ cookie }) => {
		console.log("onConsent fired", cookie, CookieConsent.getUserPreferences());
	},
	onChange: ({ changedCategories, changedServices }) => {
		console.log("onChange fired", changedCategories, changedServices);
	},
	onModalReady: ({ modalName }) => {
		console.log("ready:", modalName);
	},
	onModalShow: ({ modalName }) => {
		console.log("visible:", modalName);
	},
	onModalHide: ({ modalName }) => {
		console.log("hidden:", modalName);
	},
	guiOptions: {
		consentModal: {
			layout: "box inline",
			position: "bottom left",
			equalWeightButtons: true,
			flipButtons: false
		},
		preferencesModal: {
			layout: "box",
			equalWeightButtons: true,
			flipButtons: false
		}
	},
	language: {
		default: "en",
		translations: {
			en: {
				consentModal: {
					title: "We use cookies",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
					acceptAllBtn: "Accept all",
					acceptNecessaryBtn: "Reject all",
					showPreferencesBtn: "Manage Individual preferences",
					// closeIconLabel: "Reject all and close modal",
					footer: `
							<a href="#path-to-impressum.html" target="_blank">Impressum</a>
							<a href="#path-to-privacy-policy.html" target="_blank">Privacy Policy</a>
					`
				},
				preferencesModal: {
					title: "Manage cookie preferences",
					acceptAllBtn: "Accept all",
					acceptNecessaryBtn: "Reject all",
					savePreferencesBtn: "Accept current selection",
					closeIconLabel: "Close modal",
					serviceCounterLabel: "Service|Services",
					sections: [
						{
							title: "Cookie usage",
							description: "We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose to opt-in or opt-out of each category at any time. For more details regarding cookies and other sensitive data, please read the full <a href=\"/privacy-policy\">privacy policy</a>."
						},
						{
							title: "Strictly Necessary",
							description:
								"These cookies are essential for the proper functioning of the website and cannot be disabled. Without these cookies, the website would not work properly.",

							//this field will generate a toggle linked to the "necessary" category
							linkedCategory: "necessary"
						},
						{
							title: "Performance and Analytics",
							description:
								"These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.",
							linkedCategory: "analytics",
							cookieTable: {
								caption: "Cookie table",
								headers: {
									name: "Cookie",
									service: "Service",
									desc: "Description",
									expire: "Expiration"
								},
								body: [
									{
										name: "_ga",
										service: "Google Analytics",
										desc: "Cookie set by <a href=\"https://policies.google.com/technologies/cookies?hl=en-US\">Google Analytics</a>",
										expire: "Expires after 2 years"
									},
									{
										name: "_gid",
										service: "Google Analytics",
										desc: "Cookie set by <a href=\"https://policies.google.com/technologies/cookies?hl=en-US\">Google Analytics</a>",
										expire: "Session"
									}
								]
							}
						},
						{
							title: "Targeting and Advertising",
							description:
								"These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.",
							linkedCategory: "targeting"
						},
						{
							title: "More information",
							description:
								`For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>`
						}
					]
				}
			}
		}
	}
};

export default config;