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
    },
    {
        id: 4,
        judul: 'Title 4',
        konten: 'Example Promo Banner'
    },
    {
        id: 5,
        judul: 'Title 5',
        konten: 'Example Promo Banner'
    }
]

const PromoBanner = () => {
    return (<>
        <div style={style.container}>
            {
                dummy.map(data => (
                    <div className="card float-left" style={style.card} key={data.id}>
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

const style = {
    container: {
        display: 'flex',
        overflow: 'auto',
        whiteSpace: 'nowrap',
        margin: '10px 0 10px 10px'
    },
    card: {
        minWidth: '320px',
        padding: '5px',
        minHeight: '150px'
    }
}