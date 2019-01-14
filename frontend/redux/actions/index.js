import {actionTypes} from '../constants/action-types'
import {request} from './../constants/request'

export const getUserInfo = (id, serverSideCookie) => async dispatch => await request(actionTypes.GET_USER_INFO, {id}, dispatch, serverSideCookie);
export const login = (data) => dispatch => window.sendSocketMessage({request: actionTypes.AUTH_LOGIN, data});
