import { useState } from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import Link from 'next/link';
import { unauthPage } from "../../middleware/authrizationPage";

export async function getServerSideProps(context) {
    await unauthPage(context);

    return {props: {}}
}

export default function index() {
    const [fields, setfields] = useState({email_user: '', password_user: ''})
    const [status, setstatus] = useState(true)

    const fieldsHandler = e => {
        const name = e.target.getAttribute('name');
        setfields({
            ...fields,
            [name]: e.target.value
        });
    }

    const loginHandler = async e => {
        e.preventDefault();
        setstatus('loading...')
        const loginReq = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        if(!loginReq.ok) return setstatus(false)
        const loginRes = await loginReq.json()
        Cookie.set('token', loginRes.token)
        Cookie.set('id_user', loginRes.id_user)
        setstatus('success, redirecting...')
        Router.push('/barang')
    }

    const alert = () => {
        return ( !status &&
            <p class="alert alert-danger">Email atau Password salah</p>
        )
    }

    return (
        <div style={{padding: '20px 10px'}}>
            <h4 style={{margin: '20px, auto'}}>Login</h4>
            {alert()}
            <form className="form-control" onSubmit={loginHandler} style={{maxWidth: '500px', margin: '0 auto'}}>
                <input type='email' name='email_user' onChange={fieldsHandler} placeholder='Email' /><br />
                <input type='password' name='password_user' onChange={fieldsHandler} placeholder='Password' /><br />
                <button type='submit'>Login</button>
            </form>
            <p style={{textAlign: 'center'}}>Don't have account ? <Link href="/register">Register Here</Link></p>
            <p>{status}</p>
        </div>
    )
}
