import React, { useState, useContext, useRef } from 'react'
import * as THREE from 'three'

const DataContext = React.createContext()

export const DataProvider = ({ children }) => {
	const [loadProgress, setLoadProgress] = useState(0)
	const [ui, setUi] = useState(true)
	const position = new THREE.Vector3(0, 0.5, 0)
	const [resetPosition, setResetPosition] = useState(() => {
		return () => {}
	})
	const [door, setDoor] = useState(true)
	const [resolution, setResolution] = useState(2)
	const resolutions = [0.5, 0.75, 1, 1.5, 2]
	const [time, setTime] = useState(0)
	const [shadows, setShadows] = useState(0)
	const [shadowsQuality, setShadowsQuality] = useState(1)
	const [distance, setDistance] = useState(3)
	const [gpuPower, setGpuPower] = useState(0)
	const camera = useRef()
	const cameraFars = [16, 48, 96, 192]

	const store = {
		loadProgress, setLoadProgress,
		position,
		ui, setUi,
		resetPosition, setResetPosition,
		door, setDoor,
		resolution, setResolution, resolutions,
		time, setTime,
		shadows, setShadows,
		shadowsQuality, setShadowsQuality,
		distance, setDistance,
		camera, cameraFars,
		gpuPower, setGpuPower
	}

	return <DataContext.Provider value={store}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
