import { GetServerSideProps } from "next";
import { memo } from "react";
import { postReq } from "../../function/API";
import { authPage } from "../../middleware/authrizationPage";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id_user, token } = await authPage(ctx);

    return {
        props: { id_user, token }
    }
}

const index = (props: any) => {
    const sendNotif = async () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const content = (document.getElementById('content') as HTMLInputElement).value;

        await postReq('notification/create', props.token, {
            title,
            content
        }).then(res => alert(res))
    }

    return (<>
        <h5>Add Notification</h5>
        <p>Title</p>
        <input type="text" id="title" placeholder="Nama Barang" required /><br />
        <p>Contents</p>
        <textarea id="content" placeholder="Nama Barang" required /><br />
        <br />
        <button onClick={() => sendNotif()}>Send</button>
    </>)
}

export default memo(index)