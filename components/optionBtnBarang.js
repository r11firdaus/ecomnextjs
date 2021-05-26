import Router from "next/router";
import Modal from './modal'
import { memo, useState } from "react";
import { deleteReq, getReq, postReq } from "../function/API";
import Cookie from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";

const optionBtnBarang = (props) => {
    const [modal, setmodal] = useState({show: false, message: '', cancelOnly: false, function: null})
    const myprops = props.data
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const updateHandler = (e, id) => {
        e.preventDefault()
        Router.push(`/barang/update/${id}`)
    }

    const ask = (e, id, nama) => {
        e !== '' && e.preventDefault()
        if (id !== '') { //if has id to process
            setmodal({show: true, message: `Delete ${nama}?`, cancelOnly: false, function: (e)=>deleteHandler(e, id)})
        } else  setmodal({...modal, cancelOnly: true, message: nama, show: true})
    }

    const deleteHandler = async (e,id) => {
        e.preventDefault()
        const {res} = await deleteReq('barang/delete', id, myprops.token)
        Router.reload()
    }

    const addToCartHandler = async (e, id) => {
        e.preventDefault();
        const iduser = Cookie.get('id_user')
        const tokenuser = Cookie.get('token')
        if (!iduser | !tokenuser) Router.push('/login')

        const { res } = await getReq('barang', id, '')
        if (res.stok_barang > 0) {
            let already = false
            await getReq('cart', iduser, tokenuser)
            .then(res => {
                for (let i = 0; i < res.res.length; i++) {
                    if (id == res.res[i].id_barang) {
                        already = true
                        break;
                    }
                }
            })
            if (already) ask('', '', 'Already Added!')
            else {
                await postReq('cart/add', tokenuser, {
                    id_user: iduser,
                    id_barang: id,
                    total: 1,
                }).then(res => ask('', '', 'Added to Cart!'))
                localStorage.setItem('cart_length', cart + 1)
                dispatch({type: 'CART', payload: cart + 1})
            }
        } else ask('', '', 'Out of stock!')
    }

    return (<>
        <div className="card-action" style={props.detail && { display: 'flex' }} >
            <button
                className="button-small button-primary mini-btn"
                onClick={props.add ? (e) => addToCartHandler(e, myprops.id_barang) : (e) => updateHandler(e, myprops.id_barang)}
            >{props.add ? '+ To Cart' : 'Update'}</button>
            <button
                className="button-small button-outline mini-btn"
                onClick={props.add ? (e) => null : (e) => ask(e, myprops.id_barang, myprops.nama_barang)}
            >{props.add ? '+ To Favourite' : 'Delete'}</button>
        </div>
        <Modal data={modal}/>
    </>)
}

export default memo(optionBtnBarang)
