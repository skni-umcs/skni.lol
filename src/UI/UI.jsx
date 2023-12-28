import DataStore from "../Utils/DataStore"
import "./css/main.css"
import skniLogo from "../assets/skni.svg"
import 'material-symbols'
import { useEffect } from "react"


export default function UI({store, rerender}) {
	const [useUI, setUI] = store.ui
	const [useHighRes, setHighRes] = store.highRes
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
				<div className="setting" data-enabled={useHighRes} onClick={e => setHighRes(!useHighRes)}>
					<span className="material-symbols-outlined">high_res</span>
					<div className="text">
						<div className="name">Wysoka rozdzielczość</div>
						<div className="desc">Poprawia ogólną jakość i ostrość, ale może mieć spory wpływ na wydajność</div>
					</div>
				</div>
				<div className="setting" data-enabled={usePixelation} onClick={e => setPixelation(!usePixelation)}>
					<span className="material-symbols-outlined">smart_toy</span>
					<div className="text">
						<div className="name">Pikselacja</div>
						<div className="desc">Konwertuje stronę na 8-bitowy styl retro xd</div>
					</div>
				</div>
				<div className="setting" data-enabled={useSMAA} onClick={e => setSMAA(!useSMAA)}>
					<span className="material-symbols-outlined">deblur</span>
					<div className="text">
						<div className="name">Użyj SMAA</div>
						<div className="desc">Wygładzanie krawędzi, może poprawić wydajność względem domyślnego MSAA</div>
					</div>
				</div>
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
