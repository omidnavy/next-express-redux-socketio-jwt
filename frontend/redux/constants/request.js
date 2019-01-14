// import {actionTypes} from "./action-types";
import isomorphicFetch from 'isomorphic-unfetch'
import {api} from '../../../app';
import {actionTypes} from "./action-types";

const {parseMessage} = require('../../../server/core/ws/parseMessage');
export const request = async (request, data, dispatch, serverSideCookie) => {
    // if (typeof window !== 'undefined' && window.sendSocketMessage) window.sendSocketMessage({request, data});
    // else await fetch(request, data, dispatch, serverSideCookie)
    try {
        window.sendSocketMessage({request, data});
    } catch (e) {
        await fetch(request, data, dispatch, serverSideCookie)
    }
};


export const fetch = async (request, data, dispatch, serverSideCookie) => {
    const {method, component, endpoint} = parseMessage({request});
    let url = `${api}/${component.toLowerCase()}/${endpoint}`;
    if (data.id) url += `/${data.id}`;
    let options = {
        method: method,
        headers: {'Content-Type': 'application/json'}
    };

    if (serverSideCookie) options.headers.Cookie = serverSideCookie;
    if (method !== 'get') options.body = JSON.stringify({data});
    let res = await isomorphicFetch(url, options);

    if (res.status !== 200) return console.log(res.statusText);
    let response = await res.json();
    dispatch({
        type: actionTypes[request],
        payload: response
    });

};