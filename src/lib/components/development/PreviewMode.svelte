<script>
import { isPreviewing } from "@sanity/svelte-loader";
</script>

{#if $isPreviewing}
	<div>PREVIEW ENABLED</div>
{/if}