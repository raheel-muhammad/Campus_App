import { applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}
export const store = configureStore({
  reducer: persistedReducer,

});


// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }