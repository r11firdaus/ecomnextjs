import { useState } from "react";
import Link from 'next/link'

export default function index() {
    const [fields, setfields] = useState({
        email_user: '',
        password_user: '',
        nama_user: '',
        telepon_user: ''
    })

    const [status, setstatus] = useState('')

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
        if (fields.email_user === '' && fields.password_user === '' && fields.nama_user === '' && fields.alamat_user === '' && fields.telepon_user) {
            alert('isi semua data')
        }
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
        <div style={{padding: '20px'}}>
            <h4 className="title" style={{margin: '20px auto 50px 10px'}}>Register</h4>
            <form className="form-control" style={{maxWidth: '500px', margin: '0 auto'}} onSubmit={registerHandler}>
                <input type='email' name='email_user' onChange={fieldsHandler} placeholder='Email' required /><br />
                <input type='password' name='password_user' onChange={fieldsHandler} placeholder='Password' required /><br />
                <input type='text' name='nama_user' onChange={fieldsHandler} placeholder='Nama' required /><br />
                <input type='number' name='telepon_user' onChange={fieldsHandler} placeholder='No Telepon' required /><br />
                <button type='submit'>Register</button>
            </form>
            <p style={{textAlign: 'center'}}>already have an account ? <Link href="/login">Login Here</Link></p>
            <p>{status}</p>
        </div>
    )
}