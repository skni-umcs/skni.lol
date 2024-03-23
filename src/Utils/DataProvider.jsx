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
	const [showScene, setShowScene] = useState(true)
	const [resolution, setResolution] = useState(2)
	const resolutions = [0.25, 0.5, 1, 2, 4]
	const [shadows, setShadows] = useState(0)
	const [distance, setDistance] = useState(3)
	const [gpuPower, setGpuPower] = useState(0)
	const [hover, setHover] = useState(false)
	const camera = useRef()
	const cameraFars = [16, 48, 80, 192]

	const store = {
		loadProgress, setLoadProgress,
		position,
		ui, setUi,
		resetPosition, setResetPosition,
		resolution, setResolution, resolutions,
		showScene, setShowScene,
		shadows, setShadows,
		distance, setDistance,
		hover, setHover,
		camera, cameraFars,
		gpuPower, setGpuPower
	}

	return <DataContext.Provider value={store}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
