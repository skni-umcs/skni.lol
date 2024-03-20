import { Switch } from "@nextui-org/react";

export default function SwitchTile({title}) {
	return <>
		<div className="flex justify-between" style={{marginTop: 6, marginBottom: 12}}>
			<div>{title}</div>
			<Switch />
		</div>
	</>
}