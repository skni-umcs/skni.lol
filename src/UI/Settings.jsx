import { Accordion, AccordionItem, Progress } from "@nextui-org/react";
import Gameplay from "./Settings/Gameplay";
import Graphics from "./Settings/Graphics";
import { useData } from "../Utils/DataProvider";
import { useEffect, useState } from "react";

export default function Settings() {
	const data = useData()
	let gpuColor = "success"
	if (data.gpuPower >= 75) gpuColor = "danger"
	else if (data.gpuPower >= 55) gpuColor = "warning"

	useEffect(() => {
		let score = 0
		score += 24 * data.resolutions[data.resolution]
		score += data.cameraFars[data.distance] / 16
		score += Boolean(data.shadows) * 24 + data.shadows * 16
		score += data.shadows * data.shadowsQuality * 16
		data.setGpuPower(score)
	})

	return <div>
		<Progress
			label="Obciążenie"
			value={data.gpuPower}
			minValue={10}
			maxValue={100}
			color={gpuColor}
			className="max-w-md" />

		<Accordion style={{marginTop: 16}} variant="bordered">
			<AccordionItem title="Rozgrywka">
				<Gameplay />
			</AccordionItem>
			<AccordionItem title="Grafika">
				<Graphics />
			</AccordionItem>
		</Accordion>
	</div>

}