<script>
import { SuperDebug } from "svelte-superforms";
import { dev } from "$app/environment";

let {
	title = "Debug",
	object = {},
	open = false
} = $props();
</script>

{#if dev}
	<details open={open}>
		<summary>{title}</summary>
		<SuperDebug data={object} />
	</details>
{/if}

<style>
details {
	border-bottom: 1px solid currentColor;
	border-top: 1px solid currentColor;
}

summary {
	padding: 15px;
}

pre {
	font-size: 0.85rem;
	font-family: monospace;
	overflow-wrap: break-word;
	padding-bottom: 15px;
	white-space: pre-wrap;
}
</style>