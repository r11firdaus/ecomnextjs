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
        <div style={{display: 'flex', overflow: 'auto', whiteSpace: 'nowrap', margin: '10px 0 10px 10px', height: '35%', minHeight: '130px'}}>
            {
                dummy.map(data => (
                    <div className="card float-left" style={{minWidth: '80%', padding: '5px', height: '100%'}} key={data.id}>
                        <strong>{data.judul}</strong>
                        <p>Sampai 15 September 2069</p>
                        <p>{data.konten}</p>
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
