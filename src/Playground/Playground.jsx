import { KeyboardControls, PointerLockControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { SRGBColorSpace } from "three";
import { Physics } from "@react-three/rapier";
import { BlendFunction } from "postprocessing";

import Model from "./Model";
import BaseCharacter from "./BaseCharacter";
import { useData } from "../Utils/DataProvider";


export default function Playground() {
	const data = useData()
	const useUI = data.ui

	return <KeyboardControls
		map={[
			{ name: 'forward', keys: ['w', 'W'] },
			{ name: 'backward', keys: ['s', 'S'] },
			{ name: 'left', keys: ['a', 'A'] },
			{ name: 'right', keys: ['d', 'D'] },
			{ name: 'jump', keys: ['Space'] },
			{ name: 'run', keys: ['Shift'] },
		]}>
		<Canvas style={{
				position: "fixed",
				width: "100vw",
				height: "100vh",
				opacity: 1 - useUI / 2,
				transition: "opacity 1.2s"
			}}
			camera={{fov: 65, far: 1000}} dpr={[1, 2]} shadows
			gl={{
				outputColorSpace: SRGBColorSpace,
				antialias: true,
			}}>
			<ambientLight intensity={.05} color={0xffffff} />

			<EffectComposer>
				<ToneMapping
					blendFunction={BlendFunction.COLOR}
					adaptive={true}
					resolution={256}
					middleGrey={0.6}
					maxLuminance={32}
					averageLuminance={2}
					adaptationRate={1.0}
				/>
			</EffectComposer>

			<Physics gravity={[0, -20, 0]}>
				<Model />
				<BaseCharacter />
			</Physics>

			<PointerLockControls selector="#play" />

		</Canvas>
	</KeyboardControls>
}
