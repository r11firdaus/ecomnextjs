import { useEffect, useState } from "react";
import { getReq, postReq } from '../../../function/API';
import { authPage } from '../../../middleware/authrizationPage'
import Link from 'next/link';
import io from "socket.io-client";
import Router from "next/router";
const socket = io("http://localhost:3001/");

export const getServerSideProps = async (ctx) => {
    const { token, id_user } = await authPage(ctx)
    const id_user2 = ctx.query.id_user
    // const { res } = id_chat !== null && await getReq('chat/with', id_chat, token)

    let id_userRes = []
    await res.map(data => {
        id_userRes.push(data.id_user)
    })
    if (id_userRes.includes(!id_user)) {
        ctx.res.writeHead(302, {
            location: '/'
        }).end();
    }

    return {
        props: {
            id_userMe: id_user,
            token,
            res,
            id_chat
        }
    }
}

const index = (props) => {
    const [person, setperson] = useState(props.res)

    useEffect(() => {
        socket.on('chat message', async (msg, id) => {
            const { res } = await getReq('chat/with', props.id_chat, props.token)
            setperson(res)
        });

        window.scrollTo(0, document.body.scrollHeight);
        // buat fungsi 'pesan dibaca'
    }, [])

    const sendHandler = async e => {
        e.preventDefault()
        const input = document.getElementById('input');
        if (props.id_chat != null) {
            if (input.value) {
                const {res} = await postReq('chat/message/create', props.token, {
                    id_chat: props.id_chat,
                    id_user: props.id_userMe,
                    message: input.value
                })
                input.value = '';
                socket.emit('chat message', input.value, props.id_userMe);
            }
        } else {
            // buat id_chat baru lalu kirim message
        }
    }

    return (
        <>
            <ul className="row" id="message" style={{ marginBottom: '4rem', listStyle: 'none' }}>
                {
                    person.map(per => (<>
                        <div className="col" key={per.id_message}>
                            {per.id_user == props.id_userMe ?
                                <li className="card float-right" style={styles.userMe}>{per.message}</li> :
                                <li className="card float-left" style={styles.otherUser}>{per.message}</li>
                            }
                        </div>
                    </>))
                }
            </ul>
            <form id="form" onSubmit={e => sendHandler(e)}>
                <input id="input" autoComplete="off" />
                <button>Send</button>
            </form>


            <style jsx>
                {`
                    #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
                    #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
                    #input:focus { outline: none; }
                    #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }
                `}
            </style>
        </>
    )
}

const styles = {
    userMe: {
        maxWidth: '70%',
        backgroundColor: 'green',
        padding: '10px',
        margin: '10px',
        color: 'white'
    },
    otherUser: {
        maxWidth: '70%', 
        padding: '10px',
        margin: '10px'
    }
}

export default index