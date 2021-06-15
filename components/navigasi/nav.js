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
        <div className="row" style={style.nav}>
            <div className="col" style={{marginTop: '-20px'}}>
                <div className="row">
                    <SearchBox flex={1} />
                    <div style={{ marginLeft: '10px', marginTop: '13px', display: 'flex' }}>
                        <FavNav />&nbsp;&nbsp;
                        <CartNav />
                    </div>
                </div>
            </div>
            {/* <style jsx>
                {`
                    .row {backdrop-filter: blur(7px);}
                `}
            </style> */}
        </div>
    )
}
export default memo(Nav)

const style = {
    nav: {
        zIndex: '2',
        position: "fixed",
        width:'100%',
        background: 'white',
        margin: "0",
        padding: "7px 0 0 5px",
        height: "60px",
    }
}