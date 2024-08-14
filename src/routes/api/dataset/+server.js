import { error, json } from "@sveltejs/kit";
import client from "$lib/server/database/client";
import Dataset from "$lib/config/cmu-dataset";

export async function GET({ url }) {

	let datasetLength = Dataset.json.length;

	let newSet = Dataset.json.filter((e) => !e.word.includes("("));
	let newLength = newSet.length;
	let startKey = 71; // start after useless punctuation records.
	// let newLength = 3;

	// console.log(client);

	let query = "";

	// let queryData = newSet.flatMap((v, i, a) => {

	// 	// console.log(v, i, a);
	// 	if(i < startKey) return [];

	// 	let word = v.word;
	// 	let phonemes = JSON.stringify(v.phonemes);
	// 	let syllables = JSON.stringify(v.syllables);

	// 	// console.log(word, phonemes, syllables);

	// 	return [`INSERT INTO cmu_phonemes (id, word, phonemes, syllables) VALUES (${i}, ${word}, ${phonemes}, ${syllables})`];

	// }, [])

	// console.log("queryData", queryData);

	try {

		const insert = await client.begin(async sql => newSet.flatMap((v, i, a) => {

			// console.log(v, i, a);
			if(i < startKey) return [];

			let word = v.word;
			let phonemes = JSON.stringify(v.phonemes);
			let syllables = JSON.stringify(v.syllables);

			// console.log(word, phonemes, syllables);

			return [sql`INSERT INTO cmu_phonemes (id, word, phonemes, syllables) VALUES (${i}, ${word}, ${phonemes}, ${syllables})`];

		}, [])).then((data) => {

			console.log("~~ Data Success", data);

		}).catch(() => {

			console.log("~~ ROLLBACK was called");
		});

	} catch(e) {
		console.error("ERROR", e);
	}

	const result = await client.commit();


	console.log("PROMISE", result);

	// const insert = await client.begin(async sql => {

	// 	let inserted = [];

	// 	for(let i = startKey; i < newLength; i++) {

	// 		// send to sql tables
	// 		// newSet[i].word = newSet[i].word.toLowerCase();
	// 		inserted[i] = await sql`INSERT INTO cmu_phonemes (id, word, phonemes, syllables) VALUES (${i}, ${newSet[i].word}, ${JSON.stringify(newSet[i].phonemes)}, ${JSON.stringify(newSet[i].syllables)})`;
	// 	}

	// 	return inserted;
	// });

	return json({
		oldLength: Dataset.json.length,
		newLength: newLength,
		success: true
	});
}