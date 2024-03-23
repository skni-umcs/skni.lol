import './App.css'
import Playground from './Playground/Playground'
import Crosshair from './UI/CrossHair'
import Loading from './UI/Loading'
import UI from './UI/UI'
import { DataProvider } from './Utils/DataProvider'

export default function App() {
	return <DataProvider>
		<Loading />
		<Crosshair />
		<Playground />
		<UI />
	</DataProvider>
}
