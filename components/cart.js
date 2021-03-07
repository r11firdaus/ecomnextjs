import Router from "next/router"
import { memo, useEffect, useState } from "react"
import { getReq } from '../function/API'

const Cart = (props) => {
    const [cart, setcart] = useState([])
    const [all, setall] = useState(false)
    let arr = []

    useEffect(async () => {
        const { res } = await getReq('cart', props.id_userMe, props.token)
        let newRes = [];
        await res.map(data => {
            if (data.total > data.stok_barang) data.total = data.stok_barang
            if (data.total == 0) data.checked = 0
            newRes.push(data)
        })
        setcart(newRes)
    }, [])

    const selectHandlerAll = (value) => {
        const newItems = [...cart]; // clone the array 
        newItems.map((item, index) => {
            if (newItems[index]['stok_barang'] > 0) {
                newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
            }
        });
        setcart(newItems); // set new state
        setall(!value) // true or false
    }

    // const sellerClick = async (e, id) => {
    //     const parentVal = e.target.checked
    //     const child = document.getElementsByName(id)
    //     for (let i = 0; i < child.length; i++) {
    //         child[i].checked = parentVal
    //     }
    // }

    const childClick = (index, value) => {
        const checked = parseInt(value)
        const newItems = [...cart]; // clone the array
        if (newItems[index]['stok_barang'] != 0) {
            if (checked == "1") { // if checked true
                newItems[index]['checked'] = "0"
                setall(false)
            } else {
                newItems[index]['checked'] = "1" // set the new value
                let chkall = []
                newItems.map(item => {
                    chkall.push(item.checked)
                })
                if (!chkall.includes("0"|0)) setall(true)
            }
            setcart(newItems); // set new state
        }
    }

    const quantityHandler = (action, index) => {
        const newItems = [...cart]; // clone the array 
        let currentQty = newItems[index]['total'];
        let maxQty = newItems[index]['stok_barang'];

        if (newItems[index]['stok_barang'] != 0) {
            if (action == 'more') {
                newItems[index]['total'] = currentQty < maxQty && currentQty + 1;
            } else if (action == 'less') {
                newItems[index]['total'] = currentQty > 1 && currentQty - 1;
            }
        }

        setcart(newItems); // set new state
    }

    const subtotalPrice = () => {
        if (cart) {
            return cart.reduce((sum, item) => sum + (item.checked == 1 ? item.total * item.harga_barang : 0), 0);
        }
        return 0;
    }


    const nextHandler = e => {
        e.preventDefault()
        const check = document.getElementsByTagName('input')
        let fill = []
        for (let i = 0; i < check.length; i++) {
            fill.push(check[i].checked)
        }
        fill.includes(true) ? alert('lanjut !') : console.log('belum boleh')
    }

    return (<>
        <div style={{ marginBottom: "4rem" }}>
            {cart && cart.map((item, i) => {
                return (
                    <div className="card" style={{ padding: '7px 10px', margin: '0 10px' }} key={i}>
                        {
                            arr.includes(item.id_seller) ? null : arr.push(item.id_seller) &&
                                <>
                                    <div style={{ display: 'flex' }}>
                                        {/* <input type="checkbox" id={item.id_seller} onClick={(e) => sellerClick(e, item.id_seller)} style={{ marginTop: '3px' }} /> */}
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
                                style={{ marginTop: '18px' }}
                                checked={item.checked == "0" ? false:true}
                            />
                            <div>
                                <a href="#" style={{ marginBottom: '-5px', fontSize: '13px' }}>{item.nama_barang}</a><br />
                                <strong style={{ fontSize: '13px' }}>Rp. {item.harga_barang}</strong><br />
                            </div>
                        </div>
                        {/* <input type="text" placeholder="add notes..." style={{ fontSize: '12px', border: '1px 0', padding: '3px 5px', width: '70%' }} /> */}
                        <div className="card-action" style={{ marginTop: '10px' }}>
                            <div className="float-left">
                                <button className="button-primary-text button-small" style={{ padding: '0', fontSize: '8px' }}>+ Favourite</button>
                                <button className="button-primary-text button-small" style={{ padding: '0', fontSize: '8px' }}>Hapus</button>
                            </div>
                            <div className="float-right" style={{ display: 'flex' }}>
                                <button onClick={() => quantityHandler('less', i)} className="button-primary-outline button-small">-</button>
                                <p style={{ margin: '4px' }}>{item.total}</p>
                                <button onClick={() => quantityHandler('more', i)} className="button-primary-outline button-small">+</button>
                            </div>
                        </div>
                    </div>
                )
            })
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
                        onClick={() => selectHandlerAll(all)}
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
    </>)
}

export default memo(Cart)