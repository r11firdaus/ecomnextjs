import { loadMsg } from "./loadData";

export const socketMsg = async (data, page, id_user, token) => {
    const localChat = localStorage.getItem('chats');
    let jsonLocalChat = localChat && await JSON.parse(localChat);

    if (page === 'pesan') {
        if (jsonLocalChat) {
            await jsonLocalChat.push((data))
            localStorage.setItem('chats', jsonLocalChat)
        }
        else await loadMsg(id_user, token)
    }
}