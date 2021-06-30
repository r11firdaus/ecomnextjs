import { memo, useEffect, useState } from "react"
import Router from "next/router"
import Modal from './modal'
import { getReq } from '../function/API'
import Cookie from 'js-cookie'
import { Heart, Trash } from "react-bootstrap-icons"

const Cart = (props) => {
    const [cart, setcart] = useState([]);
    const [all, setall] = useState(false);
    const [modal, setmodal] = useState({ show: false, message: '', cancelOnly: false });
    const [loaded, setloaded] = useState(false)
    let arr = [];

    useEffect(() => {
        const id_user = Cookie.get('id_user');
        props.id_userMe === null | undefined && Router.push('/login');
        const cartData = localStorage.getItem('cart_cart');
        cartData && id_user == props.id_userMe ? setcart(JSON.parse(cartData)) : getData();
        setloaded(true)
    }, [])

    const getData = async () => {
        const { res } = await getReq('cart', props.id_userMe, props.token);
        let newRes = [];
        await res.map(data => {
            if (data.total > data.stok_barang) data.total = data.stok_barang;
            if (data.total == 0) data.checked = false;
            newRes.push(data);
        })
        setcart(newRes);
        localStorage.setItem('cart_data', JSON.stringify(newRes));
    }

    const selectHandlerAll = () => {
        const seller = document.getElementsByName('sellerChk');
        let sellers = Array.from(seller);
        const newItems = [...cart]; // clone the array 
        newItems.map((item, index) => {
            if (newItems[index]['stok_barang'] > 0) {
                newItems[index]['checked'] = !all; // set the new value 
            }
        });
        sellers.map(sell => sell.checked = !all);
        setcart(newItems); // set new state
        setall(!all); // true or false
    }

    const sellerClick = async (e, id) => {
        const parentVal = e.target.checked;
        const newItems = [...cart]; // clone the array 

        newItems.map((item, index) => {
            if (newItems[index].stok_barang > 0 && newItems[index].id_seller == id) {
                newItems[index].checked = parentVal; // set the new value 
            }
        });
        setcart(newItems); // set new state
    }

    const childClick = (index, value) => {
        const newItems = [...cart]; // clone the array
        const id_seller = newItems[index]['id_seller'];
        const seller = document.getElementById(id_seller);

        if (newItems[index]['stok_barang'] != 0) {
            if (value) { // if checked true
                newItems[index]['checked'] = false;
                seller.checked = false;
                setall(false);
            } else {
                newItems[index]['checked'] = true; // set the new value
                let chkAll = [];
                let chk = [];
                for (let i = 0; i < newItems.length; i++) {
                    chkAll.push(newItems[i].checked);
                    newItems[i].id_seller == id_seller && chk.push(newItems[i].checked);
                }
                chkAll.includes(false) ? setall(false) : setall(true);
                if (chk.includes(false)) seller.checked = false;
                else seller.checked = true;
            }
            setcart(newItems); // set new state
        }
    }

    const quantityHandler = (action, index) => {
        const newItems = [...cart]; // clone the array 
        let currentQty = newItems[index]['total'];
        let maxQty = newItems[index]['stok_barang'];

        if (newItems[index]['stok_barang'] != 0) {
            if (action == 'more' && currentQty < maxQty) newItems[index]['total'] = currentQty + 1;
            else if (action == 'less' && currentQty > 1) newItems[index]['total'] = currentQty - 1;
        }

        setcart(newItems); // set new state
        localStorage.setItem('cart_data', JSON.stringify(newItems))
    }

    const subtotalPrice = () => {
        if (cart) {
            return cart.reduce((sum, item) => sum + (item.checked ? item.total * item.harga_barang : 0), 0);
        }
        return 0;
    }

    const nextHandler = e => {
        e.preventDefault()
        const check = document.getElementsByTagName('input');
        let fill = [];
        for (let i = 0; i < check.length; i++) {
            fill.push(check[i].checked);
        }
        fill.includes(true) ? alert('lanjut !') : setmodal({ show: true, message: `Please choose 1 to continue.`, cancelOnly: true });
    }

    return (<>
        <div style={{ marginBottom: "4rem" }}>

            {loaded ? cart?.map((item, i) => {
                return (
                    <div className="card" style={{ padding: '7px 10px', margin: '0 10px' }} key={i}>
                        {
                            arr.includes(item.id_seller) ? null : arr.push(item.id_seller) &&
                                <>
                                    <div style={{ display: 'flex' }}>
                                        <input type="checkbox" id={item.id_seller} name="sellerChk" style={{ marginTop: '3px' }} onClick={(e) => sellerClick(e, item.id_seller)} />
                                        <div style={{ display: "flex" }}>
                                            <p style={{ marginBottom: '-5px', fontSize: '13px' }} onClick={() => Router.push(`/profil/${item.id_seller}`)}>{item.nama_user}&nbsp;</p>
                                            <strong style={{ fontSize: '13px' }}>|&nbsp;{item.kota_user}</strong><br />
                                        </div>
                                    </div><hr />
                                </>
                        }

                        <div style={{ display: 'flex' }}>
                            <input
                                type="checkbox"
                                onClick={() => childClick(i, item.checked)}
                                style={{ marginTop: '13px' }}
                                checked={item.checked == "0" ? false : true}
                            />
                            <div>
                                <p style={{ marginBottom: '-5px', fontSize: '13px' }} onClick={() => Router.push(`/barang/${item.id_barang}`)}>{item.nama_barang}</p>
                                <strong style={{ fontSize: '13px' }}>Rp. {item.harga_barang}</strong><br />
                            </div>
                        </div>
                        <div className="card-action" style={{ marginTop: '10px' }}>
                            <div className="float-left" style={{ marginTop: '7px' }}>
                                <Heart size={17} color="#4b3832" />&nbsp;&nbsp;
                                <Trash size={17} color="#4b3832" />
                            </div>
                            <div className="float-right" style={{ display: 'flex' }}>
                                <button onClick={() => quantityHandler('less', i)} className="button-primary-outline button-small">-</button>
                                <p style={{ margin: '4px' }}>{item.total}</p>
                                <button onClick={() => quantityHandler('more', i)} className="button-primary-outline button-small">+</button>
                            </div>
                        </div>
                    </div>
                )
            }) : <div className="dots-4" />
            }
        </div>

        <div style={{ height: '4rem', bottom: '0', width: '100%', borderTop: '1px solid green', position: 'fixed', background: 'white' }}>
            <div className="float-left" style={{ margin: '6px 10px' }}>
                <h6 style={{ fontSize: '12px', margin: '0' }}>Total: </h6>
                <h6 style={{ fontSize: '15px', marginTop: '-13px' }}>Rp.{subtotalPrice()}</h6>
            </div>
            <div className="float-right">
                <div style={{ display: 'flex' }}>
                    <input
                        type="checkbox"
                        onClick={() => selectHandlerAll()}
                        style={{ marginTop: '23px' }}
                        checked={all}
                    />
                    <p style={{ marginTop: '18px' }}>All</p>
                    <button
                        className="button-primary button-small"
                        style={{ margin: '15px 10px' }}
                        onClick={e => nextHandler(e)}
                    >Next</button>
                </div>
            </div>
        </div>
        <Modal data={modal} />
    </>)
}

export default memo(Cart)