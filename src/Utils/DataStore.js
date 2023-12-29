import { useState } from "react"

export default function DataStore() {
	return {
		ui: useState(true),
		highRes: useState(false),
		highQuality: useState(false),
		pixelation: useState(false),
		smaa: useState(true),
	}
}
