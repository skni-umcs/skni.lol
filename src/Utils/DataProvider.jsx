import React, { useState, useContext, useRef } from 'react'
import * as THREE from 'three'

const DataContext = React.createContext()

export const DataProvider = ({ children }) => {
	const [ui, setUi] = useState(true)
	const position = new THREE.Vector3(0, 0.5, 0)
	const [resetPosition, setResetPosition] = useState(() => {
		return () => {}
	})
	const [door, setDoor] = useState(true)
	const [resolution, setResolution] = useState(2)
	const [time, setTime] = useState(0)
	const [shadows, setShadows] = useState(0)
	const [shadowsQuality, setShadowsQuality] = useState(1)
	const [distance, setDistance] = useState(3)
	const camera = useRef()
	const cameraFars = [10, 50, 100, 256]

	const store = {
		position,
		ui, setUi,
		resetPosition, setResetPosition,
		door, setDoor,
		resolution, setResolution,
		time, setTime,
		shadows, setShadows,
		shadowsQuality, setShadowsQuality,
		distance, setDistance,
		camera, cameraFars
	}

	return <DataContext.Provider value={store}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
