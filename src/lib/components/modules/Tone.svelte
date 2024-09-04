<script>
import { dev } from "$app/environment";
import { getContext, onMount, setContext } from "svelte";
import Button from "$lib/components/ui/button/button.svelte";
import SuperDebug from "sveltekit-superforms";
// import AudioKeys from "audiokeys";
import SiriWave from "siriwave";
import * as Tone from "tone";

export let ready = false;

let audioPlayer = {};
// let keyboard = new AudioKeys({
// 	rows: 2
// });

/** @type {import("tone").Sampler} */
audioPlayer.sampler = undefined;

/** @type {import("tone").Buffers} */
audioPlayer.buffers = undefined;

let wrapper = getContext("toneWrapper");
let i = 0;

/** @type {import("tone").Transport} */
let TRANSPORT;
let CANVAS;
let ANIMATIONFRAME;

/**
 * Sounds
 */
const sounds = {
	// C
	"C1": "1004edited.wav",
	"C2": "1004edited.wav",
	"C3": "1004edited.wav",
	"C4": "1004edited.wav",
	"C5": "1004edited.wav",
	"C6": "1004edited.wav",
	// C#
	"C#1": "1006edited.wav",
	"C#2": "1006edited.wav",
	"C#3": "1006edited.wav",
	"C#4": "1006edited.wav",
	"C#5": "1006edited.wav",
	"C#6": "1006edited.wav",
	// Db

	// D
	"D1": "1007edited.wav",
	"D2": "1007edited.wav",
	"D3": "1007edited.wav",
	"D4": "1007edited.wav",
	"D5": "1007edited.wav",
	"D6": "1007edited.wav",
	// D#
	"D#1": "1012edited.wav",
	"D#2": "1012edited.wav",
	"D#3": "1012edited.wav",
	"D#4": "1012edited.wav",
	"D#5": "1012edited.wav",
	"D#6": "1012edited.wav",
	// Eb

	// E
	"E1": "1015edited.wav",
	"E2": "1015edited.wav",
	"E3": "1015edited.wav",
	"E4": "1015edited.wav",
	"E5": "1015edited.wav",
	"E6": "1015edited.wav",
	// F
	"F1": "1017edited.wav",
	"F2": "1017edited.wav",
	"F3": "1017edited.wav",
	"F4": "1017edited.wav",
	"F5": "1017edited.wav",
	"F6": "1017edited.wav",
	// F#
	"F#1": "1019edited.wav",
	"F#2": "1019edited.wav",
	"F#3": "1019edited.wav",
	"F#4": "1019edited.wav",
	"F#5": "1019edited.wav",
	"F#6": "1019edited.wav",
	// Gb

	// G
	"G1": "1020edited.wav",
	"G2": "1020edited.wav",
	"G3": "1020edited.wav",
	"G4": "1020edited.wav",
	"G5": "1020edited.wav",
	"G6": "1020edited.wav",
	// G#
	"G#1": "1023edited.wav",
	"G#2": "1023edited.wav",
	"G#3": "1023edited.wav",
	"G#4": "1023edited.wav",
	"G#5": "1023edited.wav",
	"G#6": "1023edited.wav",
	// Ab

	// A
	"A1": "1029edited.wav",
	"A2": "1029edited.wav",
	"A3": "1029edited.wav",
	"A4": "1029edited.wav",
	"A5": "1029edited.wav",
	"A6": "1029edited.wav",
	// A#
	"A#1": "1033edited.wav",
	"A#2": "1033edited.wav",
	"A#3": "1033edited.wav",
	"A#4": "1033edited.wav",
	"A#5": "1033edited.wav",
	"A#6": "1033edited.wav",
	// Bb

	// B
	"B1": "1040edited.wav",
	"B2": "1040edited.wav",
	"B3": "1040edited.wav",
	"B4": "1040edited.wav",
	"B5": "1040edited.wav",
	"B6": "1040edited.wav",
};

/**
 * Events
 */
