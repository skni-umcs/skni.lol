import { Kbd, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

export default function KeyboardControls({controls}) {
	return <div className='flex'>
		<Table shadow='none'>
			<TableHeader>
				<TableColumn>Przycisk</TableColumn>
				<TableColumn>Działanie</TableColumn>
			</TableHeader>
			<TableBody>
				{controls.map((key) => {
					return <TableRow>
						<TableCell><Kbd keys={[key.specialKey]}>{key.key}</Kbd></TableCell>
						<TableCell>{key.desc}</TableCell>
					</TableRow>
				})}
			</TableBody>
		</Table>
	</div>
}
