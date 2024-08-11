<script>
import { dev } from "$app/environment";
import { enhance } from "$app/forms";
import { setContext } from "svelte";
import { writable } from "svelte/store";
import { Input } from "$lib/components/ui/input";
import { Label } from "$lib/components/ui/label";
import Tone from "$lib/components/modules/Tone.svelte";
import SuperDebug from "sveltekit-superforms";
// import { textToPhonemes } from "$lib/helpers/textToSound";

let toneObject = writable({
	text: "",
	phonemes: {},
	audio: {},
	visual: {}
});
let ctx = setContext("toneWrapper", toneObject);

</script>


<div class="container">
	<h3 class="py-4">{@html $toneObject.text ?? `&nbsp;`}</h3>

	<div>
		<!-- SIRI visualization -->
	</div>

	<div class="">
		<form method="POST" use:enhance={({ formElement, formData, action, cancel, submitter }) => {

			return async ({ result, update }) => {

				$toneObject.phonemes = result.data.phonemes;

				// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
			};
		}}>
			<Label for="tti">Enter some stuff</Label>
			<Input id="tti" type="text" name="text" bind:value={$toneObject.text} placeholder="Enter text to fart" />
		</form>
	</div>

	<Tone />

	{#if dev}
		<div>
			<SuperDebug data={ctx} />
		</div>
	{/if}
</div>