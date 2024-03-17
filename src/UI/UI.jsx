import { Button, ButtonGroup, Card, CardHeader, Chip, Divider, Image, Kbd, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import 'material-symbols'
import { useEffect } from "react"
import * as icons from "react-icons/lu"

import { useData } from '../Utils/DataProvider'


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
			<CardHeader className="flex gap-4">
				<Image height={48} width={48} src="/src/assets/icon.png" />
				<div className="flex flex-col">
					<p className="text-md">SKNI.lol</p>
					<p className="text-small text-default-500">Studenckie Koło Naukowe Informatyki, ale w nieoficjalnym wydaniu xd</p>
				</div>
			</CardHeader>
			<Divider />
			<div className='grid grid-cols-2' style={{padding: 16}}>
				<div className='flex'>
					<Table shadow='none'>
						<TableHeader>
							<TableColumn>Przycisk</TableColumn>
							<TableColumn>Działanie</TableColumn>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell><Kbd>W</Kbd></TableCell>
								<TableCell>Idź naprzód</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><Kbd>A</Kbd></TableCell>
								<TableCell>Idź w lewo</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><Kbd>S</Kbd></TableCell>
								<TableCell>Idź w tył</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><Kbd>D</Kbd></TableCell>
								<TableCell>Idź w prawo</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><Kbd keys={["space"]}></Kbd></TableCell>
								<TableCell>Podskocz</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
				<div>Ustawienia, na potem</div>
			</div>
			<Divider />
			<div className='flex justify-end gap-5' style={{padding: 16}}>
				<Button className='mr-auto' onPress={onOpen}>Informacje</Button>
				<Button onPress={data.resetPosition}>Restart</Button>
				<Button color='primary' id='play'>Graj</Button>
			</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
				<ModalContent className='dark text-foreground bg-background'>
					<ModalHeader className="flex flex-col gap-1">Informacje</ModalHeader>
					<Divider />
					<ModalBody>
						<div className="flex items-center flex-col">
							<Image style={{paddingTop: 16, paddingBottom: 20}} src="/src/assets/icon.png"></Image>
							<Chip color='warning' variant='flat'><div className='font-bold'>{import.meta.env.VITEAPP_VERSION}</div></Chip>
						</div>
						<div>Nieoficjalny projekt strony internetowej 3D stworzony trochę z nudów, trochę dla jaj i trochę w ramach nauki.</div>
						<div>Oczywiście, zapraszamy i zachęcamy do dołączenia!</div>
					</ModalBody>
					<ModalFooter>
						<ButtonGroup style={{paddingBottom: 16}}>
							<Button isExternal as={Link} href='https://github.com/skni-umcs/skni.lol/issues' variant='shadow' color='danger'><icons.LuBug/>Zgłoś błąd</Button>
							<Button isExternal as={Link} href='https://github.com/skni-umcs/skni.lol' variant='shadow' color='primary'><icons.LuCode2/>Kod źródłowy</Button>
							<Button isExternal as={Link} href='https://skni.umcs.pl' variant='shadow' color='secondary'><icons.LuGlobe/>Strona SKNI</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Card>
	</div>
}
