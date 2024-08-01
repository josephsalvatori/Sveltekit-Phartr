<script>
import * as Card from "$lib/components/ui/card/index";
</script>

<Card.Root>
	<Card.Header>
		{#if $$slots.title}
			<Card.Title><slot name="title" /></Card.Title>
		{/if}
		{#if $$slots.description}
			<Card.Description><slot name="description" /></Card.Description>
		{/if}
	</Card.Header>
	<Card.Content>
		<slot />
	</Card.Content>
	{#if $$slots.footer}
		<Card.Footer>
			<slot name="footer" />
		</Card.Footer>
	{/if}
</Card.Root>
