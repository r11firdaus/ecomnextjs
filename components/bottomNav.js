import { memo, useEffect, useState } from "react"
import Link from 'next/link'
import Cookie from 'js-cookie'
import { Bell, BellFill, BoxArrowInLeft, Chat, ChatFill, House, HouseFill, Person, PersonFill } from "react-bootstrap-icons"
import { useSelector } from "react-redux"

const BottomNav = (props) => {
    const [id_user, setid_user] = useState(null)
    const { unreadMessage, notification } = useSelector(state => state)

    useEffect(async () => {
        const getId = Cookie.get("id_user")
        getId && setid_user(getId)
    }, [])

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
                id_user ?
                    props.hal == 'profil' ?
                        <PersonFill size={20} color="green" /> :
                        <Link href={`/profil/${id_user}`}><Person size={20} /></Link> :
                    <Link href="/login"><BoxArrowInLeft /></Link>

            }
        </div>
    </>)
}

export default memo(BottomNav)