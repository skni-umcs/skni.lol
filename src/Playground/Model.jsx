import { useGLTF, useProgress } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useEffect, useState } from "react"
import { useData } from "../Utils/DataProvider"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group, Scene } from "three";

export default function Model() {
	const data = useData()
	const [scene, setScene] = useState(new Group)
	const [rigID, setRigID] = useState(0)
	const [customElements, setCustomElements] = useState({
		door: {},
		light: {},
		screen: {},
		window: {},
	})
	
	const loadModel = () => {
		// Brute force loading this fucking model
		const loader = new GLTFLoader()
		loader.load("skni.glb", gltf => {
			console.log(gltf)
			setScene(gltf.scene.clone())
		}, (xhr) => {
			let value = 100 * xhr.loaded / xhr.total
			data.setLoadProgress(value.toFixed(2))
		})
	}

	const configureModel = () => { try {
		scene.traverse((node) => {
			let name = node.name.toLowerCase();
			node.castShadow = true;
			node.receiveShadow = true;
			
			if (name.startsWith("#door")) {
				// setCustomElements((prevElements) => ({
				// 	...prevElements,
				// 	door: { ...prevElements.door, [name]: node.clone() },
				// }));
				scene.remove(node);
			}
			
			if (node.type === "PointLight") {
				node.castShadow = true;
				node.receiveShadow = true;
				node.shadow.bias = -0.0005;
				if (name.includes("lantern")) {
					node.castShadow = data.shadow === 2;
				}
				setCustomElements((prevElements) => ({
					...prevElements,
					light: { ...prevElements.light, [name]: node },
				}));
			}
			
			if (name.startsWith("#screen")) {
				setCustomElements((prevElements) => ({
					...prevElements,
					screen: { ...prevElements.screen, [name]: node },
				}));
			}
			
			if (node.material && node.material.name.toLowerCase().includes("window")) {
				node.material.transparent = true;
				node.material.metalness = 0.5;
				node.material.roughness = 0;
				node.material.opacity = 0.1;
				setCustomElements((prevElements) => ({
					...prevElements,
					window: { ...prevElements.window, [name]: node },
				}));
			}
		})
		setRigID(id => ++id)
		data.resetPosition()
	} catch (e) {
		console.warn(e)
		setTimeout(configureModel, 500)
	}}

	useEffect(loadModel, [])

	useEffect(() => {
		configureModel()
	}, [scene])

	return <RigidBody type="fixed" colliders="trimesh" key={rigID}>
		<primitive object={scene} />
	</RigidBody>
}

useGLTF.preload("skni.glb")