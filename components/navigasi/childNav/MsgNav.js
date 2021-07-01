import Link from "next/link"
import { memo } from "react"
import { ChatFill } from "react-bootstrap-icons"
import { useDispatch, useSelector } from "react-redux"
import { socket } from "../../../function/socket"
import Baloon from '../../baloon'

const index = () =>  {
    const {unreadMessage, id_user, page} = useSelector(state => state)
    const dispatch = useDispatch()

    socket.on('chat message', (msg, id_chat, receiver_user, sender) => {
        if (receiver_user == id_user) dispatch({ type: 'UNREAD_MESSAGE', payload: unreadMessage + 1 })
    })

    return(<>
        {page == 'pesan' ?
            <ChatFill color="#4b3832" /> :
            <Link href="/pesan">
                <div style={{ display: 'flex' }}>
                    <ChatFill color="#be9b7b" />
                    {unreadMessage > 0 && <Baloon value={unreadMessage} />}
                </div>
            </Link>
        }
    </>)
} 

export default memo(index)