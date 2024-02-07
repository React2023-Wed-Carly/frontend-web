import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import {thunk} from 'redux-thunk';
import rootReducer from "./reducers";
import localforage from 'localforage';

const persistConfig = {
	key: 'root',
	storage: localforage, 
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	persistedReducer,
	composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };