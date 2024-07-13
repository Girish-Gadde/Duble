// store.js

import { createStore } from "redux";
import reducer from "./Redux/Reducer";

const store = createStore(reducer);

export default store;
