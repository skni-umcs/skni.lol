import { Button, Card, CardHeader, Divider, Image, useDisclosure } from '@nextui-org/react'
import 'material-symbols'
import { useEffect } from "react"

import { useData } from '../Utils/DataProvider'
import About from './About'
import KeyboardControls from './KeyboardControls'
import Settings from './Settings'


export default function UI() {
	const data = useData()
	const [useUI, setUI] = [data.ui, data.setUi]
	const {isOpen, onOpen, onOpenChange} = useDisclosure()

	useEffect(() => {
		const func = () => {
			setUI(!document.pointerLockElement)
			if (!document.pointerLockElement) {
				document.exitPointerLock()
			}
		}
		document.addEventListener("pointerlockchange", func)
		return () => {
			document.removeEventListener("pointerlockchange", func)
		}
	}, [])

	return <div id="main" style={{
			opacity: 1 * useUI,
			visibility: useUI ? "visible" : "hidden",
			transform: `translateY(${-256 * !useUI}px)`,
			transition: `opacity .5s, transform .5s, visibility .5s .${5 * !useUI}s`
		}}>
		<Card shadow>

			{/* Header */}
			<CardHeader className="flex gap-4">
				<Image height={48} width={48} src="/src/assets/icon.png" />
				<div className="flex flex-col">
					<p className="text-md">SKNI.lol</p>
					<p className="text-small text-default-500">Studenckie Koło Naukowe Informatyki, ale w nieoficjalnym wydaniu xd</p>
				</div>
			</CardHeader>
			<Divider />

			{/* Main contents box */}
			<div className='grid grid-cols-2' style={{padding: 16}}>

				<KeyboardControls controls={[
					{key: "W", desc: "Idź naprzód"},
					{key: "A", desc: "Idź w lewo"},
					{key: "S", desc: "Idź do tyłu"},
					{key: "D", desc: "Idź w prawo"},
					{specialKey: "shift", desc: "Biegnij"},
					{specialKey: "space", desc: "Podskocz"},
				]} />

				<Settings />

			</div>
			<Divider />

			{/* Actions */}
			<div className='flex justify-end gap-5' style={{padding: 16}}>
				<Button className='mr-auto' onPress={onOpen}>Informacje</Button>
				<Button onPress={data.resetPosition}>Restart</Button>
				<Button color='primary' id='play'>Graj</Button>
			</div>
			<About isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />

		</Card>
	</div>
}
