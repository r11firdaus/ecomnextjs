import Router from "next/router"
import { Fragment, memo, useEffect, useState } from "react"
import { getReq, postReq, putReq } from "../function/API"

const FormBarang = props => {
    const submitHandler = async e => {
        e.preventDefault()
        const nama_barang = document.getElementById('nama_barang').value
        const harga_barang = document.getElementById('harga_barang').value
        const stok_barang = document.getElementById('stok_barang').value
        const id_subcategory = document.getElementById('id_subcategory').value
        const status_barang = document.getElementById('status_barang').value
        const berat_barang = document.getElementById('berat_barang').value
        const deskripsi_barang = document.getElementById('deskripsi_barang').value
        const gambar_barang = "https://chelseakrost.com/wp-content/uploads/2018/06/Deskripsiace_Emoji_ios10_large.png"
        const newField = { deskripsi_barang, berat_barang, gambar_barang, status_barang, nama_barang, harga_barang, stok_barang, id_subcategory, id_seller: props.id_user }
        props.field ?
            await putReq('barang/update', props.field.id_barang, props.token, newField) :
            await postReq('barang/create', props.token, newField)

        const barangUserId = localStorage.getItem('barang_user_id');
        props.id_user == barangUserId && localStorage.removeItem('barang_user_id');
        Router.push(`/profil/${props.id_user}`)
    }

    return (<>
        <form className="card" onSubmit={e => submitHandler(e)}>
            <p>Name</p>
            <input type="text" defaultValue={props.field?.nama_barang} id="nama_barang" placeholder="Nama Barang" required /><br />
            <p>Description</p>
            <input type="text" defaultValue={props.field?.deskripsi_barang} id="deskripsi_barang" placeholder="Deskripsi Barang" required /><br />
            <p>Weight (g)</p>
            <input type="number" defaultValue={props.field?.berat_barang} id="berat_barang" placeholder="Berat Barang" required /><br />
            <p>Condition</p>
            <select id="status_barang" required>
                <option value={true} defaultValue={props.field?.status_barang}>New</option>
                <option value={false} defaultValue={props.field?.status_barang}>Second</option>
            </select><br />
            <p>Price</p>
            <input type="number" min="1" defaultValue={props.field?.harga_barang} id="harga_barang" placeholder="Harga" required /><br />
            <p>Stock</p>
            <input type="number" min="1" defaultValue={props.field?.stok_barang} id="stok_barang" placeholder="Stok" required /><br />
            <p>Category</p>
            <select id="id_subcategory" required>
                <option value="" defaultValue={props.field?.nama_subcategory == '' ? true : false} disabled>Choose Category</option>
                {
                    props.subCat.map((sub, index) => (
                        <Fragment key={index}>
                            <option
                                value={sub.id_subcategory}
                                defaultValue={sub.nama_subcategory == props.field?.nama_subcategory ? true : false}
                            >{sub.nama_subcategory}</option>
                        </Fragment>)
                    )
                }
            </select><br />
            <button type='submit' className="show-modal button-primary">Proceed</button>
        </form>
    </>)

}

export default memo(FormBarang)