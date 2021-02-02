import Router from "next/router"
import { memo, useEffect, useState } from "react"
import { getReq, postReq, putReq } from "../function/API"

const FormBarang = props => {
    const [namaSubCat, setnamaSubCat] = useState([])
    const [field, setfield] = useState({
        id_user: props.id_userMe,
        nama_barang: '',
        harga_barang: '',
        stok_barang: '',
        nama_subcategory: ''
    })

    useEffect(async () => {
        const { res } = await getReq('barang/subcategory', '', '')
        if (props.id_barang && props.token) {
            await getReq('barang', props.id_barang, props.token)
                .then(async res => {
                    await res.res.id_user == props.id_userMe ?
                        setfield(res.res) : Router.push('/')
                })
        }
        setnamaSubCat(res)
    }, [])

    const onChangeHandler = e => {
        const name = e.target.getAttribute('name')
        setfield({
            ...field,
            [name]: e.target.value
        })
    }

    const submitHandler = async e => {
        e.preventDefault()
        props.id_barang ?
        await putReq('barang/update', props.id_barang, props.token, field).then(res => console.log(res)):
        await postReq('barang/create', props.token, field).then(res => console.log(res))
        console.log(field)
        Router.push(`/profil/${props.id_userMe}`)
    }

    return (<>
        <form className="card" onSubmit={e => submitHandler(e)}>
            <p>Name</p>
            <input type="text" value={field.nama_barang} onChange={e => onChangeHandler(e)} name="nama_barang" placeholder="Nama Barang" required /><br />
            <p>Price</p>
            <input type="number" value={field.harga_barang} onChange={e => onChangeHandler(e)} name="harga_barang" placeholder="Harga" required /><br />
            <p>Stock</p>
            <input type="number" value={field.stok_barang} onChange={e => onChangeHandler(e)} name="stok_barang" placeholder="Stok" required /><br />
            <p>Category</p>
            <select name="nama_subcategory" onChange={e => onChangeHandler(e)} required>
                <option value="" disabled>Choose Category</option>
                {
                    namaSubCat.map(sub => (<>
                        <option
                            value={sub.nama_subcategory}
                            key={sub.id_subcategory}
                            selected={sub.nama_subcategory == field.nama_subcategory ? true : false}
                        >{sub.nama_subcategory}</option>
                    </>))
                }
            </select><br />
            <button type='submit' className="show-modal button-primary">Proceed</button>
        </form>

        {/* <div class="modal-mask" style={{display: modal ? 'block':'none'}}>
            <div class="modal" style={{display: modal ? 'block':'none'}}>
                <div class="modal-head">
                    <p class="modal-title">Modal Example</p>
                </div>
                <div class="modal-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto culpa expedita totam aperiam, aliquid, consectetur!</p>
                </div>
                <div class="modal-footer">
                    <button class="button-primary" onClick={e=>submitHandler(e)}>Save</button>
                </div>
            </div>
        </div> */}
    </>)

}

export default memo(FormBarang)