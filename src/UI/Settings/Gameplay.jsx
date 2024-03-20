import SliderTile from "./components/SliderTile";
import SwitchTile from "./components/SwitchTile";

export default function Gameplay() {
	return <>
		<SwitchTile title="Drzwi" />
		<SliderTile
			title="Czas"
			defaultValue={0}
			arr={["Rzeczywisty", "Dzień", "Noc"]}
		/>
	</>
}