import { getReq } from '../../function/API';
import { memo, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Cookie from 'js-cookie';
import {CartNav, FavNav, HomeNav} from "./childNav"
import SearchBox from '../pencarian/searchBox';
import { GlobalState, StylesDictionary } from '../../type';

const Nav = (): JSX.Element => {
    const { page }: GlobalState = useSelector((state: RootStateOrAny) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        const getId = Cookie.get("id_user");
        const token = Cookie.get("token");

        loadData(getId, token)
    }, [])

    const loadData = async (id: string|number, token: string): Promise<void> => {
        if (id) {
            const cartData = localStorage.getItem('cart_data');
            if (cartData) dispatch({ type: 'CART', payload: JSON.parse(cartData).length });
            else {
                await getReq('cart', id, token).then((res: any[]) => {
                    localStorage.setItem('cart_data', JSON.stringify(res));
                    dispatch({ type: 'CART', payload: res.length });
                })
            }
        }
    }

    return (
        <div className="row" style={style.nav}>
            <div className="col" style={{marginTop: '-20px'}}>
                <div className="row">
                    <SearchBox flex={1} />&nbsp;&nbsp;
                    <div className="center-xy">
                        {page !== '/' && <><HomeNav />&nbsp;&nbsp;</>}
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

const style: StylesDictionary = {
    nav: {
        zIndex: 1,
        position: 'fixed',
        width:'100%',
        background: 'white',
        margin: '0',
        padding: '7px 0 0 5px',
        height: '60px',
    }
}