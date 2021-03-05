import { memo, useEffect, useState } from "react";
import { getReq } from '../../function/API';
import Nav2 from '../../components/navigasi/nav2';
import BottomNav from '../../components/navigasi/bottomNav';
import Link from 'next/link';
import {authPage} from '../../middleware/authrizationPage'
import io from 'socket.io-client'
import { useDispatch, useSelector } from "react-redux";
const socket = io('https://jwallin.herokuapp.com/')

export const getServerSideProps = async ctx => {
    const {id_user, token} = await authPage(ctx)
    return {
        props: {
            id_user,
            token
        }
    }
}

const index = (props) => {
    const [person, setperson] = useState([])
    const {unreadMessage} = useSelector(state => state)
    const dispatch = useDispatch()

    const getMsg = async () => {
        const { res } = await getReq('chat', props.id_user, props.token)
        let arr = []
        let newMsg = []
    
        await res.map(re => {
            !arr.includes(re.id_chat) && newMsg.push(re)
            arr.push(re.id_chat)
        })
        setperson(newMsg)
    }

    socket.on('chat message', (msg, id_chat, receiver_user, sender) => {
        if (receiver_user == props.id_user) {
            dispatch({ type: 'UNREAD_MESSAGE', payload: unreadMessage + 1 })
            getMsg()  
        }
    })

    useEffect(() => {
        getMsg()
    }, [])

    return (
        <>
            <Nav2 title="Messages" />
            <ul id="messages" style={{margin: '3rem 0'}}>
                {
                    person.map(per => (
                        <Link href={`/pesan/${per.id_chat}`} key={per.id_chat}>
                            <li>
                                {per.nama_user}
                                <p style={{fontSize: '10px', margin: '0'}}>{per.message}</p>
                                {per.status_message !== 'read' && per.id_user != props.id_user &&
                                    <div className="baloon-new float-right" style={{marginTop: '-25px'}}>
                                        <p className="txt-baloon" />
                                    </div>
                                }
                            </li>
                        </Link>
                    ))
                }
            </ul>
            <BottomNav hal="pesan" />
        </>
    )
}

export default memo(index)