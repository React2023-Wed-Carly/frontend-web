import MainPage from './Screens/MainPage';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from "./redux/store";
import { Provider } from "react-redux";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
			<div className="App">
				<MainPage />
			</div>
			</PersistGate>
		</Provider>
	);
}

export default App;
