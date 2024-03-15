import { useState } from "react"

export default function DataStore() {
	return {
		ui: useState(true)
	}
}
