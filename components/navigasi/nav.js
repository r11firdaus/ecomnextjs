import Link from 'next/link'
import { memo } from 'react'
import { Cart, Heart } from 'react-bootstrap-icons';

const Nav = (props) => {
    return (
        <>
            <div style={{ display: 'flex',padding: '10px', position: 'fixed', width: '100%', background: 'white' }}>
                <h6 className="float-left" style={{flex:'1', margin: '5px 0'}}>Jwallin</h6>
                <div className="float-right" style={{flex:'2', display: 'flex'}}>
                    <form style={{flex:'1'}}>
                        <input type="text" placeholder="Search in Jwallin" />
                    </form>
                    <div style={{marginLeft: '10px', marginTop: '10px'}}>
                        <Link href="/favorit"><Heart color='green' /></Link>&nbsp;&nbsp;
                        <Link href="/keranjang"><Cart color='green' /></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Nav)