import { useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { EquirectangularReflectionMapping, MeshBasicMaterial, MeshStandardMaterial, NearestFilter, RepeatWrapping, SRGBColorSpace, Scene } from "three";

export default function Model() {
	const obj = useGLTF("skni.glb")
	const ref = useRef()
	const { gl } = useThree()
	const maxAnisotropy = gl.capabilities.getMaxAnisotropy()
	gl.outputColorSpace = SRGBColorSpace

	const [tBuilding, tFurniture, tElectronics, tStuff] = useTexture([
		"textures/building.jpg",
		"textures/furniture.jpg",
		"textures/electronics.jpg",
		"textures/stuff.jpg",
	])

	const scene = new Scene()

	for (let g of obj.scene.children) {
		let texture;

		if (g.name == "Building") texture = tBuilding
		else if (g.name == "Furniture") texture = tFurniture
		else if (g.name == "Electronics") texture = tElectronics
		else if (g.name == "Stuff") texture = tStuff

		if (texture) {
			texture.flipY = false
			texture.minFilter = NearestFilter
			texture.wrapS = RepeatWrapping
			texture.wrapT = RepeatWrapping
			texture.magFilter = NearestFilter
			texture.mapping = EquirectangularReflectionMapping
			texture.anisotropy = maxAnisotropy
			texture.colorSpace = SRGBColorSpace

			const bakedTexture = new MeshBasicMaterial({map: texture})
			g.traverse(e => {
				if (e.isMesh) {
					e.material = bakedTexture
				}
			})
		}
		scene.children.push(g)
	}

	return <Suspense fallback={null}>
		<RigidBody ref={ref} type="fixed" colliders="trimesh">
			<primitive object={scene}></primitive>
		</RigidBody>
	</Suspense>
}

useGLTF.preload("skni.glb")
