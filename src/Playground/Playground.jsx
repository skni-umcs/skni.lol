import { KeyboardControls, PointerLockControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Autofocus, EffectComposer, Glitch, Noise, Pixelation, SMAA, ToneMapping } from "@react-three/postprocessing";
import Model from "./Model";
import BaseCharacter from "./BaseCharacter";
import { ACESFilmicToneMapping, CineonToneMapping, EquirectangularRefractionMapping, SRGBColorSpace } from "three";
import DataStore from "../Utils/DataStore";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";
import { BlendFunction } from 'postprocessing'

export default function Playground({store}) {
	const [useUI,] = store.ui
	const [useHighRes,] = store.highRes
	const [usePixelation,] = store.pixelation
	const [useSMAA,] = store.smaa

	return <KeyboardControls
		map={[
			{ name: 'forward', keys: ['w', 'W'] },
			{ name: 'backward', keys: ['s', 'S'] },
			{ name: 'left', keys: ['a', 'A'] },
			{ name: 'right', keys: ['d', 'D'] },
			{ name: 'jump', keys: ['Space'] },
		]}>
		<Canvas
			style={{opacity: 1 - useUI / 2, transition: "opacity 1.2s"}}
			camera={{fov: 60, far: 20}}
			dpr={[1, 4]}
			gl={{
				pixelRatio: 1 * (1 + {useHighRes}),
				outputColorSpace: SRGBColorSpace,
				antialias: true,
				toneMapping: ACESFilmicToneMapping
			}}>
			<Suspense fallback={null}>

				<ambientLight intensity={1.5} color={0xffffff}></ambientLight>

				<EffectComposer>
					{usePixelation && <Pixelation granularity={10} />}
					{useSMAA && <SMAA />}
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

				<Physics>
					<Model store={store} />
					<BaseCharacter />
				</Physics>

				<PointerLockControls selector="#play" />

			</Suspense>
		</Canvas>
	</KeyboardControls>
}