import { memo, useEffect, useState } from "react"
import { getReq } from '../function/API'

const Cart = (props) => {
    const [cart, setcart] = useState([])
    const [jml, setjml] = useState(0)
    let arr = []
    let totSeller = 0

    useEffect(async () => {
        const { res } = await getReq('cart', props.id_userMe, props.token)
        setcart(res)
    }, [])

    const sellerClick = (e, id) => {
        const parentVal = e.target.checked
        const child = document.getElementsByName(id)
        for (let i = 0; i < child.length; i++) {
            child[i].checked === true && setjml(jml - child[i].accessKey)
            totSeller = parseInt(child[i].accessKey)
            child[i].checked = parentVal
        }
        
        const childName = document.getElementsByTagName('input')
        let boxchk = []
        for (let i = 0; i < childName.length; i++) {
            boxchk.push(childName[i].checked)
        }
        if (parentVal) setjml(jml + totSeller)
        else {
            boxchk.includes(true) ? setjml(jml - totSeller) : setjml(0)
        }
        console.log(totSeller)
    }

    const childClick = (e, total, harga, id) => {
        const childVal = e.target.checked
        const parent = document.getElementById(id)
        const child = document.getElementsByName(id)
        parent.checked = childVal
        let chk = []
        for (let i = 0; i < child.length; i++) {
            chk.push(child[i].checked)
        }
        if (chk.includes(false)) parent.checked = false
        let hasil = total * harga


        const childName = document.getElementsByTagName('input')
        let boxchk = []
        for (let i = 0; i < childName.length; i++) {
            boxchk.push(childName[i].checked)
        }
            
        if (childVal) {
            setjml(jml + hasil)
        } else {
            boxchk.includes(true) ? setjml(jml - hasil) : setjml(0)
        }
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
            {
                cart.map(data => {
                    return (
                        <div className="card" style={{ padding: '7px 10px', margin: '0 10px' }} key={data.id_cart}>
                            {
                                arr.includes(data.id_seller) ? null : arr.push(data.id_seller) &&
                                    <>
                                        <div style={{ display: 'flex' }}>
                                            <input type="checkbox" id={data.id_seller} onClick={(e) => sellerClick(e, data.id_seller)} style={{ marginTop: '3px' }} />
                                            <div style={{ display: "flex" }}>
                                                <p style={{ marginBottom: '-5px', fontSize: '13px' }}>{data.id_seller}&nbsp;</p>
                                                <strong style={{ fontSize: '13px' }}>|&nbsp;Cimahi</strong><br />
                                            </div>
                                        </div><hr />
                                    </>
                            }

                            <div style={{ display: 'flex' }}>
                                <input
                                    type="checkbox"
                                    onClick={(e) => childClick(e, data.total, data.harga_barang, data.id_seller)}
                                    name={data.id_seller}
                                    accessKey={data.harga_barang * data.total}
                                    style={{ marginTop: '18px' }}
                                />

                                <div>
                                    <a href="#" style={{ marginBottom: '-5px', fontSize: '13px' }}>{data.nama_barang}</a><br />
                                    <strong style={{ fontSize: '13px' }}>Rp. {data.harga_barang}</strong><br />
                                </div>
                            </div>
                            {/* <input type="text" placeholder="add notes..." style={{ fontSize: '12px', border: '1px 0', padding: '3px 5px', width: '70%' }} /> */}
                            <div className="card-action" style={{ marginTop: '10px' }}>
                                <div className="float-left">
                                    <button className="button-primary-text button-small" style={{ padding: '0', fontSize: '8px' }}>+ Favourite</button>
                                    <button className="button-primary-text button-small" style={{ padding: '0', fontSize: '8px' }}>Hapus</button>
                                </div>
                                <div className="float-right" style={{ display: 'flex' }}>
                                    <button className="button-primary-outline button-small">-</button>
                                    <p style={{ margin: '4px' }}>{data.total}</p>
                                    <button className="button-primary-outline button-small">+</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        <div style={{height: '4rem', bottom: '0', width: '100%', borderTop: '1px solid green', position: 'fixed', background: 'white'}}>
            <div className="float-left" style={{margin: '6px 10px'}}>
                <h6 style={{ fontSize: '12px', margin: '0'}}>Total: </h6>
                <h6 style={{ fontSize: '15px', marginTop: '-13px'}}>Rp. {jml}</h6>
            </div>
            <button
                className="button-primary button-small float-right"
                style={{margin: '15px 10px'}}
                onClick={e => nextHandler(e)}
            >Next</button>
        </div>
    </>)
}

export default memo(Cart)