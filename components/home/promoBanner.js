import { memo } from "react"

const dummy = [
    {
        id: 1,
        judul: 'Title 1',
        konten: 'content 1'
    },
    {
        id: 2,
        judul: 'Title 2',
        konten: 'content 2'
    },
    {
        id: 3,
        judul: 'Title 3',
        konten: 'content 3'
    }
]

const PromoBanner = () => {
    return (<>
        <div className="wrapper" style={{display: 'flex', overflow: 'auto', whiteSpace: 'nowrap', margin: '10px 0 10px 10px', height: window.innerHeight/3}}>
            {
                dummy.map(data => (
                    <div className="card float-left" style={{minWidth: '80%', margin: '0', padding: '5px', height: '100%'}} key={data.id}>
                        <strong>{data.judul}</strong>
                        <p>Sampai 15 September 2069</p>
                        <p>{data.konten}</p>
                    </div>
                ))
            }
        </div>
    </>)
}

export default memo(PromoBanner)
