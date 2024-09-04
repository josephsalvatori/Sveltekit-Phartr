// import Dataset from "$lib/config/cmu-dataset";
import client from "$lib/server/database/client";

export const textToIPA = (text) => {

	let phoneticText = "";

	console.log(text);

	return phoneticText;
}

export const textToPhonemes = async (text, octave = 5) => {

	let phonemesText = "";
	let phonemes = [];
	let freqMultiplier = octaveRange[octave] ?? 8;
	let freqLow = octaveFrequencyRanges[octave].lowFreq;
	let freqHigh = octaveFrequencyRanges[octave].highFreq;
	let freqStep = (freqHigh - freqLow) / 44;

	console.log(freqLow, freqHigh, freqStep);

	// remove non-alphanumeric characters, keep spaces
	text = text.replace(/[^a-zA-Z ]/g, "");

	// split string at every non-letter character, and split on commas and periods
	// TODO: keep some punctuation, like commas and periods

	// split text into array of words
	let words = text.toUpperCase().split(" ");
	let queryResults;

	try {

		queryResults = await client`SELECT * FROM cmu_phonemes WHERE word IN ${client(words)}`;

	} catch(e) {

		console.error(e);

		return { success: false, error: "Database error", message: e.message };
	}

	// create phoneme object from word lookup
	words.forEach(async (word, i) => {

		// if(i > 0) phonemes.push([{ phoneme: " ", frequency: 0 }]);

		let capital = word.toUpperCase();
		let findWord = queryResults.find((entry) => entry.word === capital);

		if(findWord) {

			findWord.phonemes.forEach((ph, k) => {

				if(!phonemeFrequencyReference[ph.phoneme]) console.log("---", ph.phoneme, " MISSING");

				let freq = phonemeFrequencyReference[ph.phoneme] ?? 0;

				findWord.phonemes[k].frequency = freqLow + (freq * freqStep);
			});

			phonemes.push(findWord.phonemes);

			return;
		}

		// split every letter of the word into a phoneme matchup
		let letters = word.split("");
		let phonemeArray = [];

		letters.forEach((letter) => {

			let letterPhoneme = phonemeReference[letter];

			if(!phonemeFrequencyReference[letterPhoneme.phoneme]) console.log("---", letterPhoneme.phoneme, " MISSING");

			let letterFreq = phonemeFrequencyReference[letterPhoneme.phoneme] ?? null;

			letterPhoneme.frequency = freqLow + (letterFreq * freqStep);

			phonemeArray.push(letterPhoneme);
		});

		phonemes.push(phonemeArray);
	});

	return phonemes;
}

// const dictionary = await fetch("CMU.parsed.json");
// const dictionaryJson = await dictionary.json();
// mezzo soprano frequncy range: 220 - 880 Hz
// A3 = 220 hz
// A4 = 440 hz

const octaveFrequencyRanges = [
	// bass
	{
		lowKey: "E2",
		highKey: "E4",
		lowFreq: 82.41,
		highFreq: 329.63
	},
	// baritone
	{
		lowKey: "A2",
		highKey: "A4",
		lowFreq: 110.00,
		highFreq: 440.00
	},
	// tenor
	{
		lowKey: "C3",
		highKey: "C5",
		lowFreq: 130.81,
		highFreq: 523.25
	},
	// countertenor
	{
		lowKey: "E3",
		highKey: "E5",
		lowFreq: 164.81,
		highFreq: 659.26
	},
	// contralto
	{
		lowKey: "F3",
		highKey: "E5",
		lowFreq: 174.61,
		highFreq: 659.26
	},
	// mezzo soprano
	{
		lowKey: "A3",
		highKey: "A5",
		lowFreq: 220.00,
		highFreq: 880.00
	},
	// soprano
	{
		lowKey: "C4",
		highKey: "C6",
		lowFreq: 261.63,
		highFreq: 1046.50
	},
	// coloratura
	{
		lowKey: "D4",
		highKey: "D6",
		lowFreq: 293.66,
		highFreq: 1174.66
	},
];

