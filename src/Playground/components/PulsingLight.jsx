import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function PulsingLight({light, sin}) {
	const lightRef = useRef(light)

	useFrame(({ clock }) => {
		let intensity = 0
		let t = clock.getElapsedTime() * 3
		if (sin) intensity = Math.sin(t) * 5
		else intensity = Math.cos(t) * 5
		lightRef.current.intensity = Math.abs(intensity) + 1
	})

	return <pointLight
				ref={lightRef}
				position={light.position}
				color={light.color}
			/>
}
