import {createStore, applyMiddleware, combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'reducer',
    storage: storage,
    whitelist: ['reducer'] // or blacklist to exclude specific reducers
 };
const presistedReducer = persistReducer(persistConfig, combineReducers({}));
const store = createStore(presistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);
export { persistor, store };