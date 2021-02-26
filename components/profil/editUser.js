import Router from "next/router"
import { memo, useEffect, useState } from "react"
import { getReq, putReq } from "../../function/API"

const EditUser = props => {
    const [field, setfield] = useState({})
    const [provinsi, setprovinsi] = useState([])
    const [kota, setkota] = useState([])
    const [kecamatan, setkecamatan] = useState([])
    const [loaded, setloaded] = useState(false)

    useEffect(async () => {
        const req = await fetch('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
        const res = await req.json()
        setprovinsi(res.provinsi)
        if (props.id_userMe && props.token) {
            await getReq('user', props.id_userMe, props.token)
                .then(async res => {
                    await res.res.id_user == props.id_userMe ?
                        setfield(res.res) : Router.back()
                    setloaded(true)
                })
        }
    }, [])

    const submitHandler = async e => {
        e.preventDefault()
        const nama_user = document.getElementById('nama_user').value
        const alamat_user = document.getElementById('alamat_user').value
        const kecamatan_user = document.getElementById('kecamatan_user').value
        const kota_user = document.getElementById('kota_user').value
        const provinsi_user = document.getElementById('provinsi_user').value
        const telepon_user = document.getElementById('telepon_user').value
        const newField = {
            email_user: field.email_user,
            password_user: field.password_user,
            username: field.username,
            nama_user,
            alamat_user,
            kecamatan_user,
            kota_user,
            provinsi_user,
            telepon_user,
        }
        await putReq('user/update', props.id_userMe, props.token, newField).then(res => null)
        Router.back()
    }

    const provinsiHandler = async () => {
        const prov = document.getElementById('provinsi_user')
        const provId = prov.options[prov.selectedIndex].id
        const req = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${provId}`)
        const res = await req.json()
        setkota(res.kota_kabupaten)
        const city = document.getElementById('kota_user')
        city.disabled = false
    }

    const kotaHandler = async () => {
        const kota = document.getElementById('kota_user')
        const kotaId = kota.options[kota.selectedIndex].id
        const req = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${kotaId}`)
        const res = await req.json()
        setkecamatan(res.kecamatan)
        const kecamatan = document.getElementById('kecamatan_user')
        kecamatan.disabled = false
    }

    const showComponent = () => {
        if (loaded) {
            return (
            <form className="card" onSubmit={e => submitHandler(e)}>
                <p>Name</p>
                <input type="text" defaultValue={field.nama_user} id="nama_user" placeholder="Stok" required /><br />
                <p>Address</p>
                <input type="text" defaultValue={field.alamat_user} id="alamat_user" placeholder="Stok" required /><br />
                <p>Phone</p>
                <input type="number" defaultValue={field.telepon_user} id="telepon_user" placeholder="Stok" required /><br />
                <select id="provinsi_user" onChange={() => provinsiHandler()} required>
                    <option value="" disabled>Choose Province</option>
                    {
                        provinsi.map(sub => (<>
                            <option
                                value={sub.nama}
                                key={sub.id}
                                id={sub.id}
                                selected={sub.nama == field.provinsi_user ? true : false}
                            >{sub.nama}</option>
                        </>))
                    }
                </select><br />
                <select id="kota_user" onChange={() => kotaHandler()} disabled required>
                    <option value="" selected={field.kota_user === '' ? true : false} disabled>Choose City</option>
                    {
                        kota.map(sub => (<>
                            <option
                                value={sub.nama}
                                key={sub.id}
                                id={sub.id}
                                selected={sub.nama == field.kota_user ? true : false}
                            >{sub.nama}</option>
                        </>))
                    }
                </select><br />
                <select id="kecamatan_user" disabled required>
                    {
                        kecamatan.map(sub => (<>
                            <option
                                value={sub.nama}
                                key={sub.id}
                                selected={sub.nama == field.kecamatan_user ? true : false}
                            >{sub.nama}</option>
                        </>))
                    }
                </select><br />
                <button type='submit' className="show-modal button-primary">Proceed</button>
            </form>
        )} else return <h5>Loading...</h5>
    }

return (<>
        {showComponent()}
    </>)

}

export default memo(EditUser)