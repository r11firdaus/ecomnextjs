import Router from "next/router"
import { memo, useEffect, useState } from "react"
import { getReq, postReq, putReq } from "../function/API"

const FormBarang = props => {
    const [namaSubCat, setnamaSubCat] = useState([])
    const [field, setfield] = useState({
        id_seller: props.id_userMe,
        nama_barang: '',
        harga_barang: '',
        stok_barang: '',
        id_subcategory: 1
    })

    useEffect(async () => {
        const { res } = await getReq('barang/subcategory', '', '')
        if (props.id_barang && props.token) {
            await getReq('barang', props.id_barang, props.token)
                .then(async res => {
                    await res.res.id_seller == props.id_userMe ?
                        setfield(res.res) : Router.push('/')
                })
        }
        setnamaSubCat(res)
    }, [])

    const submitHandler = async e => {
        e.preventDefault()
        const nama_barang = document.getElementById('nama_barang').value
        const harga_barang = document.getElementById('harga_barang').value
        const stok_barang = document.getElementById('stok_barang').value
        const id_subcategory = document.getElementById('id_subcategory').value
        const newField = {nama_barang, harga_barang, stok_barang, id_subcategory, id_seller: props.id_userMe}
        props.id_barang ?
        await putReq('barang/update', props.id_barang, props.token, newField).then(res => null):
        await postReq('barang/create', props.token, newField).then(res => null)
        Router.push(`/profil/${props.id_userMe}`)
    }

    return (<>
        <form className="card" onSubmit={e => submitHandler(e)}>
            <p>Name</p>
            <input type="text" defaultValue={field.nama_barang} id="nama_barang" placeholder="Nama Barang" required /><br />
            <p>Price</p>
            <input type="number" defaultValue={field.harga_barang} id="harga_barang" placeholder="Harga" required /><br />
            <p>Stock</p>
            <input type="number" defaultValue={field.stok_barang} id="stok_barang" placeholder="Stok" required /><br />
            <p>Category</p>
            <select id="id_subcategory" required>
                <option value="" defaultValue={field.nama_subcategory == '' ? true : false} disabled>Choose Category</option>
                {
                    namaSubCat.map(sub => (<>
                        <option
                            value={sub.id_subcategory}
                            key={sub.id_subcategory}
                            defaultValue={sub.nama_subcategory == field.nama_subcategory ? true : false}
                        >{sub.nama_subcategory}</option>
                    </>))
                }
            </select><br />
            <button type='submit' className="show-modal button-primary">Proceed</button>
        </form>
    </>)

}

export default memo(FormBarang)