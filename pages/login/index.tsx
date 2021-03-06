import { useState } from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import Link from 'next/link';
import { unauthPage } from "../../middleware/authrizationPage";
import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";

export const getServerSideProps: GetServerSideProps = async (context) => {
    await unauthPage(context);
    return {props: {}}
}

type dataReg = { email_user: string, password_user: string }

export default function index(): JSX.Element {
    const [fields, setfields] = useState<dataReg>(null)
    const [status, setstatus] = useState<string>(null)

    const dispatch = useDispatch()

    const fieldsHandler = (e: any): void => {
        const name = e.target.getAttribute('name');
        setfields({
            ...fields,
            [name]: e.target.value
        });
    }

    const loginHandler = async (e: any): Promise<void> => {
        e.preventDefault();
        setstatus('loading...')
        try {
            const loginReq = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            })
            if(!loginReq.ok) return setstatus(loginReq.statusText)
            const loginRes = await loginReq.json()
            Cookie.set('token', loginRes.data.token)
            Cookie.set('username', loginRes.data.username)
            Cookie.set('id_user', loginRes.data.id_user)
            localStorage.clear()
            dispatch({type: 'ID_USER', payload: loginRes.data.id_user})
            setstatus('success, redirecting...')
            Router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container" style={{padding: '10px'}}>
            <h4 className="title">Jwallin</h4>
            <form onSubmit={loginHandler}>
                <input type='email' name='email_user' onChange={fieldsHandler} placeholder='Email' /><br />
                <input type='password' name='password_user' onChange={fieldsHandler} placeholder='Password' /><br />
                <button type='submit'>Login</button>
            </form>
            <p style={{textAlign: 'center'}}>Don't have account ? <Link href="/register">Register Here</Link></p>
            <p>{status}</p>
        </div>
    )
}
