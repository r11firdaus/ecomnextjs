// import { ParamsAPI } from '../type'
const domain = 'https://jwallin.vercel.app'
// const domain = 'http://localhost:3000'
const apiKey = 'apirezajwallin'

export const getReq = (path: string, id: string|number, token: string, sort?: string) => {
    let newsort = !sort ? '' : `+sort${sort.trim()}`
    return new Promise ((resolve, reject) => {
        fetch(`${domain}/api/${path}/${id}${newsort}`, {
            headers: {
                'Authorization': `Bearer ${token} ${apiKey}`
            }
        }).then(res => res.json()).then(json => resolve(json.data))
    })
}

export const deleteReq = (path: string, id: string|number, token: string) => {
    return new Promise ((resolve, reject) => {
        fetch(`${domain}/api/${path}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token} ${apiKey}`
            }
        }).then(res => res.json()).then(json => resolve(json))
    })
}

export const putReq = (path: string, id: string|number, token: string, data: object) => {
    return new Promise ((resolve, reject) => {
        fetch(`${domain}/api/${path}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token} ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => resolve(json))
    })
}

export const postReq = (path: string, token: string, data: object) => {
    return new Promise ((resolve, reject) => {
        fetch(`${domain}/api/${path}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token} ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => resolve(json))
    })
}



// class ReqAPI implements ParamsAPI {
//     constructor(public path: string, public id: string|number, public token: string, public sort: string, public data: any) {
//         this.path = path;
//         this.id = id;
//         this.token = token;
//         this.sort = sort;
//         this.data = data;
//     }

//     getAPI = () => {
//         let newsort = this.sort ? '' : `+sort${this.sort.trim()}`
//         return new Promise ((resolve, reject) => {
//             fetch(`${domain}/api/${this.path}/${this.id}${newsort}`, {
//                 headers: {
//                     'Authorization': `Bearer ${this.token} ${apiKey}`
//                 }
//             }).then(res => res.json()).then(json => resolve(json.data))
//         })
//     }
// }