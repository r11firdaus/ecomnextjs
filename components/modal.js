import { memo, useEffect, useState } from "react"

const Modal = (props) => {
    const [data, setdata] = useState({})
    
    useEffect(() => {
        setdata(props.data)
    }, [props.data])

    const close = (e) => {
        e.preventDefault()
        let newData = {...data, show: false}
        setdata(newData)
    }

    return (<>
        {data.show && 
            <div className="modal-mask" id="mask" style={{ display: 'block'}}>
                <div className="modal" style={{ display: 'block'}}>
                    <div className="modal-body">
                        <p>{data.message}</p>
                    </div>
                    <div className="modal-footer">
                        {!data.cancelOnly &&
                            <button className="button-primary button-small mini-btn" onClick={data.function}>Delete</button>
                        }
                        <button className="button-primary-outline button-small mini-btn" onClick={e => close(e)}>Close</button>
                    </div>
                </div>
            </div>
        }
    </>)
}

export default memo(Modal)