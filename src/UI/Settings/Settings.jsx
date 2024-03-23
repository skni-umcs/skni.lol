import { Progress } from "@nextui-org/react"
import { useData } from "../../Utils/DataProvider"
import { useEffect } from "react"
import SliderTile from "./components/SliderTile"

export default function Settings() {
	const data = useData()
	let gpuColor = "success"
	if (data.gpuPower >= 75) gpuColor = "danger"
	else if (data.gpuPower >= 55) gpuColor = "warning"

	useEffect(() => {
		let score = 0
		score += 24 * data.resolutions[data.resolution]
		score += data.cameraFars[data.distance] / 16
		score += Boolean(data.shadows) * 32 + data.shadows * 16
		data.setGpuPower(score)
	})

	return <div>
		<Progress
			label="Obciążenie"
			value={data.gpuPower}
			minValue={10}
			maxValue={100}
			color={gpuColor}
			style={{marginBottom: 24}}
			className="max-w-md" />

		<SliderTile
			title="Rozdzielczość"
			val={data.resolution}
			setVal={data.setResolution}
			arr={["Bardzo niska", "Niska", "Standardowa", "Wysoka", "Ultra"]}
		/>
		<SliderTile
			title="Cienie"
			val={data.shadows}
			setVal={data.setShadows}
			arr={["Wyłączone", "Tylko wewnątrz", "Wszystkie"]}
		/>
		<SliderTile
			title="Dystans widoku"
			val={data.distance}
			setVal={data.setDistance}
			onChangeFunc={(v) => {
				if (!data.camera.current) return
				data.camera.current.far = data.cameraFars[v]
				data.camera.current.updateProjectionMatrix()
			}}
			arr={["Bardzo krótki", "Krótki", "Umiarkowany", "Pełny"]}
		/>
	</div>

}