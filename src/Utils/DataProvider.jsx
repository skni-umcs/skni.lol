import React, { useState, useContext } from 'react'
import * as THREE from 'three'

const DataContext = React.createContext()

export const DataProvider = ({ children }) => {
	const [ui, setUi] = useState(true)
	const position = new THREE.Vector3(0, 0.5, 0)
	const [resetPosition, setResetPosition] = useState(() => {
		return () => {}
	})

	const store = {
		position,
		ui, setUi,
		resetPosition, setResetPosition,
	}

	return <DataContext.Provider value={store}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
