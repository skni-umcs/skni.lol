import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useEffect, useState } from "react"
import { useData } from "../Utils/DataProvider"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Group } from "three"
import Clickable from "./components/Clickable"
import Clock from "./components/Clock"
import PulsingLight from "./components/PulsingLight"

export default function Model() {
	const data = useData()
	const [scene, setScene] = useState(new Group())
	const [rigID, setRigID] = useState(0)
	const [stuff, setStuff] = useState([])
	const [lights, setLights] = useState({})

	// Fetch gltf
	const loadModel = () => {
		const loader = new GLTFLoader()
		loader.load("skni.glb", gltf => {
			configureModel(gltf.scene)
		}, (xhr) => {
			let value = 100 * xhr.loaded / xhr.total
			data.setLoadProgress(value.toFixed(2))
		})
	}

	// Configure scene
	const configureModel = (scene) => {
		let toremove = []
		let stuff = []
		let lights = {}
		let clock = {}

		scene.traverse(node => {
			let name = node.name.toLowerCase()
			node.castShadow = true
			node.receiveShadow = true

			if (name.startsWith("$")) {
				toremove.push(node)
			}

			else if (name.startsWith("#switch")) {
				toremove.push(node)
			}

			if (node.type.includes("Light")) {
				node.shadow.bias = -0.016
				node.shadow.camera.near = 0.001
				node.shadow.camera.far = 10
				node.castShadow = false
				if (name.includes("area")) node.distance = 64
				else node.distance = 8
				if (name.includes("light")) node.visible = name.includes("327")
				lights[name] = node
				if (name.includes("police")) {
					const sin = !stuff.length
					stuff.push(<PulsingLight light={node.clone()} sin={sin} />)
					toremove.push(node)
				}
			}

			if (node.material) {
				const materialName = node.material.name.toLowerCase()
				if (materialName.includes("window") ||
				materialName.includes("glassyellow")) {
					node.material.transparent = true
					node.material.metalness = 0.4
					node.material.roughness = 0
					node.material.opacity = 0.15 + materialName.includes("glassyellow") * 0.4
				}
			}

			if (name.startsWith("#clock")) {
				const type = name.replaceAll("#clock", "")
				if (type.length) {
					clock[type] = node.clone()
					toremove.push(node)
				}
			}
		})

		for (let node of toremove) {
			const name = node.name.toLowerCase()
			if (name.startsWith("$")) {
				stuff.push(
					<RigidBody key={node.uuid}>
						<primitive object={node.clone()} />
					</RigidBody>
				)
			}
			else if (name.startsWith("#switch")) {
				const sala = name.replaceAll("#switch", "").slice(0, 3)
				const target = `light${sala}`
				stuff.push(
					<Clickable key={node.uuid} object={node.clone()}
						onClick={() => {
							for (let n in lights) {
								if (n.startsWith(target)) {
									lights[n].visible = !lights[n].visible
									lights[n].rotation.z = (Math.PI - Math.PI * lights[n].visible)
								}
							}
						}}
					/>
				)
			}
			scene.remove(node)
		}

		stuff.push(<Clock key="live-clock" H={clock.h} M={clock.m} S={clock.s} />)

		setLights(lights)
		setScene(scene)
		setTimeout(() => {
			setStuff(stuff)
		}, 500)
	}

	useEffect(loadModel, [])
	useEffect(() => {
		setRigID(id => ++id)
		setTimeout(data.resetPosition, 1000)
	}, [scene])

	useEffect(() => {
		for (let name in lights) {
			let node = lights[name]
			node.castShadow = data.shadows > 0
			if (name.includes("area") || name.includes("police")) {
				node.castShadow = data.shadows === 2
			}
		}
	}, [data.shadows])

	return <>

		<RigidBody type="fixed" colliders="trimesh" key={rigID}>
			<primitive object={scene} />
		</RigidBody>

		{stuff.map(e => {
			return e
		})}

	</>
}

useGLTF.preload("skni.glb")