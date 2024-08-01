import React from "react";
import { Stack, Text, TextInput } from "@sanity/ui";
import { set, unset } from "sanity";

/** Timing to prevent over trigger of save */
const debounceTiming = 425;

/** Component that can contain a character count for maxLength */
export const stringComponent = (props) => {

	const { elementProps, onChange, value } = props;

	let timeout;
	let prevValue = (value || "").trim();

	const handleChange = React.useCallback((event) => {

		const nextValue = (event.currentTarget.value || "").trim();

		clearTimeout(timeout);

		timeout = setTimeout(() => {

			if(prevValue !== nextValue) onChange(nextValue ? set(nextValue) : unset());

		}, debounceTiming);

	}, [onChange]);

	return (
		<TextInput {...elementProps} onChange={handleChange} defaultValue={value} type={(props.schemaType?.custom?.type || "text")} value={undefined} />
	)
};

/** Component that can contain a character count for maxLength */
export const stringComponentWithCharacterCount = (props) => {

	const { elementProps, onChange, value } = props;

	let timeout;
	let prevValue = (value || "").trim();

	const handleChange = React.useCallback((event) => {

		const nextValue = (event.currentTarget.value || "").trim();

		clearTimeout(timeout);

		timeout = setTimeout(() => {

			if(prevValue !== nextValue) onChange(nextValue ? set(nextValue) : unset());

		}, debounceTiming);

	}, [onChange]);

	return (
		<Stack space={2}>
			<TextInput {...elementProps} onChange={handleChange} defaultValue={value} value={undefined} />
			<Text muted={true} size={0} style={{
				textAlign: "right"
			}}>{value?.length || 0} {(props.schemaType?.custom?.maxLength) ? ` / ${props.schemaType.custom.maxLength}` : ""} characters</Text>
		</Stack>
	)
};