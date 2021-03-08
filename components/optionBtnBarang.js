import Router from "next/router";
import { memo, useCallback, useState } from "react";
import { deleteReq, getReq, postReq } from "../function/API";
import Cookie from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";

const optionBtnBarang = (props) => {
    const [modal, setmodal] = useState({ show: false, id: 0, nama: '', closeOnly: false })
    const myprops = props.data
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const updateHandler = (e, id) => {
        e.preventDefault()
        Router.push(`/barang/update/${id}`)
    }

    const ask = (e, id, nama) => {
        e !== '' && e.preventDefault()
        id !== '' ? setmodal({ show: true, id, nama, closeOnly: false }) : setmodal({...modal, closeOnly: true, nama, show: true})
    }

    const deleteHandler = async (e) => {
        e.preventDefault()
        const {res} = await deleteReq('barang/delete', modal.id, props.token)
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
                dispatch({type: 'CART', payload: cart + 1})
            }
        } else ask('', '', 'Out of stock!')
    }

    const modalComp = () => (
        <div className="modal-mask" style={{ display: modal.show ? 'block' : 'none' }}>
            <div className="modal" style={{ display: modal.show ? 'block' : 'none' }}>
                <div className="modal-body">
                    <p>{modal.nama}</p>
                </div>
                <div className="modal-footer">
                    {!modal.closeOnly &&
                        <button className="button-primary button-small mini-btn" onClick={e => deleteHandler(e)}>Delete</button>
                    }
                    <button className="button-primary-outline button-small mini-btn" onClick={e => setmodal({ ...modal, show: false })}>Close</button>
                </div>
            </div>
        </div>
    )

    return (<>
        <div className="card-action" style={props.detail && { display: 'flex' }} >
            <button
                className="button-small button-primary mini-btn"
                onClick={props.add ? (e) => addToCartHandler(e, myprops.id_barang) : (e) => updateHandler(e, myprops.id_barang)}
            >{props.add ? '+ To Cart' : 'Update'}</button>
            <button
                className="button-small button-outline mini-btn"
                onClick={props.add ? (e) => null : (e) => ask(e, myprops.id_barang, `Delete ${myprops.nama_barang}?`)}
            >{props.add ? '+ To Favourite' : 'Delete'}</button>
        </div>
        {modalComp()}
    </>)
}

export default memo(optionBtnBarang)
