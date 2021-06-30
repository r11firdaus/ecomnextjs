import { memo, useEffect } from "react";
import { useSelector } from "react-redux"
import Nav2 from "./nav2";
import Nav from "./nav";
import BottomNav from "./bottomNav";
import { socket } from "../../function/socket";
import { loadMsg } from "../../function/loadData";
import Cookie from "js-cookie"
import Router from 'next/router'

const index = () => {
    const { page } = useSelector(state => state);

    useEffect(() => {
        socket.on('chat message', async (message, id_chat, receiver_user, sender) => {
            const idUser = Cookie.get('id_user');
    
            if (idUser == receiver_user | sender) {
                const token = Cookie.get('token')
                const localChat = localStorage.getItem('chats');
                let jsonLocalChat = localChat && JSON.parse(localChat);
    
                let newMsg = {
                    id_chat,
                    id_user: parseInt(sender),
                    receiver_user,
                    message,
                    status_message: Router.pathname == '/pesan/[id_chat]' ? 'read' : 'unread',
                }
    
                if (localChat) {
                    const newLocalChat = [newMsg, ...jsonLocalChat]
                    localStorage.setItem('chats', JSON.stringify(newLocalChat))
                } else await loadMsg(idUser, token)
    
            }
        });
    }, [])

    switch (page) {
        case 'kategori': return <Nav2 />
        case 'cart': return <Nav2 />
        case 'Edit': return <Nav2 />
        case 'pesan': return <><Nav2 /><BottomNav /></>
        case 'notifikasi': return <><Nav2 /><BottomNav /></>
        case 'subkategori': return <Nav />
        case 'barang': return <Nav />
        case 'pencarian': return <Nav />
        case 'home': return <><Nav /><BottomNav /></>
        case 'profil': return <><Nav /><BottomNav /></> 
        default: return null
    }
}

export default memo(index)