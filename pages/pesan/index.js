import { memo, useEffect, useState, Fragment } from "react";
import Link from 'next/link';
import { authPage } from '../../middleware/authrizationPage';
import { useDispatch } from "react-redux";
import { socket } from "../../function/socket";
import { loadMsg } from "../../function/loadData";
import { getReq } from "../../function/API";

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

    useEffect(() => {
        getData()
        dispatch({ type: 'SITE_PAGE', payload: 'pesan' })
        socket.on('chat message', async (msg, idCht, receiver) => receiver == props.id_user && getData())
    }, [])

    const getData = async () => {
        const { msg } = await loadMsg(props.id_user, props.token);

        let id = []
        let newMsg = []
        msg.map(async pesan => {
            if (!pesan.nama_user) {
                const pisahIdUser = pesan.id_chat.split('$')
                let id_user2 = []
                let lawan;
                pisahIdUser.map(id => id != props.id_user && id_user2.push(parseInt(id)))

                if (msg.length > 0) {
                    for (let i = 0; i < msg.length; i++) {
                        if (msg[i].nama_user && msg[i].id_user === id_user2[0]) {
                            lawan = msg[i].nama_user
                            break;
                        }
                    }
                    if (!lawan) {
                        const { res } = await getReq('user', parseInt(id_user2[0]), props.token)
                        lawan = res.nama_user
                    }
                }
                pesan.nama_user = lawan;
            }
            !id.includes(pesan.id_chat) && newMsg.push(pesan)
            id.push(pesan.id_chat)
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