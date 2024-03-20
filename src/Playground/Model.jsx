import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useEffect, useState } from "react"

export default function Model() {
	const obj = useGLTF("skni.glb")
	const [customElements, setCustomElements] = useState([])

	let light = {}
	let door = {}
	let screen = {}

	// Filter scene
	obj.scene.traverse((e) => {
		let name = e.name.toLowerCase()
		e.castShadow = true
		e.receiveShadow = true
		if (name.startsWith("#door")) door[name] = e
		if (e.type == "PointLight") {
			e.shadow.bias = -0.0005
			light[name] = e
			if (name.includes("lantern")) e.castShadow = false
		}
		if (name.startsWith("#screen")) screen[name] = e
		if (e.material && e.material.name.toLowerCase().includes("window")) {
			e.material.transparent = true
			e.material.metalness = 0.5
			e.material.roughness = 0
			e.material.opacity = 0.1
		}
	})

	// Handle door
	for (let name in door) {
		const e = door[name].clone()
		setCustomElements(customElementsNow => [...customElementsNow,
			<RigidBody>
				<primitive object={e} />
			</RigidBody>
		])
		obj.scene.remove(door[name])
	}

	return <>
		<RigidBody type="fixed" colliders="trimesh">
			<primitive object={obj.scene} />
		</RigidBody>
		{customElements.map(a => { return a })}
	</>
}

useGLTF.preload("skni.glb")
