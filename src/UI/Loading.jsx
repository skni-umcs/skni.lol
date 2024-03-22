import { Image, Progress } from "@nextui-org/react";
import { useData } from "../Utils/DataProvider";
import { useEffect, useState } from "react";

export default function Loading() {
	const data = useData()
	const [color, setColor] = useState("primary")
	const [colorT, setColorT] = useState("#48F")
	const [hide, setHide] = useState(false)

	useEffect(() => {
		if (data.loadProgress == 100) {
			setColor("success")
			setColorT("#0F8")
			setHide(true)
		}
	})

	return <div style={{
		position: "fixed",
		width: "100%",
		height: "100%",
		background: "#000",
		opacity: 1 - hide,
		transition: "opacity 1s 2s, visibility 3s",
		visibility: hide ? "hidden" : null,
		zIndex: 1000 }}>

		<div style={{
			transform: `translate(-50%, ${hide ? "-200vh" : "-50%"})`,
			width: 640,
			position: "absolute",
			left: "50%",
			height: "fit-content",
			transition: "all 1s 2s",
			top: "50%" }}>
			<div className="flex justify-around" style={{
				marginBottom: 128,
				animation: "pulse 3s infinite ease-in-out"
			}}>
				<Image src="/src/assets/icon.png" />
			</div>

			<div className="flex justify-between items-end m-2" style={{color: "#666"}}>
				<div>Ładowanie zasobów...</div>
				<div style={{fontSize: 24, color: colorT, fontWeight: "bold"}}>
					{Math.round(data.loadProgress)}%
				</div>
			</div>

			<Progress color={color} value={data.loadProgress} />

		</div>
	</div>
}