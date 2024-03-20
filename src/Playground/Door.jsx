import { RigidBody, useRevoluteJoint } from "@react-three/rapier"
import { useRef } from "react"

export default function Door({object}) {
	const hingePos = object.position.z
	const bodyA = useRef()
	const bodyB = useRef()
	const joint = useRevoluteJoint(bodyA, bodyB, [
		[0, 0, 0],
		[0, 0, 0],
		[0, 1, 0]
	  ])

	return <group>
		<RigidBody ref={bodyA}>
			<primitive object={object} />
		</RigidBody>,
		<RigidBody ref={bodyB}>
			<mesh />
		</RigidBody>
	</group>
}