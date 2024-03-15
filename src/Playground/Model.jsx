import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export default function Model({ store }) {
	const obj = useGLTF("skni.glb")
	const ref = useRef()

	// Shadows, later
	// for (let g of obj.scene.children) {
	// 	g.traverse(mesh => {
	// 		if (mesh.isMesh) {
	// 			mesh.castShadow = true
	// 			mesh.receiveShadow = true
	// 		}
	// 	})
	// }

	return <RigidBody ref={ref} type="fixed" colliders="trimesh" receiveShadow>
			<primitive object={obj.scene}></primitive>
		</RigidBody>
}

useGLTF.preload("skni.glb")
