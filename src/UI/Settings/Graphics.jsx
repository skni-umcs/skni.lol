import { useData } from "../../Utils/DataProvider";
import SliderTile from "./components/SliderTile";

export default function Graphics() {
	const data = useData()

	return <>
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
			title="Jakość cieni"
			val={data.shadowsQuality}
			setVal={data.setShadowsQuality}
			arr={["Niska", "Umiarkowana", "Wysoka", "Soft", "Ultra"]}
		/>
		<SliderTile
			title="Dystans widoku"
			val={data.distance}
			setVal={data.setDistance}
			onChangeFunc={(v) => {
				if (!data.camera.current) return
				console.log("Xd")
				data.camera.current.far = data.cameraFars[v]
				data.camera.current.updateProjectionMatrix()
			}}
			arr={["Bardzo krótki", "Krótki", "Umiarkowany", "Pełny"]}
		/>
	</>
}
