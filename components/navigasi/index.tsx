import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Nav2 from "./nav2";
import Nav from "./nav";
import BottomNav from "./bottomNav";
import { socket } from "../../function/socket";
import { loadMsg, loadNotif } from "../../function/loadData";
import Cookie from "js-cookie"
import Router from 'next/router'
import { GlobalState } from "../../type";
import { loadLocalMsg, loadLocalNotif } from "../../function/loadDataLocal";
import { TruckFlatbed } from "react-bootstrap-icons";


const index = (): JSX.Element => {
    let dbLoaded = false;
    const { page, id_user }: GlobalState = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        const idUser = Cookie.get('id_user');
        !id_user && idUser && dispatch({ type: 'ID_USER', payload: idUser })

        socket.on('chat message', async (message: string, id_chat: string, receiver_user: string | number, sender: string | number) => {

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

    useEffect(() => {
        if (id_user) {
            async () => {
                await loadLocalMsg().then(res => processMsg(res))
                await loadLocalNotif().then((res: any) => {
                    res.notif && dispatch({ type: 'UNREAD_NOTIFICATION', payload: res.notif.length })
                });
            }
            socket.on('loadDB', async () => await loadFromDB());
        }
    }, [id_user])

    const loadFromDB = async () => {
        const token = Cookie.get('token');
        const idUser = Cookie.get('id_user');
        if (!dbLoaded && token && idUser) {
            dbLoaded = true
    
            await loadMsg(idUser, token).then((res: any) => processMsg(res))
            .catch(async() => await loadLocalMsg().then(res => processMsg(res)))
    
            await loadNotif(idUser, token).then((res: any) => {
                dispatch({ type: 'UNREAD_NOTIFICATION', payload: res.notif.length })
            }).catch(async err => {
                await loadLocalNotif().then((res: any) => {
                    res.notif && dispatch({ type: 'UNREAD_NOTIFICATION', payload: res.notif.length })
                });
            })

            setTimeout(() => dbLoaded = false, 3000);
        }
    }

    const processMsg = async (res: any) => {
        let unread = [];
        await res.msg?.map((psn: any) => {
            psn.status_message === "unread" && psn.receiver == id_user && unread.push(psn)
        })
        dispatch({ type: 'UNREAD_MESSAGE', payload: unread.length })
    }

    switch (page) {
        case '/kategori': return <Nav2 title='Category' />
        case '/kategori/[nama_category]': return <Nav2 title='Category' />
        case '/keranjang': return <Nav2 title='Cart' />
        case '/profil/edit': return <Nav2 title='Edit' />
        case '/profil/edit/avatar': return <Nav2 title='Change Avatar' />
        case '/barang/create': return <Nav2 title='Add Barang' />
        case '/barang/update/[id_barang]': return <Nav2 title='Edit' />
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