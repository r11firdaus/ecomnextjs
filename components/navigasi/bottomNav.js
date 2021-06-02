import { memo, useEffect } from "react"
import Cookie from 'js-cookie'
import { useDispatch } from "react-redux";
import {NotifNav, MsgNav, HomeNav, ProfilNav} from "./childBottomNav"
import {loadMsg, loadNotif} from '../../function/loadData'

// netxt => buat koneksi ke db seminimal mungkin
const BottomNav = () => {
    console.warn('bottomNav dimuat')
    const dispatch = useDispatch();

    useEffect(async() => {
        const getId = Cookie.get("id_user")
        const token = Cookie.get("token")

        if (getId && token) {
            dispatch({ type: 'ID_USER', payload: getId })

            const {msg} = await loadMsg(getId, token);
            let unread = [];
            await msg.map(psn => {
                psn.status_message === "unread" && psn.receiver == getId && unread.push(psn)
            })
            dispatch({ type: 'UNREAD_MESSAGE', payload: unread.length })

            const {notif} = await loadNotif(getId, token, "notification");
            dispatch({ type: 'UNREAD_NOTIFICATION', payload: notif.length})
        }
    }, [])

    // next => bikin socket.on('get notified')
    return (
        <div className="navbar-wrapper" style={{zIndex: 2}}>
            <HomeNav />
            <NotifNav />
            <MsgNav />
            <ProfilNav />
        </div>
    )
}

export default memo(BottomNav)