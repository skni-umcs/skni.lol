import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'

import {useData} from '../Utils/DataProvider'


// Configuration?
const characterHeight = 1.8
const movingSpeed = 2.5


// Worker variables, do not touch
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()


export default function BaseCharacter() {
	const data = useData()
	const [,getKbd] = useKeyboardControls()
	const ref = useRef()
	const [firstRun, setFirstRun] = useState(true)
	let jumpLock = false

	useFrame((state) => {
		const { forward, backward, left, right, jump } = getKbd()
		if (!ref.current) return

		const velocity = ref.current.linvel()

		// Restart button
		if (firstRun) {
			setFirstRun(false)
			data.setResetPosition(() => {
				return () => ref.current.setTranslation(data.position)
			})
		}

		// Magic movement calculations
		frontVector.set(0, 0, backward - forward)
		sideVector.set(left - right, 0, 0)
		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.applyEuler(state.camera.rotation)

		// Apply movement
		ref.current.setLinvel({
			x: direction.x * movingSpeed,
			y: velocity.y,
			z: direction.z * movingSpeed
		})

		// Update camera
		let cameraTarget = ref.current.translation()
		cameraTarget.y += characterHeight / 2
		state.camera.position.lerp(cameraTarget, 0.2)

		// How does this even work?
		if (!jumpLock && jump) {
			ref.current.applyImpulse({ x: 0, y: 0.4, z: 0 }, true)
			jumpLock = true
			setTimeout(() => {jumpLock = false}, 700)
		}
	})

	return (
		<RigidBody
			ref={ref}
			mass={10}
			type='dynamic'
			canSleep={false}
			ccd={true}
			position={data.position}
			enabledRotations={[false, true, false]}>
			<mesh>
				<capsuleGeometry args={[0.1, characterHeight, 8, 16]} />
				<meshBasicMaterial opacity={0} transparent />
			</mesh>
		</RigidBody>
	)
}