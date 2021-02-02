const domain = 'http://localhost:3000'
const apiKey = 'apirezajwallin'

export const getReq = (path, id, token) => {
    return new Promise ((resolve, reject) => {
        fetch(`${domain}/api/${path}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token} ${apiKey}`
            }
        }).then(res => res.json()).then(json => resolve({res: json.data}))
    })
}

export const putReq = (path, id, token, data) => {
    return new Promise ((resolve, reject) => {
        fetch(`${domain}/api/${path}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token} ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => resolve({res: json}))
    })
}

export const postReq = (path, token, data) => {
    return new Promise ((resolve, reject) => {
        fetch(`${domain}/api/${path}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token} ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => resolve({res: json}))
    })
}