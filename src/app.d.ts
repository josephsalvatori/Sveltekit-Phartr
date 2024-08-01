import type { LoaderLocals } from "@sanity/svelte-loader";
import type { User, Session } from "lucia";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals extends LoaderLocals {
			error: string;
			errorId: string;
			errorStackTrace: string;
			message: unknown;
			session: Session | null;
			startTimer: number;
			track: unknown;
			user: User | null;
			userId: string | null;
		}
		interface Error {
			code?: string;
			errorId?: string;
		}
		interface PageData {
			flash?: { type: "success" | "error"; message: string };
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};