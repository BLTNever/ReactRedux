import configureStore from "./store";
import DingDevTool from "@ali/ding-devtools";
const store = configureStore();
const url = window.location.protocol+"//"+window.location.hostname+":3000";

const {	Provider } = ReactRedux;

ReactDOM.render(
	<Provider store={store}>
			<DingDevTool url={url} type="debug" room="debug"/>
	</Provider>,
	document.getElementById('dingapp'));

