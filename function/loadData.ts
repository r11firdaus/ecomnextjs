import { getReq } from './API'

export const loadMsg = (id: string | number, token: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        let msg = [];
        await getReq('chat', id, token).then((res: typeof msg) => {
            localStorage.setItem('chats', JSON.stringify(res))
            msg = res
            console.warn('get db message')
            resolve({ msg })
        }).catch(err => reject(err))
    })
}

export const loadNotif = (id: string | number, token: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        let notif: any[];
        await getReq('notification', id, token).then((res: typeof notif) => {
            localStorage.setItem('notification', JSON.stringify(res));
            notif = res
            console.warn('get db notif')
            resolve({ notif })
        }).catch(err => reject(err))
    })
}