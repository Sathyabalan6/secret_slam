// src/context/reducer.js
import {
    SET_SLAMBOOKS,
    SET_MY_SLAMBOOKS,
    SET_LOADING,
    SET_SINGLE_SB,
    SET_CURRENT_USER,
    SET_IS_LOGGEDIN,
    SET_SINGLE_MY_SB
} from "./action.types";

//TODO: DONE use switch case

export default (state, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, currentUser: action.payload }
        case SET_SLAMBOOKS:
            return action.payload == null ? { ...state, slambooks: [] }
                : { ...state, slambooks: action.payload }
        case SET_LOADING:
            return { ...state, isLoading: action.payload }
        case SET_SINGLE_SB:
            return {
                ...state,
                slambook: action.payload
            }
        case SET_SINGLE_MY_SB:
            return {
                ...state,
                my_slambook: action.payload
            }
        case SET_IS_LOGGEDIN:
            return { ...state, isLoggedIn: action.payload }
        case SET_MY_SLAMBOOKS:
            return action.payload == null ? { ...state, my_slambooks: [] }
                : { ...state, my_slambooks: action.payload }
        default:
            return state
    }
}
