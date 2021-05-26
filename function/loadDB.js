import { getReq } from "./API";

const loadDB = async (id, token) => {
    const { res } = await getReq('chat/message/unread', id, token)
    localStorage.setItem('unread_message', res.length);

    await getReq('notification', id, token).then(res => {
        localStorage.setItem('unread_notification', res.res.length)
    })

    await getReq('cart', id, token).then(res => {
        localStorage.setItem('cart_length', res.res.length)
    })
}

export default loadDB;