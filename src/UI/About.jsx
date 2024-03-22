import { Button, ButtonGroup, Chip, Divider, Image, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import * as icons from "react-icons/lu"

export default function About({isOpen, onOpen, onOpenChange}) {
	return <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
		<ModalContent className='dark text-foreground bg-background'>

			{/* Header */}
			<ModalHeader className="flex flex-col gap-1">Informacje</ModalHeader>
			<Divider />

			{/* Content */}
			<ModalBody>
				<div className="flex items-center flex-col">
					<Image style={{paddingTop: 16, paddingBottom: 20}} src="/src/assets/icon.png"></Image>
					<Chip color='warning' variant='flat'><div className='font-bold'>{import.meta.env.VITEAPP_VERSION}</div></Chip>
				</div>
				<div>Nieoficjalny projekt strony internetowej 3D stworzony trochę z nudów, trochę dla jaj i trochę w ramach nauki.</div>
				<div>Zapraszamy i zachęcamy do dołączenia do koła!</div>
			</ModalBody>

			{/* Footer */}
			<ModalFooter>
				<ButtonGroup style={{paddingBottom: 16}}>
					<Button isExternal as={Link} href='https://github.com/skni-umcs/skni.lol/issues' variant='shadow' color='danger'><icons.LuBug/>Zgłoś błąd</Button>
					<Button isExternal as={Link} href='https://github.com/skni-umcs/skni.lol' variant='shadow' color='primary'><icons.LuCode2/>Kod źródłowy</Button>
					<Button isExternal as={Link} href='https://skni.umcs.pl' variant='shadow' color='secondary'><icons.LuGlobe/>Strona SKNI</Button>
				</ButtonGroup>
			</ModalFooter>

		</ModalContent>
	</Modal>
}
