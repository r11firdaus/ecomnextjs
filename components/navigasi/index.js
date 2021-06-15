import { memo, useEffect } from "react";
import { useSelector } from "react-redux"
import Nav2 from "./nav2";
import Nav from "./nav";
import BottomNav from "./bottomNav";
import { socket } from "../../function/socket";
import { loadMsg } from "../../function/loadData";
import Cookie from "js-cookie"
import { getReq } from "../../function/API";
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


    if (page === 'kategori') return <Nav2 />;
    if (page === 'cart') return <Nav2 />;
    if (page === 'pesan') return <><Nav2 /><BottomNav /></>;
    if (page === 'notifikasi') return <><Nav2 /><BottomNav /></>;
    if (page === 'subkategori') return <Nav />;
    if (page === 'pencarian') return <Nav />;
    if (page === 'home') return <><Nav /><BottomNav /></>;
    if (page === 'profil') return <><Nav /><BottomNav /></>;
    else return null;
}

export default memo(index)