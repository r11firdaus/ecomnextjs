import { memo, useEffect } from "react"
import Cookie from 'js-cookie'
import { useDispatch } from "react-redux";
import {NotifNav, MsgNav, HomeNav, ProfilNav} from "./childNav"
import {loadMsg, loadNotif} from '../../function/loadData'

// netxt => buat koneksi ke db seminimal mungkin
const BottomNav = (): JSX.Element => {
    console.warn('bottomNav dimuat')
    const dispatch = useDispatch();

    useEffect(() => {
        const getId = Cookie.get("id_user")
        const token = Cookie.get("token")

        loadData(getId, token)
    }, [])

    const loadData = async (id_user: string|number, token: string): Promise<void> => {
        if (id_user && token) {
            dispatch({ type: 'ID_USER', payload: id_user })

            await loadMsg(id_user, token).then(async(res: any) => {
                let unread = [];
                await res.msg?.map((psn: any) => {
                    psn.status_message === "unread" && psn.receiver == id_user && unread.push(psn)
                })
                dispatch({ type: 'UNREAD_MESSAGE', payload: unread.length })
            })

            await loadNotif(id_user, token).then((res: any) => {
                dispatch({ type: 'UNREAD_NOTIFICATION', payload: res.notif.length})
            })
        }
    }

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