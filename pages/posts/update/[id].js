import { useState } from "react";
import Router from "next/router";
import { authPage } from "../../../middleware/authrizationPage";
import Nav from "../../../components/nav";

export async function getServerSideProps(context) {
    const { token } = await authPage(context)
    const { id } = context.query;

    const postReq = await fetch(`http://localhost:3000/api/posts/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    const postData = await postReq.json();

    return {
        props: {
            token,
            posts: postData.data
        }
    }
}

export default function Update(props) {
    const [field, setfield] = useState(props.posts);

    const fieldHandler = e => {
        const name = e.target.getAttribute('name');

        setfield({
            ...field,
            [name]: e.target.value
        })
    }

    const submitHandler = async e => {
        e.preventDefault();
        const { token } = props;
        await fetch(`/api/posts/update/${props.posts.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(field)
        })
        Router.push('/posts')
    }

    return (
        <div style={{ margin: '10px' }}>
            <h1>Update Post</h1>
            <Nav />
            <form onSubmit={submitHandler} style={{ border: '1px solid grey', margin: '10px 5px', padding: '20px 5px' }}>
                <input
                    type="text"
                    name="title"
                    style={{ width: '90%', maxWidth: '500px', margin: '10px auto' }}
                    placeholder="title"
                    onChange={fieldHandler}
                    defaultValue={field.title}
                />
                <textarea
                    name="content"
                    style={{ height: '50px', width: '90%', maxWidth: '500px', margin: '10px auto' }}
                    placeholder="Content"
                    onChange={fieldHandler}
                    defaultValue={field.content}
                /><br />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}