const generateSequence = () => {

	$wrapper.audio.sequence = phonemesToSequence($wrapper.phonemes);

	let count = $wrapper.audio.sequence.reduce((acc, word) => {
		return acc + word.length;
	}, 0);

	// audioPlayer.playSequence = new Tone.Sequence((time, note) => {

	// 	console.log("note", {...note, time});

	// 	let buffer = audioPlayer.buffers.get(note.note);

	// 	console.log("buffer duration", buffer?.duration);

	// 	audioPlayer.sampler.fadeIn = 0.1;
	// 	audioPlayer.sampler.fadeOut = 0.1;
	// 	audioPlayer.sampler.triggerAttackRelease(note.note, (buffer?.duration || note.duration), time, note.stress);

	// 	++i;

	// 	if(i === count) {

	// 		stopAll();

	// 		i = 0;
	// 	}

	// }, $wrapper.audio.sequence, 1);


	let sampleLength = 0;

	$wrapper.audio.sequence.forEach((word, i) => {

		if(i > 0) {
			// we add a delay between words
			sampleLength += 0.2;
		}

		let lastDuration = 0;

		word.forEach((note) => {

			let buffer = audioPlayer.buffers.get(note.note);

			TRANSPORT.scheduleOnce(time => {

				let PLAYER = new Tone.Player(buffer);

				let duration = buffer.duration;
				let stress = note.stress;

				if(stress !== 0 && duration > 0.2) {

					console.log("PITCH SHIFT", stress * 12, duration)

					let PITCH = new Tone.PitchShift(stress * 12);

					PLAYER.connect(PITCH);
				}

				// PLAYER.fadeIn = 0.1;
				PLAYER.fadeOut = (duration < 0.2) ? duration * 0.2 : 0.2;

				if(PLAYER.fadeOut < 0.05) {
					PLAYER.fadeOut = 0.05;
				}

				// PLAYER.volume.value = 7.5 * stress;
				PLAYER.start(time - (lastDuration / 2), 0, duration);

				lastDuration = PLAYER.fadeOut;

				// PLAYER.connect(TRANSPORT.analyzer.waveform);
				// PLAYER.connect(TRANSPORT.analyzer.meter);
				PLAYER.toDestination();

				Tone.Draw.schedule(() => {

					console.log("DRAW", time, note.note)

				}, time);

			}, sampleLength);

			if(buffer) {
				sampleLength += buffer.duration;
			}
		});
	});

	TRANSPORT.scheduleOnce(time => {

		TRANSPORT.stop(time);
		TRANSPORT.position = 0;
		TRANSPORT.cancel();

		TRANSPORT.visualizer.setAmplitude(0);

		cancelAnimationFrame(ANIMATIONFRAME);
		cancelIdleCallback(taskHandle);

		ready = false;

	}, sampleLength);
};

const stopAll = () => {

	if(!Tone) return;

	Tone.Transport.stop();
	Tone.Transport.position = 0;
	Tone.Transport.cancel();
}

function phonemesToSequence(phonemes) {

	let sequence = [];

	phonemes.forEach((word) => {

		let wordSequence = [];
		let len = word.length;

		word.forEach((phoneme) => {

			if(phoneme.frequency === 0 || phoneme.frequency === null) {

				wordSequence = null;

				return;
			}

			let stress = phoneme.stress;
			let frequency = phoneme.frequency;
			let note = Tone.Frequency(phoneme.frequency).toNote();

			if(note !== "") {
				wordSequence.push({ note, frequency, stress });
			}
		});

		sequence.push(wordSequence);
	});

	return sequence;
}

// animation
const approxVisualizationUpdateFrequency = 5;
const sampleRate = 44100;
const fftSize = 2 ** Math.floor(Math.log2(sampleRate / approxVisualizationUpdateFrequency));

let taskHandle = 0;

const updateAnimation = (idleDeadline) => {

	taskHandle = requestIdleCallback(updateAnimation, { timeout: 1000 / approxVisualizationUpdateFrequency });

	if(!Tone) return;

	let waveform = TRANSPORT.analyzer.waveform.getValue();
	// let wavefromByteArray = new Uint8Array(waveform.buffer);
	let signal = TRANSPORT.analyzer.meter.getValue();
	let fft = TRANSPORT.analyzer.fft.getValue();
	// let spectrum = new Uint8Array(fft.buffer);
	let maxFreq = Math.max(...fft);
	let minFreq = Math.min(...fft);

	let spec = Math.abs((signal / 20) * 10);
	// let spec = (signal / 20) * 10;
	let amplitude = 10 ^ (signal / 20);
	// let amplitude = signal * 1.41414;
	// let frequency = waveform.reduce((acc, val) => acc + val, 0) / waveform.length;
	let frequency = (maxFreq + minFreq) / 2;
	let maxPowerFreq = (maxFreq * (sampleRate / 2 / fftSize)) / 10e+3;
	// let chkAmp = wavefromByteArray.reduce((acc, y) => Math.max(acc, y), 128) - 128;
	// let amplitude = chkAmp / 128 * 10;

	// console.log("waveform", wavefromByteArray);
	// console.log("signal", signal);
	// console.log("fft", fft);
	// console.log("dB", signal, "amplitude", amplitude, "frequency", frequency, "hz", maxPowerFreq, "spec", spec);

	TRANSPORT.visualizer.setAmplitude(amplitude);
	// TRANSPORT.visualizer.setSpeed(maxSpecFreq / 10e+3);
	// TRANSPORT.visualizer.setFrequency(frequency);

	// ANIMATIONFRAME = requestAnimationFrame(updateAnimation);
}

