import { memo, useState } from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import Link from 'next/link';
import { unauthPage } from "../../middleware/authrizationPage";
import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import Alert from "../../components/alert";

export const getServerSideProps: GetServerSideProps = async (context) => {
    await unauthPage(context);
    return {props: {}}
}

type dataReg = { email_user: string, password_user: string }
type statusLogin = {status: number, text: string}

const index = (): JSX.Element => {
    const [fields, setfields] = useState<dataReg>(null)
    const [status, setstatus] = useState<statusLogin>(null)

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
        try {
            const loginReq = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            })
            if(loginReq.ok) {
                setstatus({text: 'success, redirecting...', status: loginReq.status})
                const loginRes = await loginReq.json()
                Cookie.set('token', loginRes.data.token)
                Cookie.set('username', loginRes.data.username)
                Cookie.set('id_user', loginRes.data.id_user)
                localStorage.clear()
                dispatch({type: 'ID_USER', payload: loginRes.data.id_user})
                Router.push('/')
            }
            else if (loginReq.status === 401) setstatus({text: 'Email or Password is incorrect', status: loginReq.status})
            else setstatus({text: 'Error from server, please try again in 10 minutes', status: loginReq.status})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container" style={{padding: '10px'}}>
            <h4 className="title">Jwallin</h4>
            <form onSubmit={(e) => loginHandler(e)}>
                <input type='email' name='email_user' onChange={fieldsHandler} placeholder='Email' /><br />
                <input type='password' name='password_user' onChange={fieldsHandler} placeholder='Password' /><br />
                <button type='submit'>Login</button>
            </form>
            <p style={{textAlign: 'center'}}>Don't have account ? <Link href="/register">Register Here</Link></p>
            {status && <Alert status={status.status} text={status.text} />}
        </div>
    )
}

export default memo(index)