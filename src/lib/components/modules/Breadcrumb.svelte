<script>
import { page } from "$app/stores";
import * as Breadcrumb from "$lib/components/ui/breadcrumb";
import SuperDebug from "sveltekit-superforms";

export let path = $page.url.pathname || "";

$: paths = path.split("/").filter(Boolean);
</script>

<div class="px-4 md:px-8 py-6">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			{#each paths as item, key}
				{#if key > 0}
					<Breadcrumb.Separator />
				{/if}
				{#if key === paths.length - 1}
					<Breadcrumb.Page>
						{item}
					</Breadcrumb.Page>
				{:else}
					<Breadcrumb.Item>
						<Breadcrumb.Link href={`/${paths.slice(0, key + 1).join("/").toLowerCase()}`}>
							{item}
						</Breadcrumb.Link>
					</Breadcrumb.Item>
				{/if}
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
</div>