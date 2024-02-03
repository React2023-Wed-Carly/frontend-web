import logo from './logo.svg';
import MainPage from './Screens/MainPage';
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<MainPage />
			</div>
		</Provider>
	);
}

export default App;
