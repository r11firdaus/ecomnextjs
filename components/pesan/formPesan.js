import { memo } from "react";
import io from "socket.io-client";
import { postReq } from "../../function/API";
const socket = io("http://localhost:3001/");

const FormPesan = (props) => {
    const sendHandler = async e => {
        e.preventDefault()
        const input = document.getElementById('input');
        if (props.person.length > 0) {
            if (input.value) {
                await postReq('chat/message/create', props.token, {
                    id_chat: props.id_chat,
                    id_user: props.id_userMe,
                    message: input.value
                })
                input.value = '';
                socket.emit('chat message', input.value, props.id_chat);
                window.scrollTo(0, document.body.scrollHeight);
            }
        } else {
            // buat id_chat baru lalu kirim message
            if (input.value) {
                const pisahIdUser = props.id_chat.split('$')
                await postReq('chat/create', props.token, {
                    id_chat: props.id_chat,
                    id_user1: pisahIdUser[0],
                    id_user2: pisahIdUser[1]
                })

                await postReq('chat/message/create', props.token, {
                    id_chat: props.id_chat,
                    id_user: props.id_userMe,
                    message: input.value
                })
                input.value = '';
                socket.emit('chat message', input.value, props.id_chat);
            }
        }
    }
    return (<>
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
    </>)
}

export default memo(FormPesan)