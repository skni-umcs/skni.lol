import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import * as THREE from "three"
import { useData } from "../../Utils/DataProvider"

export default function Clickable({ object, onHover, onClick }) {
	const three = useThree()
	const data = useData()
	const [value, setValue] = useState(false)
	const [hovered, setHovered] = useState(false)

	const isCloseEnough = () => {
		const cameraPosition = new THREE.Vector3()
		three.camera.getWorldPosition(cameraPosition)
		cameraPosition.y = 0

		const objectPosition = new THREE.Vector3()
		object.getWorldPosition(objectPosition)
		objectPosition.y = 0

		const distance = cameraPosition.distanceTo(objectPosition)
		return distance <= 2
	}

	useEffect(() => {
		const closeEnough = isCloseEnough()
		if (closeEnough && hovered && !data.hover) {
			data.setHover(true)
			if (onHover) onHover()
		}
		else if ((!closeEnough || !hovered) && data.hover) {
			data.setHover(false)
		}
	}, [hovered])

	const click = () => {
		if (!(data.hover && onClick)) return
		onClick(value)
		setValue(!value)
		object.rotation.z = (Math.PI - Math.PI * value)
	}

	return <primitive
		object={object}
		onClick={click}
		onPointerOver={() => {setHovered(true)}}
		onPointerOut={() => {setHovered(false)}} />
}
