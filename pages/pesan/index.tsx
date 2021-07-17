import { memo, useEffect, useState, Fragment } from "react";
import Link from 'next/link';
import { authPage } from '../../middleware/authrizationPage';
import { socket } from "../../function/socket";
import { loadMsg } from "../../function/loadData";
import { getReq } from "../../function/API";
import { GetServerSideProps } from "next";
import { MyIdAndToken } from "../../type";
import SkelPesan from "../../components/skeleton/skel-pesan";
import { useDispatch } from "react-redux";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { id_user, token } = await authPage(ctx)
    return {
        props: {
            id_user,
            token
        }
    }
}

const index = (props: MyIdAndToken): JSX.Element => {
    const [person, setperson] = useState<any[]>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: Router.pathname})
        getData()
        socket.on('chat message', (msg: string, idCht: string, receiver: string|number) => {
            receiver == props.id_user && getData()
        })
    }, [])

    const getData = async (): Promise<void> => {
        let id = []
        let newMsg = []

        await loadMsg(props.id_user, props.token).then((msg: any) => {
            msg.msg.map(async (pesan: {nama_user: string, id_chat: string}) => {
                if (!pesan.nama_user) {
                    const pisahIdUser = pesan.id_chat.split('$')
                    let id_user2 = []
                    let lawan: string;
                    pisahIdUser.map(id => id != props.id_user && id_user2.push(parseInt(id)))
    
                    if (msg.msg.length > 0) {
                        for (let i = 0; i < msg.msg.length; i++) {
                            if (msg.msg[i].nama_user && msg.msg[i].id_user === id_user2[0]) {
                                lawan = msg.msg[i].nama_user
                                break;
                            }
                        }
                        if (!lawan) {
                            await getReq('user', parseInt(id_user2[0]), props.token,).then((res: typeof pesan) => {
                                lawan = res.nama_user
                            })
                        }
                    }
                    pesan.nama_user = lawan;
                }
                !id.includes(pesan.id_chat) && newMsg.push(pesan)
                id.push(pesan.id_chat)
            })
        });

        setperson(newMsg)
    }

    return (
        <>
            <ul id="messages" style={{ margin: '-1.5rem 0 3rem 0' }}>
                {person !== null ?
                    person.length > 0 &&
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
                        </Fragment>)) :
                        <ul id="messages" style={{ margin: '-1.5rem 0 3rem 0' }}>
                            <SkelPesan />
                            <SkelPesan />
                            <SkelPesan />
                            <SkelPesan />
                            <SkelPesan />
                        </ul>
                }
            </ul>
        </>
    )
}

export default memo(index)