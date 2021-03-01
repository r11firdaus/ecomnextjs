import { memo, useEffect } from "react"
import Link from 'next/link'
import Cookie from 'js-cookie'
import { Bell, BellFill, BoxArrowInLeft, Chat, ChatFill, House, HouseFill, Person, PersonFill } from "react-bootstrap-icons"
import { useSelector } from "react-redux"
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { getReq } from "../../function/API";
const socket = io("http://localhost:3001/");

const BottomNav = (props) => {
    const { unreadMessage, notification, id_user } = useSelector(state => state)
    const dispatch = useDispatch();
    
    useEffect(async () => {
        const getId = Cookie.get("id_user")
        const token = Cookie.get("token")
        getId && dispatch({ type: 'ID_USER', payload: getId})

        socket.on('loadDB', async () => {
            const {res} = await getReq('chat/message/unread', id_user, token)
            dispatch({ type: 'UNREAD_MESSAGE', payload: res.length })

            await getReq('notification', id_user, token).then(res => {
                dispatch({ type: 'UNREAD_NOTIFICATION', payload: res.res.length })
            })
        })

        socket.on('chat message', async (msg, id_chat, receiver_user, sender) => {
            if (receiver_user == id_user) dispatch({ type: 'UNREAD_MESSAGE', payload: unreadMessage + 1 })
        })
    }, [id_user])

    return (<>
        <div className="navbar-wrapper">
            {props.hal == 'home' ?
                <HouseFill color="green" /> :
                <Link href="/"><House /></Link>
            }
            {props.hal == 'notifikasi' ?
                <BellFill color="green" /> :
                <Link href="/notifikasi">
                    <div style={{ display: 'flex' }}>
                        <Bell />
                        {notification > 0 &&
                            <div className="baloon-new">
                                <p className="txt-baloon">{notification}</p>
                            </div>
                        }
                    </div>
                </Link>
            }
            {props.hal == 'pesan' ?
                <ChatFill color="green" /> :
                <Link href="/pesan">
                    <div style={{ display: 'flex' }}>
                        <Chat />
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
                        <PersonFill size={20} color="green" /> :
                        <Link href={`/profil/${id_user}`}><Person size={20} /></Link> :
                    <Link href="/login"><BoxArrowInLeft /></Link>

            }
        </div>
    </>)
}

export default memo(BottomNav)