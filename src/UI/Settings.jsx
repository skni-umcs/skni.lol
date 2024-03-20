import { Accordion, AccordionItem } from "@nextui-org/react";
import Gameplay from "./Settings/Gameplay";
import Graphics from "./Settings/Graphics";

export default function Settings() {
	
	return  <Accordion>
		<AccordionItem title="Rozgrywka">
			<Gameplay />
		</AccordionItem>
		<AccordionItem title="Grafika">
			<Graphics />
		</AccordionItem>
	</Accordion>
}