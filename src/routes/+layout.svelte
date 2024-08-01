<script>
import { dev } from "$app/environment";
import { page } from "$app/stores";
import { onMount } from "svelte";
import { enableVisualEditing } from "@sanity/visual-editing";
import { useLiveMode } from "@sanity/svelte-loader";
import { ModeWatcher } from "mode-watcher";
import { getFlash } from "sveltekit-flash-message";
import { toast } from "svelte-sonner";
import { Toaster } from "$lib/components/ui/sonner";
import { client } from "$lib/studio/sanity";
import TailwindIndicator from "$lib/components/development/TailwindIndicator.svelte";

/** @type {import('./$types').LayoutData} */
// export let data;

let flash = getFlash(page);

$: if ($flash) {

	switch($flash.type) {

		case "success":

			toast.success($flash.message);

			break;
		case "error":

			toast.error($flash.message);

			break;

		default:

			toast.info($flash.message);

			break;
	}

	$flash = undefined;
}

// onMount(() => enableVisualEditing());
onMount(() => useLiveMode({
	client: client.withConfig({ stega: true }),
}));
</script>

<style lang="postcss" global>
@import "../app.pcss";
</style>

<ModeWatcher />
<Toaster richColors position="bottom-center" />

<slot />

{#if dev}
	<TailwindIndicator />
{/if}