const octaveRange = [
	1,
	2,
	4,
	8,
	16,
	32,
	64,
];

const phonemeReference = {
	a: { phoneme: "AA", stress: 0 },
	A: { phoneme: "AH", stress: 0 },
	b: { phoneme: "B", stress: 0 },
	B: { phoneme: "B", stress: 0 },
	c: { phoneme: "AO", stress: 0 },
	C: { phoneme: "CH", stress: 0 },
	d: { phoneme: "D", stress: 0 },
	D: { phoneme: "D", stress: 0 },
	e: { phoneme: "EH", stress: 0 },
	E: { phoneme: "EH", stress: 0 },
	f: { phoneme: "F", stress: 0 },
	F: { phoneme: "F", stress: 0 },
	g: { phoneme: "G", stress: 0 },
	G: { phoneme: "G", stress: 0 },
	h: { phoneme: "HH", stress: 0 },
	H: { phoneme: "HH", stress: 0 },
	i: { phoneme: "IH", stress: 0 },
	I: { phoneme: "EY", stress: 0 },
	j: { phoneme: "JH", stress: 0 },
	J: { phoneme: "JH", stress: 0 },
	k: { phoneme: "K", stress: 0 },
	K: { phoneme: "K", stress: 0 },
	l: { phoneme: "L", stress: 0 },
	L: { phoneme: "L", stress: 0 },
	m: { phoneme: "M", stress: 0 },
	M: { phoneme: "M", stress: 0 },
	n: { phoneme: "N", stress: 0 },
	N: { phoneme: "NG", stress: 0 },
	o: { phoneme: "OW", stress: 0 },
	O: { phoneme: "OW", stress: 0 },
	p: { phoneme: "P", stress: 0 },
	P: { phoneme: "P", stress: 0 },
	q: { phoneme: "Q", stress: 0 },
	Q: { phoneme: "Q", stress: 0 },
	r: { phoneme: "R", stress: 0 },
	R: { phoneme: "R", stress: 0 },
	s: { phoneme: "S", stress: 0 },
	S: { phoneme: "SH", stress: 0 },
	t: { phoneme: "T", stress: 0 },
	T: { phoneme: "TH", stress: 0 },
	u: { phoneme: "UH", stress: 0 },
	U: { phoneme: "UW", stress: 0 },
	v: { phoneme: "V", stress: 0 },
	V: { phoneme: "V", stress: 0 },
	w: { phoneme: "W", stress: 0 },
	W: { phoneme: "W", stress: 0 },
	x: { phoneme: "AX", stress: 0 },
	X: { phoneme: "AX", stress: 0 },
	y: { phoneme: "Y", stress: 0 },
	Y: { phoneme: "Y", stress: 0 },
	z: { phoneme: "Z", stress: 0 },
	Z: { phoneme: "ZH", stress: 0 }
};

const phonemeFrequencyReference = {
	"AA": 44,
	"AE": 43,
	"AH": 42,
	"AO": 41,
	"AW": 40,
	"AY": 39,
	"B": 38,
	"CH": 37,
	"D": 36,
	"DH": 35,

	"EH": 34,
	"EY": 33,
	"F": 32,
	"G": 31,
	"HH": 30,
	"IH": 29, // i:
	"IY": 28, // d3
	"JH": 27,
	"K": 26,
	"L": 25,

	"M": 24,
	"N": 23,
	"NG": 22,
	"OW": 21,
	"OY": 20,
	"P": 19,
	"Q": 18,
	"R": 17,
	"S": 16,
	"SH": 15,

	"T": 14,
	"TH": 13,
	"UH": 12,
	"UW": 11,
	"V": 10, // v
	"W": 9,
	"Y": 8,
	"Z": 7, // z
	"ZH": 6,
};