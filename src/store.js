// Libs
import {
	createStore, combineReducers,
} from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Reducers
import Heroes from './dataflow/modules/heroes-modules'

const reducers = combineReducers({
	heroes: Heroes,
});

const persistConfig = {
  key: 'root',
	storage,
};


export default function configureStore() {
	const persistedReducer = persistReducer(persistConfig, reducers);

	const store = createStore(
		persistedReducer, 
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	);

	return store;
}
