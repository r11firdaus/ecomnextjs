import { useState } from "react";
import Link from 'next/link'

export default function index() {
    const [fields, setfields] = useState({ email: '', password: '' })
    const [status, setstatus] = useState('not login')

    const fieldsHandler = e => {
        // coba cara lain    
        const name = e.target.getAttribute('name');
        setfields({
            ...fields,
            // diberi kurung siku agar bisa menggunakan variable sbg key object yg dinamis
            [name]: e.target.value
        });
    }

    const registerHandler = async e => {
        e.preventDefault();
        const registerReq = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                // pake content type biar backend tahu yg dikirim json
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        if (registerReq.ok) return setstatus(`${registerReq.status}`);

        const registerRes = await registerReq.json()
        setstatus('success')
    }

    return (
        <div className="main">
            <h1 className="title">Register Page</h1>
            <form onSubmit={registerHandler}>
                <input type='email' name='email' onChange={fieldsHandler} placeholder='Email' /><br />
                <input type='password' name='password' onChange={fieldsHandler} placeholder='Password' /><br />
                <button type='submit'>Register</button>
            </form>
            <p>already have an account ? <Link href="/login">Login Here</Link></p>
            <p>{status}</p>
        </div>
    )
}