let interval;

// const updateAnim = function(idleDeadline) {

// 	taskHandle = requestIdleCallback(updateAnim, { timeout: 1000 / approxVisualizationUpdateFrequency });

// 	const waveform = TRANSPORT.analyzer.waveform.getValue();
// 	const dBASpectrum = TRANSPORT.analyzer.fft.getValue();

// 	const totaldBAPower = dBASpectrum.reduce((acc, y) => acc + y);
// 	const highestPowerBin = dBASpectrum.reduce(([maxPower, iMax], y, idx) => y > maxPower ? [y, idx] : [maxPower, iMax], [-120, 0])[1];
// 	const maxPowerFreq = highestPowerBin * (sampleRate / 2 / fftSize);
// 	const amplitude = waveform.reduce((acc, y) => Math.max(acc, y), 128) - 128;

// 	TRANSPORT.visualizer.setSpeed(maxPowerFreq / 10e+3);
// 	TRANSPORT.visualizer.setAmplitude(amplitude / 128 * 10);

// 	console.log("totaldBAPower", totaldBAPower, "highestPowerBin", highestPowerBin, "maxPowerFreq", maxPowerFreq, "amplitude", (amplitude / 128 * 10));
// }

onMount(async () => {

	if(Tone) {

		Tone.Master.volume.value = 0;

		clearInterval(interval);

		if(!TRANSPORT) {

			console.log("first run");

			TRANSPORT = Tone.getTransport();

			TRANSPORT.on("start", () => {
				console.log("Transport started");
			});

			TRANSPORT.on("stop", () => {
				console.log("Transport stopped");
			});

			TRANSPORT.on("draw", () => {
				console.log("Transport DRAW");
			});

			TRANSPORT.bpm.value = 120;

			// /** @type {import("tone").an}*/
			TRANSPORT.analyzer = {
				/** @type {import("tone").Waveform} */
				waveform: new Tone.Waveform(fftSize),
				/** @type {import("tone").Meter} */
				meter: new Tone.Meter(),
				/** @type {import("tone").FFT} */
				fft: new Tone.Analyser("fft", fftSize)
			};

			Tone.Master.connect(TRANSPORT.analyzer.waveform);
			Tone.Master.connect(TRANSPORT.analyzer.meter);
			Tone.Master.connect(TRANSPORT.analyzer.fft);

			TRANSPORT.visualizer = new SiriWave({
				container: CANVAS,
				cover: true,
				height: 300,
				amplitude: 0.1,
				speed: 0.15,
				style: "ios9"
			});

			TRANSPORT.visualizer.setAmplitude(0);
		}

		$wrapper.audio.sequence = [];

		audioPlayer.sampler = new Tone.Sampler({
			urls: sounds,
			baseUrl: "samples/",
			// volume: 10
		}).toDestination();

		// audioPlayer.sampler.sync();

		audioPlayer.buffers = new Tone.Buffers(sounds, {
			baseUrl: "samples/"
		});

		console.log("sampler", audioPlayer.sampler);
		console.log("buffers", audioPlayer.buffers);

		// interval = setInterval(updateAnimation, 1000);
	}

	return () => {

		clearInterval(interval);

		// if(ANIMATIONFRAME) {
		// 	cancelAnimationFrame(ANIMATIONFRAME);
		// }
	}
});

$: if(ready === true) {

	TRANSPORT.cancel();
	TRANSPORT.position = "0:0:0";

	generateSequence();

	TRANSPORT.visualizer.start();
	TRANSPORT.start();

	taskHandle = requestIdleCallback(updateAnimation, { timeout: 1000 / approxVisualizationUpdateFrequency });
}
</script>

{#if Tone.context}
	TONE
	<div {...$$restProps}>
		<slot />
	</div>
	<Button type="submit">Play Sequence</Button>
	<div class="w-full h-[300px] bg-blue-300" bind:this={CANVAS}></div>
{/if}