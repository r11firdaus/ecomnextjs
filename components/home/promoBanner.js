import { memo } from "react"

const dummy = [
    {
        id: 1,
        judul: 'Title 1',
        konten: 'Example Promo Banner'
    },
    {
        id: 2,
        judul: 'Title 2',
        konten: 'Example Promo Banner'
    },
    {
        id: 3,
        judul: 'Title 3',
        konten: 'Example Promo Banner'
    }
]

const PromoBanner = () => {
    return (<>
        <div style={{display: 'flex', overflow: 'auto', whiteSpace: 'nowrap', margin: '10px 0 10px 10px'}}>
            {
                dummy.map(data => (
                    <div className="card float-left" style={{minWidth: '80%', padding: '5px', minHeight: '150px'}} key={data.id}>
                        <strong>{data.judul}</strong>
                        <p>{data.konten}</p>
                        <small>Expired on September 15, 2069</small>
                    </div>
                ))
            }
        </div>
        <style jsx>
            {`
                ::-webkit-scrollbar {
                    width: 15px;
                    height: 3px;
                    background:white;
                }
                ::-webkit-scrollbar-track {
                    border-radius: 5px;
                }
                
                ::-webkit-scrollbar-thumb {
                    border-radius: 5px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
                    background:lightgray;
                } 
            `}
        </style>
    </>)
}

export default memo(PromoBanner)
