import Dataset from "$lib/config/cmu-dataset";

export const textToIPA = (text) => {

	let phoneticText = "";

	console.log(text);

	return phoneticText;
}

export const textToPhonemes = async (text, octave = 3) => {

	let phonemesText = "";
	let phonemes = [];
	let freqMultiplier = octaveRange[octave] ?? 8;

	// remove non-alphanumeric characters, keep spaces
	text = text.replace(/[^a-zA-Z ]/g, "");

	// split string at every non-letter character, and split on commas and periods
	// TODO: keep some punctuation, like commas and periods

	// split text into array of words
	let words = text.split(" ");

	// create phoneme object from word lookup
	words.forEach((word) => {

		let capital = word.toUpperCase();
		let findWord = Dataset.json.find((entry) => entry.word === capital);

		if(findWord) {

			findWord.phonemes.forEach((ph, k) => {

				if(!phonemeFrequenceReference[ph.phoneme]) console.log("---", ph.phoneme, " MISSING");

				let freq = phonemeFrequenceReference[ph.phoneme] ?? 0;
				
				findWord.phonemes[k].frequency = freq * freqMultiplier;
			});

			phonemes.push(findWord.phonemes);

			return;
		}

		// split every letter of the word into a phoneme matchup
		let letters = word.split("");
		let phonemeArray = [];

		letters.forEach((letter) => {

			phonemeArray.push(phonemeReference[letter]);
		});

		phonemes.push(phonemeArray);
	});

	return phonemes;
}

// const dictionary = await fetch("CMU.parsed.json");
// const dictionaryJson = await dictionary.json();
const frequencyGraph = [

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

const phonemeFrequenceReference = {
	"AA": 44,
	"AE": 44,
	"AH": 44,
	"AO": 44,
	"AW": 44,
	"AY": 44,
	"B": 44,
	"CH": 44,
	"DH": 44,
	"EH": 44,
	"EY": 44,
	"F": 44,
	"G": 44,
	"HH": 44,
	"IH": 44,
	"IY": 44,
	"JH": 44,
	"K": 44,
	"L": 44,
	"M": 44,
	"N": 44,
	"NG": 44,
	"OW": 44,
	"OY": 44,
	"P": 44,
	"Q": 44,
	"R": 44,
	"S": 44,
	"SH": 44,
	"T": 44,
	"TH": 44,
	"UH": 44,
	"UW": 44,
	"V": 44,
	"W": 44,
	"Y": 44,
	"Z": 44,
	"ZH": 44,
};