import './App.css'
import Playground from './Playground/Playground'
import UI from './UI/UI'
import DataStore from './Utils/DataStore'

export default function App() {
	let store = DataStore()

	const rerender = () => {
		for (let key of Object.keys(store)) {
			let [val, setVal] = store[key]
			setVal(val)
		}
	}

	return <>
		<Playground store={store} rerender={rerender} />
		<UI store={store} rerender={rerender} />
	</>
}
