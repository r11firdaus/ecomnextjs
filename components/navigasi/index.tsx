import { memo, useEffect } from "react";
import { useSelector } from "react-redux"
import Nav2 from "./nav2";
import Nav from "./nav";
import BottomNav from "./bottomNav";
import { socket } from "../../function/socket";
import { loadMsg } from "../../function/loadData";
import Cookie from "js-cookie"
import Router from 'next/router'
import { GlobalState } from "../../type";

const index = (props: {page: string, newTitle?: string}): JSX.Element => {
    // const { page }: GlobalState = useSelector(state => state);

    useEffect(() => {
        socket.on('chat message', async (message: string, id_chat: string, receiver_user: string|number, sender: string|number) => {
            const idUser = Cookie.get('id_user');
    
            if (idUser == receiver_user || idUser == sender) {
                const token = Cookie.get('token')
                const localChat = localStorage.getItem('chats');
                let jsonLocalChat = localChat && JSON.parse(localChat);
    
                let newMsg = {
                    id_chat,
                    id_user: parseInt((sender as string)),
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

    switch (props.page) {
        case '/kategori': return <Nav2 title='Category' />
        case '/kategori/[nama_category]': return <Nav2 title='Category' />
        case '/keranjang': return <Nav2 title='Cart' />
        case '/profil/edit': return <Nav2 title='Edit' />
        case '/pesan': return <><Nav2 title='Chats' /><BottomNav /></>
        case '/pesan/[id_chat]': return <></>
        case '/notifikasi': return <><Nav2 title='Notification' /><BottomNav /></>
        case '/subkategori/[nama_subcategory]': return <Nav />
        case '/barang/[id_barang]': return <Nav />
        case '/pencarian/[keyword]': return <Nav />
        case '/': return <><Nav /><BottomNav /></>
        case '/profil/[id_user]': return <><Nav /><BottomNav /></> 
        default: return null
    }
}

export default memo(index)

// case 'kategori': return <Nav2 />
//         case 'cart': return <Nav2 />
//         case 'Edit': return <Nav2 />
//         case 'pesan': return <><Nav2 /><BottomNav /></>
//         case 'notifikasi': return <><Nav2 /><BottomNav /></>
//         case 'subkategori': return <Nav />
//         case 'barang': return <Nav />
//         case 'pencarian': return <Nav />
//         case 'home': return <><Nav /><BottomNav /></>
//         case 'profil': return <><Nav /><BottomNav /></> 
//         default: return null