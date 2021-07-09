import { memo } from "react"
import SkelPromoBanner from "../skeleton/skel-promoBanner"

const PromoBanner = (props: {data: any[]}): JSX.Element => {
    return (<>
        {props.data && props.data.length > 0 ?
            props.data.map((data: any) => (
                <div className="card card-promo float-left" key={data.id}>
                    <strong>{data.judul}</strong>
                    <div style={{height: '80px', marginTop: '10px'}}>
                        <p style={{marginBottom: 0, fontSize: '13px'}}>{data.konten}</p>
                        <p style={{marginBottom: 0, fontSize: '13px'}}>{data.konten}</p>
                        <p style={{marginBottom: 0, fontSize: '13px'}}>{data.konten}</p>
                    </div>
                    <small style={{bottom: 0}}>Expired on September 15, 2069</small>
                </div>
            )) :
            <>
                <SkelPromoBanner />
                <SkelPromoBanner />
                <SkelPromoBanner />
                <SkelPromoBanner />
                <SkelPromoBanner />
            </>
        }
    </>)
}

export default memo(PromoBanner)