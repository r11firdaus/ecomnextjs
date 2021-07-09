import { useState } from "react";
import Link from 'next/link'
import Router from "next/router";

type dataReg = { email_user: string, password_user: string }

export default function index(): JSX.Element {
    const [fields, setfields] = useState<dataReg>(null)
    const [status, setstatus] = useState<string>(null)

    const fieldsHandler = (e: any): void => {
        // coba cara lain    
        const name = e.target.getAttribute('name');
        setfields({
            ...fields,
            // diberi kurung siku agar bisa menggunakan variable sbg key object yg dinamis
            [name]: e.target.value
        });
    }

    const registerHandler = async (e: any): Promise<void> => {
        e.preventDefault();
        const registerReq = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                // pake content type biar backend tahu yg dikirim json
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        if (registerReq.ok) {
            setstatus(registerReq.statusText);
            await registerReq.json()
            setstatus('success')
            Router.push('/login')
        }
    }

    return (
        <div className="container" style={{padding: '10px'}}>
        <h4 className="title">Jwallin</h4>
            <form onSubmit={registerHandler}>
                <input type='email' name='email_user' onChange={fieldsHandler} placeholder='Email' /><br />
                <input type='password' name='password_user' onChange={fieldsHandler} placeholder='Password' /><br />
                <button type='submit'>Register</button>
            </form>
            <p>already have an account ? <Link href="/login">Login Here</Link></p>
            <p>{status}</p>
        </div>
    )
}