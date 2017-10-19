
import rootReducer from "../src/reducers";
import {requestMiddleware, responseMiddleware, dingReduxDevTool} from "@ali/ding-devtools";
var buildStore = null;
const thunk = ReduxThunk.default;
const {
	createStore,
	applyMiddleware,
	compose
} = Redux;

buildStore = compose(
  applyMiddleware(thunk,responseMiddleware),
  dingReduxDevTool
)(createStore);


export default function configureStore(initialState){
	const store = buildStore(rootReducer, initialState);
	return store;
}