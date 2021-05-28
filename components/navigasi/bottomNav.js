import { memo, useEffect } from "react"
import Link from 'next/link'
import Cookie from 'js-cookie'
import { BellFill, BoxArrowInLeft, ChatFill, HouseFill, PersonFill } from "react-bootstrap-icons"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { getReq } from "../../function/API";
import { socket } from "../../function/socket"
// netxt => buat koneksi ke db seminimal mungkin
const BottomNav = (props) => {
    const { unreadMessage, notification, id_user } = useSelector(state => state)
    const dispatch = useDispatch();

    useEffect(() => {
        const getId = Cookie.get("id_user")
        const token = Cookie.get("token")

        socket.on('loadDB', () => {
            if (getId !== null | undefined && token) getFromDB(getId, token, 'msg&notif')
        })

        if (id_user === null|undefined && getId && token) {
            dispatch({ type: 'ID_USER', payload: getId })

            const getLocalMsg = localStorage.getItem('unread_message');
            getLocalMsg ? dispatch({ type: 'UNREAD_MESSAGE', payload: parseInt(getLocalMsg) }) : getFromDB(getId, token, 'message')

            const getLocaNotif = localStorage.getItem('unread_message');
            getLocaNotif ? dispatch({ type: 'UNREAD_MESSAGE', payload: parseInt(getLocaNotif) }) : getFromDB(getId, token, 'notification')
        }
    }, [])

    const getFromDB = (id, token, type) => {
        const getDBMsg = async () => {
            const { res } = await getReq('chat/message/unread', id, token)
            localStorage.setItem('unread_message', res.length);
            dispatch({ type: 'UNREAD_MESSAGE', payload: res.length })
        }
        const getDBNotif = async () => {
            const { res } = await getReq('notification', id, token)
            localStorage.setItem('unread_notification', res.length);
            dispatch({ type: 'UNREAD_NOTIFICATION', payload: res.length })
        }
        if (type === 'message') getDBMsg()
        if (type === 'notification') getDBNotif()
        if (type === 'msg&notif') {
            getDBMsg()
            getDBNotif()
        }
    }

    socket.on('chat message', (msg, id_chat, receiver_user, sender) => {
        if (receiver_user == id_user) dispatch({ type: 'UNREAD_MESSAGE', payload: unreadMessage + 1 })
    })

    // next => bikin socket.on('get notified')

    return (<>
        <div className="navbar-wrapper">
            {props.hal == 'home' ?
                <HouseFill color="#4b3832" /> :
                <Link href="/"><HouseFill color="#be9b7b" /></Link>
            }
            {props.hal == 'notifikasi' ?
                <BellFill color="#4b3832" /> :
                <Link href="/notifikasi">
                    <div style={{ display: 'flex' }}>
                        <BellFill color="#be9b7b" />
                        {notification > 0 &&
                            <div className="baloon-new">
                                <p className="txt-baloon">{notification}</p>
                            </div>
                        }
                    </div>
                </Link>
            }
            {props.hal == 'pesan' ?
                <ChatFill color="#4b3832" /> :
                <Link href="/pesan">
                    <div style={{ display: 'flex' }}>
                        <ChatFill color="#be9b7b" />
                        {unreadMessage > 0 &&
                            <div className="baloon-new">
                                <p className="txt-baloon">{unreadMessage}</p>
                            </div>
                        }
                    </div>
                </Link>
            }
            {
                id_user !== null ?
                    props.hal == 'profil' ?
                        <PersonFill size={20} color="#4b3832" /> :
                        <Link href={`/profil/${id_user}`}><PersonFill size={20} color="#be9b7b" /></Link> :
                    <Link href="/login"><BoxArrowInLeft color="#be9b7b" /></Link>

            }
        </div>
    </>)
}

export default memo(BottomNav)