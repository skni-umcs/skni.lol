import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export default function Model() {
	const obj = useGLTF("skni.glb")
	const ref = useRef()

	return <RigidBody ref={ref} type="fixed" colliders="trimesh" receiveShadow>
			<primitive object={obj.scene}></primitive>
		</RigidBody>
}

useGLTF.preload("skni.glb")
