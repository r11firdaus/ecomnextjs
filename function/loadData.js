import { socket } from "./socket";
import { getReq } from '../function/API'

let socketOpenDB = false
let msg;
let notif;
let indexMsg;

export function loadData(id, token, type) {
    return new Promise((resolve, reject) => {
        const chats = localStorage.getItem('chats');
        const getLocaNotif = localStorage.getItem('notification');

        if (type === "message") {
            chats ? processMsg(JSON.parse(chats), id) : getFromDB(id, token, type)
        }

        if (type === "notification") {
            getLocaNotif ? notif = JSON.parse(getLocaNotif) : getFromDB(id, token, type)
        }

        resolve({ msg, notif, indexMsg })
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
        const { res } = await getReq('chat', id, token)
        localStorage.setItem('chats', JSON.stringify(res))
        processMsg(res, id)
        console.warn('get db message')
    }
    const getDBNotif = async () => {
        const { res } = await getReq('notification', id, token)
        localStorage.setItem('notification', JSON.stringify(res));
        notif = res
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

const processMsg = (data, id) => {
    let unread = [];
    let arr = []
    let newMsg = []

    data.map(pesan => {
        pesan.status_message === "unread" && pesan.receiver == id && unread.push(pesan)
        !arr.includes(pesan.id_chat) && newMsg.push(pesan)
        arr.push(pesan.id_chat)
    })
    msg = unread.length
    indexMsg = newMsg
}