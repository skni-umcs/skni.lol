import { Kbd, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

export default function KeyboardControls({controls}) {
	return <div className='flex'>
		<Table shadow='none'>
			<TableHeader>
				<TableColumn>Przycisk</TableColumn>
				<TableColumn>Działanie</TableColumn>
			</TableHeader>
			<TableBody>
				{controls.map((key, i) => {
					const desc = key.desc
					let specialKey = []
					let btn = ""
					if (key.key.length > 1) specialKey = key.key
					else btn = key.key
					return <TableRow key={i}>
						<TableCell><Kbd keys={specialKey}>{btn}</Kbd></TableCell>
						<TableCell>{desc}</TableCell>
					</TableRow>
				})}
			</TableBody>
		</Table>
	</div>
}
