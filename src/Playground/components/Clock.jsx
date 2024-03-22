import { useEffect, useState } from "react"

export default function Clock({H, M, S}) {
	const [hh, sethh] = useState(0)
	const [mm, setmm] = useState(0)
	const [ss, setss] = useState(0)

	const clock = () => {
		const date = new Date()
		sethh(date.getHours())
		setmm(date.getMinutes())
		setss(date.getSeconds())
	}

	useEffect(() => {setInterval(clock, 500)}, [])

	const getAngle = (fill) => {
		let angle = (1 - fill) * Math.PI * 2
		return angle
	}

	useEffect(() => {
		const r = getAngle((hh + mm / 60) % 12 / 12)
		H.rotation.z = r
	}, [hh])

	useEffect(() => {
		const r = getAngle(mm / 60)
		M.rotation.z = r
	}, [mm])

	useEffect(() => {
		const r = getAngle(ss / 60)
		S.rotation.z = r
	}, [ss])

	return <>
		<primitive object={H} />
		<primitive object={M} />
		<primitive object={S} />
	</>
}