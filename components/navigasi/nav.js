import Router from 'next/router';
import {getReq} from '../../function/API'
import Link from 'next/link'
import { memo, useEffect } from 'react'
import { CartFill, HeartFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../function/socket';
import Cookie from 'js-cookie'

const Nav = () => {
    const { id_user, cart } = useSelector(state => state)
    const dispatch = useDispatch();
    
    useEffect(async() => {
        const getId = Cookie.get("id_user")
        const token = Cookie.get("token")
        if (getId && id_user === null) dispatch({ type: 'ID_USER', payload: getId })

        if (getId) {
            const cartLength = localStorage.getItem('cart_length');
            if (cartLength) dispatch({ type: 'CART', payload: parseInt(cartLength) })
            else {
                const {res} = await getReq('cart', getId, token)
                localStorage.setItem('cart_length', res.length)
                dispatch({ type: 'CART', payload: res.length })
            }
        }

    }, [])

    const searchHandler = e => {
        e.preventDefault()
        const input = document.getElementById('search')
        const keyword = `s=${input.value.replace(/ /g, "_")}`
        Router.push(`/pencarian/${keyword}`)
    }

    return (
        <>
            <div style={{ padding: '10px', position: 'fixed', width: '100%', background: 'white', display: 'flex',zIndex: '2' }}>
                <Link href="/"><h6 className="float-left" style={{flex:'1', margin: '5px 0', cursor: 'pointer'}}>Jwallin</h6></Link>
                <div className="float-right" style={{flex:'2', display: 'flex'}}>
                    <form style={{flex:'1'}} onSubmit={e=>searchHandler(e)}>
                        <input type="text" id="search" placeholder="Search in Jwallin" />
                    </form>
                    <div style={{marginLeft: '10px', marginTop: '10px', display: 'flex'}}>
                        <Link href="/favorit"><HeartFill color='#be9b7b' /></Link>&nbsp;&nbsp;
                        <Link href="/keranjang"><div style={{display: 'flex'}}>
                            <CartFill color='#be9b7b' />
                            {cart > 0 &&
                            <div className="baloon-new">
                                <p className="txt-baloon">{cart}</p>
                            </div>
                        }
                        </div></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Nav)