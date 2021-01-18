
import {configureStore} from "@reduxjs/toolkit"
import reducer from "./reducer";
let root_reducer = reducer;
let store = configureStore({reducer:root_reducer})
export default store;