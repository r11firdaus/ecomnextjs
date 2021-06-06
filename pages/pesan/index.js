import { memo, useEffect, useState } from "react";
import Link from 'next/link';
import { authPage } from '../../middleware/authrizationPage'
import { useDispatch } from "react-redux";
import { socket } from "../../function/socket";
import { loadMsg } from "../../function/loadData";
import { socketMsg } from "../../function/socketAction";
import { Fragment } from "react";

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
    const dispatch = useDispatch()

    useEffect(async() => {
        getData()
        dispatch({ type: 'SITE_PAGE', payload: 'pesan' })
        
        socket.on('chat message', async (message, id_chat, receiver_user, sender) => {
            if (receiver_user == props.id_user) {
                const newMsg = {
                    id_chat,
                    id_user: parseInt(sender),
                    receiver_user,
                    message,
                    status_message: 'unread'
                }
                await socketMsg(newMsg, 'pesan', props.id_user, props.token, '')
                getData()
            }
        })
    }, [])
    

    const getData = async () => {
        const { msg } = await loadMsg(props.id_user, props.token);

        let arr = []
        let newMsg = []
        await msg.map(pesan => {
            !arr.includes(pesan.id_chat) && newMsg.push(pesan)
            arr.push(pesan.id_chat)
        })

        setperson(newMsg)
    }

    return (
        <>
            <ul id="messages" style={{ margin: '3rem 0' }}>
                {person.length > 0 &&
                    person.map((per, i) => (<Fragment key={i}>
                        <Link href={`/pesan/${per.id_chat}`}>
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
                    </Fragment>))
                }
            </ul>
        </>
    )
}

export default memo(index)