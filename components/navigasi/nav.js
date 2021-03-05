import Router from 'next/router';
import Link from 'next/link'
import { memo } from 'react'
import { CartFill, HeartFill } from 'react-bootstrap-icons';

const Nav = () => {
    const searchHandler = e => {
        e.preventDefault()
        const input = document.getElementById('search')
        const keyword = `s=${input.value.replace(/ /g, "_")}`
        Router.push(`/pencarian/${keyword}`)
    }

    return (
        <>
            <div style={{ display: 'flex',padding: '10px', position: 'fixed', width: '100%', background: 'white' }}>
                <Link href="/"><h6 className="float-left" style={{flex:'1', margin: '5px 0', cursor: 'pointer'}}>Jwallin</h6></Link>
                <div className="float-right" style={{flex:'2', display: 'flex'}}>
                    <form style={{flex:'1'}} onSubmit={e=>searchHandler(e)}>
                        <input type="text" id="search" placeholder="Search in Jwallin" />
                    </form>
                    <div style={{marginLeft: '10px', marginTop: '10px'}}>
                        <Link href="/favorit"><HeartFill color='#be9b7b' /></Link>&nbsp;&nbsp;
                        <Link href="/keranjang"><CartFill color='#be9b7b' /></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Nav)