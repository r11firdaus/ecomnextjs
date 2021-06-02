import { memo, useEffect, useState } from "react";
import { getReq } from '../../function/API';
import Nav2 from '../../components/navigasi/nav2';
import Link from 'next/link';
import { authPage } from '../../middleware/authrizationPage'
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../function/socket";
import { loadData } from "../../function/loadData";

export const getServerSideProps = async ctx => {
    const { id_user, token } = await authPage(ctx)
    return {
        props: {
            id_user,
            token
        }
    }
}

const index = (props) => {
    const [person, setperson] = useState([])
    const { unreadMessage } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(async() => {
        dispatch({ type: 'SITE_PAGE', payload: 'pesan' })
        const { indexMsg } = await loadData(props.id_user, props.token, "message");
        setperson(indexMsg)
    }, [])

    socket.on('chat message', async (msg, id_chat, receiver_user, sender) => {
        if (receiver_user == props.id_user) {
            dispatch({ type: 'UNREAD_MESSAGE', payload: unreadMessage + 1 })
            localStorage.removeItem('chats')
            const { indexMsg } = await loadData(props.id_user, props.token, "message");
            setperson(indexMsg)
        }
    })

    return (
        <>
            <ul id="messages" style={{ margin: '3rem 0' }}>
                {
                    person.map(per => (
                        <Link href={`/pesan/${per.id_chat}`} key={per.id_chat}>
                            <li>
                                {per.nama_user}
                                <p style={{ fontSize: '10px', margin: '0' }}>{per.message}</p>
                                {per.status_message !== 'read' && per.id_user != props.id_user &&
                                    <div className="baloon-new float-right" style={{ marginTop: '-25px' }}>
                                        <p className="txt-baloon" />
                                    </div>
                                }
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </>
    )
}

export default memo(index)