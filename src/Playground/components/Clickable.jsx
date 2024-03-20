import { useFrame, useThree } from "@react-three/fiber"
import { useState } from "react"
import * as THREE from "three"

export default function Clickable({ object, onHover, onClick }) {
	const three = useThree()
	const [highlighted, setHighlighted] = useState(false)
	const [hovered, setHovered] = useState(false)
	const [colors, setColors] = useState({})

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

	useFrame(() => {
		const closeEnough = isCloseEnough()
		if (closeEnough && !highlighted && hovered) {
			setHighlighted(hovered)
			applyHighlight(hovered)
		} else if ((!closeEnough || !hovered) && highlighted) {
			setHighlighted(false)
			applyHighlight(false)
		}
	})

	const applyHighlight = (highlighted) => {
		if (highlighted && onHover) onHover()
		let i = 0
		for (let o of object.children) {
			let id = o.name + i
			if (highlighted) {
				let n = colors
				n[id] = o.material.clone().color
				setColors(n)
				const color = new THREE.Color()
				o.material.color.getHSL(color)
				color.l *= 1.5
				o.material.color = color
			}
			else o.material.color = colors[id].clone()
			i++
		}
	}

	const click = () => {
		if (highlighted && onClick) onClick()
	}

	return <primitive
		object={object}
		onClick={click}
		onPointerOver={() => {setHovered(true)}}
		onPointerOut={() => {setHovered(false)}} />
}
