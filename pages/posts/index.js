import React, { useState } from 'react'
import { authPage } from '../../middleware/authrizationPage'
import Router from "next/router";
import Nav from '../../components/nav';

export async function getServerSideProps(context) {
    const { token } = await authPage(context);

    const postReq = await fetch('http://localhost:3000/api/posts', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const postData = await postReq.json()

    return {
        props: {
            posts: postData.data,
            token
        }
    }
}
export default function index(props) {
    const [postsData, setpostsData] = useState(props.posts)
    const {token} = props;

    const btnHandler = (e, id) => {
        e.preventDefault();
        const name = e.target.getAttribute('name')
        if (name == 'delete') return deleteHandler(id);
        if (name == 'update') Router.push(`posts/update/${id}`);
    }

    const deleteHandler = async id => {
        const ask = confirm('delete data ?')
        if (ask) {
            await fetch(`/api/posts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const postFiltered = postsData.filter(post => {
                return post.id !== id && post;
            })
            setpostsData(postFiltered)
        }
    }

    return (
        <div>
            <h1>Post News</h1>
            <Nav />
            {
                postsData.map(post => {
                    return (
                        <div style={{ maxWidth: '500px', border: '1px solid grey', margin: '10px auto', padding: '3px 7px' }} key={post.id}>
                            <h3 style={{marginTop: '2px'}}>{post.title}</h3>
                            <button onClick={e => btnHandler(e, post.id)} name="delete" style ={{backgroundColor: 'lightgrey', float: 'right', border: 'none', padding: '5px', borderRadius: '7px'}}>Delete</button>
                            <button onClick={e => btnHandler(e, post.id)} name="update" style ={{backgroundColor: 'lightgreen', float: 'right', border: 'none', padding: '5px', borderRadius: '7px', marginRight: '4px'}}>Update</button>
                            <p style={{ fontSize: '12px' }}>{post.content}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
