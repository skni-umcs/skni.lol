import { useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { Scene } from "three";

export default function Model({ store }) {
	const obj = useGLTF("skni.glb")
	const ref = useRef()

	const scene = new Scene()

	for (let g of obj.scene.children) {
		g.castShadow = true
		g.receiveShadow = true
		scene.add(g)
	}

	return <RigidBody ref={ref} type="fixed" colliders="trimesh">
			<primitive object={scene}></primitive>
		</RigidBody>
}

useGLTF.preload("skni.glb")
