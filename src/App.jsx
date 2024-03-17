import './App.css'
import Playground from './Playground/Playground'
import UI from './UI/UI'
import { DataProvider } from './Utils/DataProvider'

export default function App() {
	return <DataProvider>
		<Playground />
		<UI />
	</DataProvider>
}
