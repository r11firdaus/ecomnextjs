import { getReq } from '../function/API'

export const loadMsg = (id, token) => {
    return new Promise(async(resolve, reject) => {
        let msg = [];
        const chats = localStorage.getItem('chats');

        if (chats) msg = JSON.parse(chats)
        else {
            const { res } = await getReq('chat', id, token)
            localStorage.setItem('chats', JSON.stringify(res))
            msg = res
            console.warn('get db message')
        }
        resolve({msg})
    })
}

export const loadNotif = (id, token) => {
    return new Promise(async(resolve, reject) => {
        let notif = [];
        const getLocaNotif = localStorage.getItem('notification');

        if (getLocaNotif) notif = JSON.parse(getLocaNotif)
        else {
            const { res } = await getReq('notification', id, token)
            localStorage.setItem('notification', JSON.stringify(res));
            notif = res
            console.warn('get db notif')
        }
        resolve({notif})
    })
}