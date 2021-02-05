import { memo, useEffect, useState } from "react"
import Link from 'next/link'
import Cookie from 'js-cookie'
import { Bell, BellFill, BoxArrowInLeft, Chat, ChatFill, House, HouseFill, Person, PersonFill } from "react-bootstrap-icons"

const BottomNav = (props) => {
    const [id_user, setid_user] = useState(null)

    useEffect(() => {
        const getId = Cookie.get("id_user")
        getId && setid_user(getId)
    }, [])
    return (
        <div style={{justifyContent: 'space-around', display: 'flex', bottom: '0', position: 'fixed', width: '100%', padding: '10px 0', borderTop: '1px  rgba(224,224,224,1) solid', background: 'white'}}>
            {props.hal == 'home' ?
                <Link href="/"><HouseFill color="green" /></Link>:
                <Link href="/"><House /></Link>
            }
            {props.hal == 'notifikasi' ?
                <Link href="/notifikasi"><BellFill color="green" /></Link>:
                <Link href="/notifikasi"><Bell /></Link>
            }
            {props.hal== 'pesan' ?
                <Link href="/pesan"><ChatFill color="green" /></Link>:
                <Link href="/pesan"><Chat /></Link>
            }
            {
                id_user ?
                props.hal== 'profil' ?
                <Link href={`/profil/${id_user}`}><PersonFill size={20} color="green" /></Link>:
                <Link href={`/profil/${id_user}`}><Person size={20} /></Link>:
                <Link href="/login"><BoxArrowInLeft /></Link>
            
            }
        </div>
    )
}

export default memo(BottomNav)