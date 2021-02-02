import Link from 'next/link'
import Cookie from 'js-cookie'
import Router from 'next/router'
import { memo, useEffect, useState } from 'react'

const Nav = (props) => {
    const [id_user, setid_user] = useState(null)

    useEffect(() => {
        const getId = Cookie.get("id_user")
        getId && setid_user(getId)
    }, [])
    
    return (
        <>
            <div style={{ display: 'flex',padding: '10px' }}>
                <h6 className="float-left" style={{flex:'1', margin: '5px 0'}}>Jwallin</h6>
                <div className="float-right" style={{flex:'2', display: 'flex'}}>
                    <form style={{flex:'1'}}>
                        <input type="text" placeholder="Search in Jwallin" />
                    </form>
                    <div style={{marginLeft: '10px', marginTop: '7px'}}>
                        <Link href="/keranjang">Cart</Link>
                        <Link href="/favorit"> Fav</Link>
                    </div>
                </div>
            </div>
            <div style={{justifyContent: 'space-around', display: 'flex'}}>
                <Link href="/">Home</Link>
                <Link href="/kategori">Shop</Link>
                <Link href="/pesan">Chat</Link>
                {
                    id_user ?
                    <a href={`/profil/${id_user}`}>Profile</a>:
                    <Link href="/login">Login</Link>
                
                }
            </div>
        </>
    )
}

export default memo(Nav)