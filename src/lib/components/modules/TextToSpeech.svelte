<script>

let loading = true;
let voices = [];

speechSynthesis.addEventListener("voiceschanged", (ev) => {

	loading = false;

	voices = speechSynthesis.getVoices();
});

let text;
let voiceIndex = 0;

$: voice = voices[voiceIndex];

function speak(text) {

	let u = new SpeechSynthesisUtterance(text);

	u.voice = voice;

	window.speechSynthesis.speak(u);
}
</script>

{#if loading}
	<div>Please wait for voices to load</div>
{:else}
	<div>Available Voices:</div>
	<ul>
		{#each voices as v, i}
			<li>
				<label>
				<input type="radio" bind:group={voiceIndex} value={i}>
				{v.name} - {v.lang}
				</label>
			</li>
		{/each}
	</ul>
{/if}

<div class="">
	<input name="speech" bind:value={text} type="text" placeholder="Enter text to speak" />
	<button type="button" on:click={() => speak(text)}>Speak</button>
</div>