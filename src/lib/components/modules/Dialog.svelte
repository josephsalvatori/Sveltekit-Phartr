<script>
import { Button, buttonVariants } from "$lib/components/ui/button/index";
import * as Dialog from "$lib/components/ui/dialog/index";

export let open = false;
</script>

<Dialog.Root bind:open={open}>
	<Dialog.Trigger class={buttonVariants({ variant: "secondary" })}>
		{#if $$slots.trigger}
			<slot name="trigger" />
		{:else}
			<span>Open</span>
		{/if}
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			{#if $$slots.title}
				<Dialog.Title>
					<slot name="title" />
				</Dialog.Title>
			{/if}
			{#if $$slots.description}
				<Dialog.Description>
					<slot name="description" />
				</Dialog.Description>
			{/if}
		</Dialog.Header>
		<slot />
		{#if $$slots.footer}
			<Dialog.Footer>
				<slot name="footer" />
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root>