<script>
import { dev } from "$app/environment";
import { enhance } from "$app/forms";
import { setContext } from "svelte";
import { writable } from "svelte/store";
import { Input } from "$lib/components/ui/input";
import { Label } from "$lib/components/ui/label";
import Tone from "$lib/components/modules/Tone.svelte";
import SuperDebug from "sveltekit-superforms";
import { afterNavigate } from "$app/navigation";
// import { textToPhonemes } from "$lib/helpers/textToSound";

let toneObject = writable({
	text: "",
	phonemes: {},
	audio: {},
	visual: {}
});
let ctx = setContext("toneWrapper", toneObject);
let wordReady = false;

afterNavigate(() => {

})
</script>
<div class="container grid gap-4 py-8">
	<h2 class="font-bold text-5xl">
		{#if $toneObject.phonemes.length > 0}
			{#each $toneObject.phonemes as array}
				{#each array as object}
					<span>{@html (object?.phoneme !== "" ? object.phoneme : "&nbsp;")}</span>
				{/each}
			{/each}
		{:else}
			{@html $toneObject.text ?? `&nbsp;`}
		{/if}
	</h2>

	<div>
		<!-- SIRI visualization -->
	</div>

	<div class="">
		<form method="POST" use:enhance={({ formElement, formData, action, cancel, submitter }) => {

			wordReady = false;

			return async ({ result, update }) => {

				$toneObject.phonemes = result.data.phonemes;

				wordReady = true;

				update();
			};
		}}>
			<Label for="tti">Type something</Label>
			<Input id="tti" type="text" name="text" autofocus bind:value={$toneObject.text} placeholder="Enter text to fart" />

			<Tone ready={wordReady} />
		</form>
	</div>

	{#if dev}
		<div class="">
			<SuperDebug data={ctx} />
		</div>
	{/if}
</div>