<script>
import { dev } from "$app/environment";
import { getContext, onMount, setContext } from "svelte";
import Button from "$lib/components/ui/button/button.svelte";
import SuperDebug from "sveltekit-superforms";
import AudioKeys from "audiokeys";
import * as Tone from "tone";

let audioPlayer = {};
let keyboard = new AudioKeys({
	rows: 2
});
let sounds = {};

let wrapper = getContext("toneWrapper");
let i = 0;

/**
 * Events
 */
const playSequence = () => {

	audioPlayer.playSequence = new Tone.Sequence((time, note) => {

		audioPlayer.synth.triggerAttackRelease(note.frequency, "8n", time);

		++i;

		if(i === $wrapper.audio.sequence.length) {

			stopAll();

			i = 0;
		}

	}, $wrapper.audio.sequence);

	audioPlayer.playSequence.start(0);

	Tone.Transport.start();
};

const stopAll = () => {

	if(!Tone) return;

	Tone.Transport.stop();
	Tone.Transport.position = 0;
	Tone.Transport.cancel();
}

onMount(async() => {

	if(Tone) {

		Tone.Transport.bpm.value = 120;

		$wrapper.audio.sequence = [];

		audioPlayer.analysers = [];

		// $wrapper.audio.multiplayer = new Tone.Players(sounds).toDestination();
		audioPlayer.analyser = new Tone.Analyser();
		audioPlayer.recorder = new Tone.Recorder();
		audioPlayer.player = new Tone.Player().toDestination();
		audioPlayer.synth = new Tone.Synth().toDestination();
		audioPlayer.oscillator = new Tone.OmniOscillator({
			type: "pwm",
			width: 0.7
		});

		audioPlayer.oscillator.connect(Tone.Master);
		// audioPlayer.oscillator.start();

		audioPlayer.player.connect(audioPlayer.recorder);
		audioPlayer.player.connect(audioPlayer.analyser);

		audioPlayer.analysers.push(audioPlayer.analyser);

		keyboard.down((note) => {
			$wrapper.audio.sequence.push(note);
			$wrapper = $wrapper;
		});

		keyboard.up((note) => {

			console.log("up note", note);
		});
	}
});
</script>


{#if audioPlayer.player}
	TONE
	<div {...$$restProps}>
		<slot />
	</div>
	<Button on:click={playSequence}>Play Sequence</Button>
{/if}