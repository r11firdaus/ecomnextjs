import { socket } from "./socket";
import {getReq} from '../function/API'

let socketOpenDB = false
let msg;
let notif;

export function loadData(id, token) {
    return new Promise((resolve, reject) => {
        const getLocalMsg = localStorage.getItem('unread_message');
        getLocalMsg ? msg = parseInt(getLocalMsg) : getFromDB(id, token, 'message')
    
        const getLocaNotif = localStorage.getItem('notification');
        getLocaNotif ? notif = JSON.parse(getLocaNotif).length : getFromDB(id, token, 'notification')
        
        resolve({msg, notif})
        socket.on('loadDB', () => {
            if (!socketOpenDB) {
                getFromDB(id, token, 'msg&notif')
                socketOpenDB = true
                setTimeout(() => {
                    socketOpenDB = false
                    console.log(`loaded set to ${socketOpenDB}`)
                }, 3000);
            }
        })
    })
}

const getFromDB = (id, token, type) => {
    const getDBMsg = async () => {
        const { res } = await getReq('chat/message/unread', id, token)
        localStorage.setItem('unread_message', res.length);
        console.warn('get db message')
        msg = res.length
    }
    const getDBNotif = async () => {
        const { res } = await getReq('notification', id, token)
        localStorage.setItem('notification', JSON.stringify(res));
        notif = res.length
        console.warn('get db notif')
    }

    if (id && token) {
        if (type === 'message') getDBMsg()
        if (type === 'notification') getDBNotif()
        if (type === 'msg&notif') {
            getDBNotif()
            getDBMsg()
        }
    }
}