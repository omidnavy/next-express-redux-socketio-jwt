const isServer = typeof window === 'undefined';

export const serverSideCookieSerilizer = (req) => {
    let temp = '';
    if (isServer && req && req.cookies) for (let i in req.cookies) temp += i + '=' + encodeURIComponent(req.cookies[i]) + '; ';
    return temp
};