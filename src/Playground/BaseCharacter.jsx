import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'


// Configuration?
const characterHeight = 1.8
const movingSpeed = 2.5


// Worker variables, do not touch
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()


export default function BaseCharacter() {
	const ref = useRef()
	const [, get] = useKeyboardControls()

	useFrame((state) => {
		const { forward, backward, left, right, jump } = get()
		const velocity = ref.current.linvel()

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
		
		// update camera
		let cameraTarget = ref.current.translation()
		cameraTarget.y += characterHeight / 2
		state.camera.position.lerp(cameraTarget, 0.2)

		// How does this even work?
		const inAir = cameraTarget.y < characterHeight + 0.15
		if (inAir) ref.current.applyImpulse({ x: 0, y: !(!jump) / 2, z: 0 }, true)
	})


	return (
		<RigidBody
			ref={ref}
			mass={1}
			type='dynamic'
			canSleep={false}
			ccd={true}
			position={[2, characterHeight / 2, 0]}
			enabledRotations={[false, false, false]}>

			<mesh>
				<capsuleGeometry args={[0.25, characterHeight, 8, 16]} />
				<meshBasicMaterial opacity={0} transparent />
			</mesh>

		</RigidBody>
	)
}