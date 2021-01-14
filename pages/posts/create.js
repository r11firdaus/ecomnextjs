import { useState } from "react";
import Router from "next/router";
import { authPage } from "../../middleware/authrizationPage";
import Nav from "../../components/nav";

export async function getServerSideProps(context) {
    const { token } = await authPage(context)

    return {
        props: {
            token
        }
    }
}

export default function Create(props) {
    const [field, setfield] = useState({title: '', content: ''});

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
        await fetch('/api/posts/create', {
            method: 'POST',
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
            <h1>Create Post</h1>
            <Nav />
            <form onSubmit={submitHandler} style={{ border: '1px solid grey', margin: '10px 5px', padding: '20px 5px' }}>
                <input
                    type="text"
                    name="title"
                    style={{ width: '90%', maxWidth: '500px', margin: '10px auto' }}
                    placeholder="title"
                    onChange={fieldHandler}
                />
                <textarea
                    name="content"
                    style={{ height: '50px', width: '90%', maxWidth: '500px', margin: '10px auto' }}
                    placeholder="Content"
                    onChange={fieldHandler}
                /><br />
                <button type="submit">Post</button>
            </form>
        </div>
    )
}