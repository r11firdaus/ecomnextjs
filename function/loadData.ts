import { getReq } from './API'

export const loadMsg = (id: string|number, token: string) => {
    return new Promise(async(resolve, reject) => {
        let msg = [];
        const chats = localStorage.getItem('chats');

        if (chats) msg = JSON.parse(chats)
        else {
            await getReq('chat', id, token).then((res: typeof msg) => {
                localStorage.setItem('chats', JSON.stringify(res))
                msg = res
                console.warn('get db message')
            })
        }
        resolve({msg})
    })
}

export const loadNotif = (id: string|number, token: string) => {
    return new Promise(async(resolve, reject) => {
        let notif = [];
        const getLocaNotif = localStorage.getItem('notification');

        if (getLocaNotif) notif = JSON.parse(getLocaNotif)
        else {
            await getReq('notification', id, token).then((res: typeof notif) => {
                localStorage.setItem('notification', JSON.stringify(res));
                notif = res
                console.warn('get db notif')
            })
        }
        resolve({notif})
    })
}