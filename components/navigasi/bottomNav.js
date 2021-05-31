import { memo, useEffect } from "react"
import Cookie from 'js-cookie'
import { useDispatch } from "react-redux";
import {NotifNav, MsgNav, HomeNav, ProfilNav} from "./childBottomNav"
import { loadData } from "../../function/loadData";

// netxt => buat koneksi ke db seminimal mungkin
const BottomNav = () => {
    const dispatch = useDispatch();
    // let loaded = false

    useEffect(async() => {
        const getId = Cookie.get("id_user")
        const token = Cookie.get("token")

        if (getId && token) {
            dispatch({ type: 'ID_USER', payload: getId })
            const {msg, notif} = await loadData(getId, token);

            dispatch({ type: 'UNREAD_MESSAGE', payload: msg })
            dispatch({ type: 'UNREAD_NOTIFICATION', payload: notif})
            
            // const getLocalMsg = localStorage.getItem('unread_message');
            // getLocalMsg ? dispatch({ type: 'UNREAD_MESSAGE', payload: parseInt(getLocalMsg) }) : getFromDB(getId, token, 'message')
            
            // const getLocaNotif = localStorage.getItem('notification');
            // getLocaNotif ? dispatch({ type: 'UNREAD_NOTIFICATION', payload: JSON.parse(getLocaNotif).length }) : getFromDB(getId, token, 'notification')
            
            // socket.on('loadDB', () => {
            //     if (!socketOpenDB) {
            //         getFromDB(getId, token, 'msg&notif')
            //         socketOpenDB = true
            //         setTimeout(() => {
            //             socketOpenDB = false
            //             console.log(`loaded set to ${socketOpenDB}`)
            //         }, 3000);
            //     }
            // })
        }
    }, [])

    // const getFromDB = (id, token, type) => {
    //     const getDBMsg = async () => {
    //         const { res } = await getReq('chat/message/unread', id, token)
    //         localStorage.setItem('unread_message', res.length);
    //         dispatch({ type: 'UNREAD_MESSAGE', payload: res.length })
    //         console.warn('get db message')
    //     }
    //     const getDBNotif = async () => {
    //         const { res } = await getReq('notification', id, token)
    //         localStorage.setItem('notification', JSON.stringify(res));
    //         dispatch({ type: 'UNREAD_NOTIFICATION', payload: res.length })
    //         console.warn('get db notif')
    //     }

    //     // if (id && token && !loaded) {
    //     if (id && token) {
    //         if (type === 'message') getDBMsg()
    //         if (type === 'notification') getDBNotif()
    //         if (type === 'msg&notif') {
    //             getDBNotif()
    //             getDBMsg()
    //         }
    //         // loaded = true
    //     }
    // }  
    // next => bikin socket.on('get notified')
    return (
        <div className="navbar-wrapper">
            <HomeNav />
            <NotifNav />
            <MsgNav />
            <ProfilNav />
        </div>
    )
}

export default memo(BottomNav)