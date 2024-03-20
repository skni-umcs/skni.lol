import { Slider } from "@nextui-org/react";

export default function SliderTile({title, val, setVal, arr, onChangeFunc}) {
	const f = (v) => {
		setVal(v)
		if (onChangeFunc) onChangeFunc(v)
	}

	return <>
		<Slider
			style={{
				marginBottom: 8
			}}
			label={title}
			step={1}
			size="lg"
			showSteps={true}
			maxValue={arr.length - 1}
			minValue={0}
			defaultValue={val}
			getValue={v => arr[v]}
			onChange={v => f(v)}
		/>
	</>
}