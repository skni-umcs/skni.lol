import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'

import {useData} from '../Utils/DataProvider'


// Configuration?
const characterHeight = 1.7
const crouchHeight = 1
const crouchMovementSpeed = 0.3
const movingSpeed = 2.5
const runSpeed = movingSpeed * 2.5


// Worker variables, do not touch
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()


export default function BaseCharacter() {
	const data = useData()
	const ref = useRef()
	const [,getKbd] = useKeyboardControls()
	const [crouchH, setCrouchH] = useState(0)
	let jumpLock = false

	useFrame((state) => {
		const { forward, backward, left, right, jump, run, crouch } = getKbd()
		if (!ref.current) return
		
		// Magic movement calculations
		frontVector.set(0, 0, backward - forward)
		sideVector.set(left - right, 0, 0)
		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.applyEuler(state.camera.rotation)
		
		// Apply movement
		const velocity = ref.current.linvel()
		const multiplier = crouch ? crouchMovementSpeed : 1
		ref.current.setLinvel({
			x: direction.x * (!run ? movingSpeed : runSpeed) * multiplier,
			y: velocity.y,
			z: direction.z * (!run ? movingSpeed : runSpeed) * multiplier
		})

		const cr = crouch * crouchHeight
		if (crouchH != cr) setCrouchH(cr)

		// Update camera
		let cameraTarget = ref.current.translation()
		cameraTarget.y += (characterHeight - cr) / 2
		state.camera.position.lerp(cameraTarget, 0.2)

		// How does this even work?
		if (!jumpLock && jump) {
			ref.current.applyImpulse({ x: 0, y: 0.64, z: 0 }, true)
			jumpLock = true
			setTimeout(() => {jumpLock = false}, 700)
		}
	})

	useEffect(() => {
		if (data.loadProgress < 100) return
		data.setResetPosition(() => {
			return () => {
				ref.current.setLinvel({x: 0, y: 0, z: 0})
				ref.current.setTranslation(data.position)
			}
		})
	}, [data.loadProgress])

	return (
		<RigidBody
			ref={ref}
			type="dynamic"
			canSleep={false}
			ccd={true}
			position={data.position}
			enabledRotations={[false, false, false]}>
			<mesh>
				<capsuleGeometry args={[0.16, characterHeight - crouchH, 12, 12]} />
				<meshBasicMaterial opacity={0} transparent />
			</mesh>
		</RigidBody>
	)
}