
const API_ENPOINT = "//gateway.textripple/wallet/"
const DEFAULT_HEADERS = {
    'Content-Type' : 'text/plain'
}
const DEFAULT_REQUEST_OPTIONS = {
    method: 'POST',
    referrerPolicy: 'origin-when-cross-origin',
    redirect: 'follow',
    headers: new Headers(DEFAULT_HEADERS)
}

const customer = {
    get: () => {
        const token = localStorage.getItem('token')
        const cid   = localStorage.getItem('cid')
        const phn   = localStorage.getItem('phone')
        let body = {
            cid   : cid,
            token : token,
            phn   : phn,
            action: 'customer_info',
            permission: 'interests,loyalty_points'
        }
        var requestOptions = {
            ...DEFAULT_REQUEST_OPTIONS,
            headers: new Headers(DEFAULT_HEADERS),
            body   : JSON.stringify(body),
        }

        return fetch(API_ENPOINT, requestOptions)
    },
    set: (customer) => {
        const token = localStorage.getItem('token')
        const cid   = localStorage.getItem('cid')
        const phn   = localStorage.getItem('phone')
        let body = {
            cid   : cid,
            token : token,
            phn   : phn,
            action: 'update_customer_info',
            customer: customer
        }
        var requestOptions = {
            ...DEFAULT_REQUEST_OPTIONS,
            headers: new Headers(DEFAULT_HEADERS),
            body   : JSON.stringify(body),
        }

        return fetch(API_ENPOINT, requestOptions)
    },
    points: () => {
        const token = localStorage.getItem('token')
        const cid   = localStorage.getItem('cid')
        const phn   = localStorage.getItem('phone')

        let body = {
            cid   : cid,
            token : token,
            phn   : phn,
            action: 'customer_loyalty_points'
        }

        var requestOptions = {
            ...DEFAULT_REQUEST_OPTIONS,
            headers: new Headers(DEFAULT_HEADERS),
            body   : JSON.stringify(body),
        }

        return fetch(API_ENPOINT, requestOptions)
    },
    rewards: (location = "") => {
        const token = localStorage.getItem('token')
        const cid   = localStorage.getItem('cid')
        let body = {
            cid   : cid,
            token : token,
            phn   : 'guest',
            action: 'rewards'
        }

        if(location !== "")
            body.location = location

        var requestOptions = {
            ...DEFAULT_REQUEST_OPTIONS,
            headers: new Headers(DEFAULT_HEADERS),
            body   : JSON.stringify(body),
        }

        return fetch(API_ENPOINT, requestOptions)
    },
    interests: {
        set: (interest) => {
            const token = localStorage.getItem('token')
            const cid   = localStorage.getItem('cid')
            const phn   = localStorage.getItem('phone')
            let body = {
                cid   : cid,
                token : token,
                phn   : phn,
                action: 'add_customer_interest',
                interest: interest
            }
            var requestOptions = {
                ...DEFAULT_REQUEST_OPTIONS,
                headers: new Headers(DEFAULT_HEADERS),
                body   : JSON.stringify(body),
            } 

            return fetch(API_ENPOINT, requestOptions)
        },
        delete: (interest) => {
            const token = localStorage.getItem('token')
            const cid   = localStorage.getItem('cid')
            const phn   = localStorage.getItem('phone')
            let body = {
                cid   : cid,
                token : token,
                phn   : phn,
                action: 'remove_customer_interest',
                interest: interest
            }
            var requestOptions = {
                ...DEFAULT_REQUEST_OPTIONS,
                headers: new Headers(DEFAULT_HEADERS),
                body   : JSON.stringify(body),
            }

            return fetch(API_ENPOINT, requestOptions)
        }
    }
}

const app = {
    setup: () => {
        const token = localStorage.getItem('token')
        const cid = localStorage.getItem('cid')
        let body = {
            cid   : cid,
            token : token,
            phn   : 'guest',
            action: 'wallet_setup'
        }
        var requestOptions = {
            ...DEFAULT_REQUEST_OPTIONS,
            headers: new Headers(DEFAULT_HEADERS),
            body   : JSON.stringify(body),
        }

        return fetch(API_ENPOINT, requestOptions)
    },
    token: (cid = '') => {
        const savedCid = localStorage.getItem('cid')
        let body = {
            cid   : savedCid || cid,
            phn   : 'guest',
            action: 'get_token'
        }
        var requestOptions = {            
            ...DEFAULT_REQUEST_OPTIONS,
            headers: new Headers(DEFAULT_HEADERS),
            body   : JSON.stringify(body),
        }
        return fetch(API_ENPOINT, requestOptions)
    }
}

let wallet = {
    app,
    customer
}

export default wallet