import Link from "next/link"
import { memo } from "react"
import { ChatFill } from "react-bootstrap-icons"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { socket } from "../../../function/socket"
import { GlobalState } from "../../../type"
import Baloon from '../../baloon'

const index = (): JSX.Element =>  {
    const {unreadMessage, id_user, page}: GlobalState = useSelector((state: RootStateOrAny) => state)
    const dispatch = useDispatch()

    socket.on('chat message', (msg: string, id_chat: string, receiver_user: number|string, sender: number|string) => {
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