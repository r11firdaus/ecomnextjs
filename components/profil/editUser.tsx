import Router from "next/router"
import { memo, useEffect, useState } from "react"
import { getReq, putReq } from "../../function/API"
import { MyIdAndToken, UserData } from "../../type"

const EditUser = (props: MyIdAndToken) => {
    const [field, setfield] = useState<UserData>(null)
    const [provinsi, setprovinsi] = useState([])
    const [kota, setkota] = useState([])
    const [kecamatan, setkecamatan] = useState([])
    const [loaded, setloaded] = useState<boolean>(false)

    useEffect(() => {
        loadData()
    }, [])
    
    const loadData = async (): Promise<void> => {
        if (props.id_user && props.token) {
            const myData = localStorage.getItem('mydata');
            if (myData) setfield(JSON.parse(myData))
            else {
                await getReq('user', props.id_user, props.token).then((res: UserData) => {
                    res.id_user == props.id_user ? setfield(res) : Router.back()
                    localStorage.setItem('mydata', JSON.stringify(res))
                })
            }
        }
    
        const req = await fetch('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
        const res = await req.json()
        setprovinsi(res.provinsi)
        setloaded(true)
    
        const prov = (document.getElementById('provinsi_user') as HTMLSelectElement)
        const provId = prov.options[prov.selectedIndex].id
        provId && await getKota(provId)
    
        const kot = (document.getElementById('kota_user') as HTMLSelectElement)
        const kotId = kot.options[kot.selectedIndex].id
        kotId && await getKecamatan(kotId)

        console.log(provId)
    }

    const getKota = async (provId: string|number) => {
        const req = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${provId}`)
        const res = await req.json()
        setkota(res.kota_kabupaten)
        const kot = (document.getElementById('kota_user') as HTMLSelectElement)
        kot.disabled = false
    }

    const getKecamatan = async (kotId: string|number) => {
        const req = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${kotId}`)
        const res = await req.json()
        setkecamatan(res.kecamatan)
        const kec = (document.getElementById('kecamatan_user') as HTMLSelectElement)
        kec.disabled = false
    }

    const provinsiHandler = () => {
        setloaded(false)
        const prov = (document.getElementById('provinsi_user') as HTMLSelectElement)
        const provId = prov.options[prov.selectedIndex].id
        getKota(provId)
        setloaded(true)
    }

    const kotaHandler = () => {
        setloaded(false)
        const kota = (document.getElementById('kota_user') as HTMLSelectElement)
        const kotaId = kota.options[kota.selectedIndex].id
        getKecamatan(kotaId)
        setloaded(true)
    }

    const submitHandler = async (e: HTMLFormElement) => {
        e.preventDefault()
        const nama_user = (document.getElementById('nama_user')as HTMLInputElement).value
        const alamat_user = (document.getElementById('alamat_user')as HTMLInputElement).value
        const kecamatan_user = (document.getElementById('kecamatan_user')as HTMLInputElement).value
        const kota_user = (document.getElementById('kota_user')as HTMLInputElement).value
        const provinsi_user = (document.getElementById('provinsi_user')as HTMLInputElement).value
        const telepon_user = (document.getElementById('telepon_user')as HTMLInputElement).value
        const newField = {
            email_user: field.email_user,
            password_user: field.password_user,
            nama_user,
            alamat_user,
            kecamatan_user,
            kota_user,
            provinsi_user,
            telepon_user,
        }
        await putReq('user/update', props.id_user, props.token, newField).then(res => null)
        localStorage.setItem('mydata', JSON.stringify({...newField, id_user: props.id_user}))
        Router.back()
    }

    return (<>
            {loaded ?
                <form className="card" onSubmit={(e: any) => submitHandler(e)}>
                <p>Name</p>
                <input type="text" defaultValue={field.nama_user} id="nama_user" placeholder="Name" required /><br />
                <p>Phone (Format: +621212121212)</p>
                <input type="tel" defaultValue={field.telepon_user} id="telepon_user" pattern="[+][0-9]{2}[0-9]{10}"  placeholder="Telephone" required /><br />
                <p>Address</p>
                <input type="text" defaultValue={field.alamat_user} id="alamat_user" placeholder="Address" required /><br />
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
            </form> : <div className="dots-4" />
            }
    </>)

}

export default memo(EditUser)