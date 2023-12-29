import DataStore from "../Utils/DataStore"
import "./css/main.css"
import skniLogo from "../assets/skni.svg"
import 'material-symbols'
import { useEffect } from "react"
import Setting from "./components/Setting"


export default function UI({store, rerender}) {
	const [useUI, setUI] = store.ui
	const [useHighRes, setHighRes] = store.highRes
	const [useHighQuality, setHighQuality] = store.highQuality
	const [usePixelation, setPixelation] = store.pixelation
	const [useSMAA, setSMAA] = store.smaa

	useEffect(() => {
		const func = (e) => {
			if (!document.pointerLockElement) {
				setUI(true)
				document.exitPointerLock()
			}
		}
		document.addEventListener("pointerlockchange", func)
		return () => {
			document.removeEventListener("pointerlockchange", func)
		}
	}, [])

	useEffect(() => {
		rerender()
	})

	return <div id="setup" data-shown={useUI}>
		<div className="header">
			<img src={skniLogo}></img>
			<div>lol edition</div>
		</div>

		<div className="split">
			<div className="settings">
				<Setting
					icon="high_res"
					title="Wysoka rozdzielczość"
					description="Eliminuje niektóre glitche, ale ma spory wpływ na wydajność"
					data-enabled={useHighRes}
					onClick={e => setHighRes(!useHighRes)}
				/>
				<Setting
					icon="high_quality"
					title="Wysoka jakość"
					description="Używa cięższych tekstur. Eliminuje szum, wymaga więcej danych do pobrania"
					data-enabled={useHighQuality}
					onClick={e => setHighQuality(!useHighQuality)}
				/>
				<Setting
					icon="view_compact"
					title="Pikselacja"
					description="Robi 8-bitowy świat retro xdd"
					data-enabled={usePixelation}
					onClick={e => setPixelation(!usePixelation)}
				/>
				<Setting
					icon="deblur"
					title="Użyj SMAA"
					description="Lepsze wygładzanie krawędzi, poprawia nieco wygląd"
					data-enabled={useSMAA}
					onClick={e => setSMAA(!useSMAA)}
				/>
			</div>
			<div className="controls">
				<div className="keymap">
					<div><div className="key">W</div></div>
					<div><div className="key">S</div></div>
					<div><div className="key">A</div></div>
					<div><div className="key">D</div></div>
					<div><div className="key">SPACJA</div></div>
					<div><div className="key">ESC</div></div>
				</div>
				<div className="desc">
					<div>Idź naprzód</div>
					<div>Idź w tył</div>
					<div>Idź w lewo</div>
					<div>Idź w prawo</div>
					<div>Podskocz</div>
					<div>Otwórz to menu</div>
				</div>
			</div>
		</div>

		<div className="play">
			<div className="button" id="play" onClick={e => {setUI(false);e.target.innerText = "Powrót na stronę"}}>Otwórz stronę!</div>
		</div>
	</div>
}
