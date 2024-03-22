import { useData } from "../Utils/DataProvider"
import * as icons from "react-icons/lu"

export default function Crosshair() {
	const data = useData()

	return <div id="crosshair" className={data.hover && "hover"}>
		<icons.LuMouse />
	</div>
}