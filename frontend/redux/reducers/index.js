import {actionTypes} from '../constants/action-types'
import Cookies from 'js-cookie'



// REDUCERS
export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOGIN:
            Cookies.set('token', action.payload);
            return {...state, isAuthenticate: true}
        case actionTypes.GET_USER_INFO:
            return {...state, userInfo: action.payload};
        default:
            return state
    }
};