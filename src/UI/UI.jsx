import { Accordion, AccordionItem, Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Kbd, Link, Popover, PopoverContent, PopoverTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import 'material-symbols'
import { useEffect } from "react"

export default function UI({store, rerender}) {
	const [useUI, setUI] = store.ui

	useEffect(() => {
		const func = (e) => {
			if (!document.pointerLockElement) {
				setUI(true)
				document.exitPointerLock()
			}
		}
		document.addEventListener("pointerlockchange", func)
		return () => {
			document.removeEventListener("pointerlockchange", func)
		}
	}, [])

	useEffect(() => {
		rerender()
	})

	return <div id="main">
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
				<div>
					<Table>
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
								<TableCell>Idź w tył</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
				<div>Ustawienia, na potem</div>
			</div>
			<Divider />
			<div className='flex justify-end gap-5' style={{padding: 16}}>
				<Button className='mr-auto'>Informacje</Button>
				<Button>Restart</Button>
				<Button color='primary'>Graj</Button>
			</div>
		</Card>
	</div>
}
