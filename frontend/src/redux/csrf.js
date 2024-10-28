// frontend/src/redux/csrf.js
import Cookies from 'js-cookie';

export async function csrfFetch(url, options) {
    if (options) {
        options.method = options.method || 'GET';
        options.headers = options.headers || {};

        // !GET => "Content-Type" = application/json   
        // !GET => "Content-Type" = "XSRF-TOKEN" to "xsrf-token" cookie
        if (options.method.toUpperCase() !== 'GET') {
            if(options.headers["Content-Type"] === "multipart/form-data"){  
                delete options.headers["Content-Type"]; //"application/json" not good for file data
            }else {
                options.headers['Content-Type'] =
                options.headers['Content-Type'] || 'application/json';
            }
            options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
        }
    }
    const res = await window.fetch(url, options);
    if (res.status >= 400) throw res;
    return res;
}

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
