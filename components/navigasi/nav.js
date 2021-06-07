import { getReq } from '../../function/API';
import Link from 'next/link';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookie from 'js-cookie';
import CartNav from './childTopNav/CartNav';
import FavNav from './childTopNav/FavNav';
import SearchBox from '../pencarian/searchBox';

const Nav = () => {
    const dispatch = useDispatch();

    useEffect(async () => {
        const getId = Cookie.get("id_user");
        const token = Cookie.get("token");

        if (getId) {
            const cartData = localStorage.getItem('cart_data');
            if (cartData) dispatch({ type: 'CART', payload: JSON.parse(cartData).length });
            else {
                const { res } = await getReq('cart', getId, token);
                localStorage.setItem('cart_data', JSON.stringify(res));
                dispatch({ type: 'CART', payload: res.length });
            }
        }
    }, [])

    return (
        <div style={{ padding: '10px', width: '100%', position: 'fixed', background: 'white', display: 'flex', zIndex: '2' }}>
            <Link href="/"><h6 className="float-left" style={{ flex: '1', margin: '5px 0', cursor: 'pointer' }}>Jwallin</h6></Link>
            <div className="float-right" style={{ flex: '2', display: 'flex' }}>
                <SearchBox flex={1} />
                <div style={{ marginLeft: '10px', marginTop: '10px', display: 'flex' }}>
                    <FavNav />&nbsp;&nbsp;
                    <CartNav />
                </div>
            </div>
        </div>
    )
}
export default memo(Nav)