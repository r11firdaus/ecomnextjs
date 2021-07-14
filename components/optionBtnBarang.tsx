import Router from "next/router";
import Modal from './modal'
import { memo, useState } from "react";
import { deleteReq, getReq, postReq } from "../function/API";
import Cookie from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../type";

const optionBtnBarang = (props: any): JSX.Element => {
    const [modal, setmodal] = useState({show: false, message: '', cancelOnly: false, function: null})
    const myprops = props.data
    const { cart }: GlobalState = useSelector(state => state)
    const dispatch = useDispatch()

    const updateHandler = (e: any, id: string|number) => {
        e.preventDefault()
        Router.push(`/barang/update/${id}`)
    }

    const ask = (e: any, id: string|number, nama: string) => {
        e !== '' && e.preventDefault()
        if (id !== '') { //if has id to process
            setmodal({show: true, message: `Delete ${nama}?`, cancelOnly: false, function: (e)=>deleteHandler(e, id)})
        } else  setmodal({...modal, cancelOnly: true, message: nama, show: true})
    }

    const deleteHandler = async (e: any, id: string|number) => {
        e.preventDefault()
        await deleteReq('barang/delete', id, myprops.token)
        Router.back()
    }

    const addToCartHandler = async (e: any, id: string|number) => {
        e.preventDefault();
        const iduser = Cookie.get('id_user')
        const tokenuser = Cookie.get('token')
        if (!iduser || !tokenuser) Router.push('/login')

        await getReq('barang', id, '').then(async (res: any) => {
            if (res.stok_barang > 0) {
                let already = false
                await getReq('cart', iduser, tokenuser)
                .then((result: any) => {
                    for (let i = 0; i < result.length; i++) {
                        if (id == result[i].id_barang) {
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
                    localStorage.removeItem('cart_data');
                    dispatch({type: 'CART', payload: cart + 1})
                }
            } else ask('', '', 'Out of stock!')
        })
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
