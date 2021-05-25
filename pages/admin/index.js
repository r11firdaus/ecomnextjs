import { memo } from "react";
import { postReq } from "../../function/API";
import { authPage } from "../../middleware/authrizationPage";

export const getServerSideProps = async (ctx) => {
    const { id_user, token } = await authPage(ctx);

    return {
        props: { id_user, token }
    }
}

const index = (props) => {
    const sendNotif = async () => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const { res } = await postReq('notification/create', props.token, {
            title,
            content
        })
    }

    return (<>
        <h5>Add Notification</h5>
        <p>Title</p>
        <input type="text" id="title" placeholder="Nama Barang" required /><br />
        <p>Contents</p>
        <textarea type="text" id="content" placeholder="Nama Barang" required /><br />
        <br />
        <button onClick={() => sendNotif()}>Send</button>
    </>)
}

export default memo(index)