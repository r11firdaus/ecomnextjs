import { memo, useEffect } from "react"
import Link from 'next/link'
import Cookie from 'js-cookie'
import { BellFill, BoxArrowInLeft, ChatFill, HouseFill, PersonFill } from "react-bootstrap-icons"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { getReq } from "../../function/API";
import { socket } from "../../function/socket"

const BottomNav = (props) => {
    const { unreadMessage, notification, id_user } = useSelector(state => state)
    const dispatch = useDispatch();

    const loadDB = async (id, token) => {
        const { res } = await getReq('chat/message/unread', id, token)
        dispatch({ type: 'UNREAD_MESSAGE', payload: res.length })

        await getReq('notification', id, token).then(res => {
            dispatch({ type: 'UNREAD_NOTIFICATION', payload: res.res.length })
        })
    }

    useEffect(() => {
        const getId = Cookie.get("id_user")
        const token = Cookie.get("token")
        if (getId && id_user === null | undefined) dispatch({ type: 'ID_USER', payload: getId })

        if (id_user !== null && token) loadDB(id_user, token)

        socket.on('loadDB', () => {
            if (id_user !== null && token) loadDB(id_user, token)
        })

        socket.on('chat message', (msg, id_chat, receiver_user, sender) => {
            if (receiver_user == id_user) dispatch({ type: 'UNREAD_MESSAGE', payload: unreadMessage + 1 })
        })
    }, [id_user])

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