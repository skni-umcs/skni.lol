import { KeyboardControls, PerspectiveCamera, PointerLockControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { EffectComposer, ToneMapping } from "@react-three/postprocessing"
import { SRGBColorSpace } from "three"
import { Physics } from "@react-three/rapier"
import { BlendFunction } from "postprocessing"

import Model from "./Model"
import BaseCharacter from "./BaseCharacter"
import { useData } from "../Utils/DataProvider"


export default function Playground() {
	const data = useData()
	const useUI = data.ui

	return <>{data.showScene && <KeyboardControls
		map={[
			{ name: 'forward', keys: ['KeyW'] },
			{ name: 'backward', keys: ['KeyS'] },
			{ name: 'left', keys: ['KeyA'] },
			{ name: 'right', keys: ['KeyD'] },
			{ name: 'jump', keys: ['Space'] },
			{ name: 'run', keys: ['Shift'] },
			{ name: 'crouch', keys: ['KeyC'] },
		]}>
		<Canvas style={{
				position: "fixed",
				width: "100vw",
				height: "100vh",
				opacity: 1 - useUI / 2,
				transition: "opacity 1.2s"
			}}
			dpr={[data.resolutions[data.resolution], data.resolutions[data.resolution]]}
			shadows
			gl={{
				outputColorSpace: SRGBColorSpace,
				antialias: true,
			}}>
			<PerspectiveCamera
				ref={data.camera}
				makeDefault
				fov={60}
				far={data.cameraFars[data.distance]} />

			<ambientLight intensity={.025} color={0xffffff} />

			<EffectComposer>
				<ToneMapping
					blendFunction={BlendFunction.COLOR}
					adaptive={true}
					resolution={512}
					middleGrey={0.5}
					maxLuminance={32}
					averageLuminance={4}
					adaptationRate={1}
				/>
			</EffectComposer>

			<Physics gravity={[0, -10, 0]}>
				<Model />
				<BaseCharacter />
			</Physics>

			<PointerLockControls selector="#play" />

		</Canvas>
	</KeyboardControls>}</>
}
