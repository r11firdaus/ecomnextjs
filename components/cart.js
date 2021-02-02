import { memo } from "react"

const Cart = (props) => {
    return (<>
        <div className="card" style={{padding: '7px 10px'}}>
            <div style={{display: 'flex'}}>
                <input type="checkbox" style={{marginTop: '3px'}} />
                <div style={{display:"flex"}}>
                    <a href="#" style={{marginBottom: '-5px', fontSize: '13px'}}>Nama Toko&nbsp;</a>
                    <strong style={{ fontSize: '13px'}}>|&nbsp;Cimahi</strong><br />
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <input type="checkbox" style={{marginTop: '12px'}} />
                <div>
                    <p style={{marginBottom: '-5px', fontSize: '13px'}}>Nama Barang</p>
                    <strong style={{ fontSize: '13px'}}>Rp. 123.xxx</strong><br />
                </div>
            </div>
            <input type="text" placeholder="add notes..." style={{fontSize: '12px', padding: '3px 5px', width: '70%'}} />
            <div className="card-action" style={{marginTop: '10px'}}>
                <div className="float-left">
                    <button className="button-primary-text button-small" style={{padding: '0', fontSize: '8px'}}>+ Favourite</button>
                    <button className="button-primary-text button-small" style={{padding: '0', fontSize: '8px'}}>Hapus</button>
                </div>
                <div className="float-right" style={{display: 'flex'}}>
                    <button className="button-primary button-small">+</button>
                    <p style={{margin: '4px'}}>8</p>
                    <button className="button-primary button-small">-</button>
                </div>
            </div>
        </div>
    </>)
}

export default memo(Cart)