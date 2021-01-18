import {combineReducers} from "redux";

let user = (state={},action)=>{

    switch(action.type){
        case "login":{
              return {...action.payload}
        }
        case  "logout":{
            return null
        }
        default:{
            return state;
        }
    }
}


export default combineReducers({user})