import Router from "next/router";
import { memo, useState } from "react";
import { deleteReq } from "../function/API";

const optionBtnBarang = (props) => {
    const [modal, setmodal] = useState({show:false, id: 0, nama: ''})
    const myprops = props.data

    const updateHandler = (e, id) => {
        e.preventDefault()
        Router.push(`/barang/update/${id}`)
    }

    const ask = (e, id, nama) => {
        e.preventDefault()
        setmodal({show: true, id, nama})
    }

    const deleteHandler = async (e) => {
        e.preventDefault()
        const {res} = await deleteReq('barang/delete', modal.id, props.token)
        Router.reload()
    }

    return (<>
        <div className="card-action" style={props.detail&&{display: 'flex'}} >
            <button
                className="button-small button-primary"
                style={style.button}
                onClick={props.add ? (e) => null : (e) => updateHandler(e, myprops.id_barang)}
            >{props.add ? '+ To Cart' : 'Update'}</button>
            <button
                className="button-small button-outline"
                style={style.button}
                onClick={props.add ? (e) => null : (e) => ask(e, myprops.id_barang, myprops.nama_barang)}
            >{props.add ? '+ To Favourite' : 'Delete'}</button>
        </div>

        <div className="modal-mask" style={{display: modal.show ? 'block':'none'}}>
            <div className="modal" style={{display: modal.show ? 'block':'none'}}>
                <div className="modal-body">
                    <p>Delete '{modal.nama} ?'</p>
                </div>
                <div className="modal-footer">
                    <button className="button-primary button-small" onClick={e=>deleteHandler(e)}>Delete</button>
                    <button className="button-primary-outline button-small" onClick={e=>setmodal({...modal,show: false})}>Cancel</button>
                </div>
            </div>
        </div>
    </>)
}

export default memo(optionBtnBarang)

const style = {
    button: {
        fontSize: '10px',
        padding: '0 5px',
        margin: '3px',
        width: '100%'
    }
}
