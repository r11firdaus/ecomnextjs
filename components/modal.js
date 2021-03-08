const Modal = (props) => {
    const [sh, setsh] = useState(initialState)
    const close = (e) => {
        e.preventDefault()
        document.getElementById('mask').style.display = 'none'
    }
    return (
        <div className="modal-mask" id="mask" style={{ display: 'block'}}>
            <div className="modal" style={{ display: 'block'}}>
                <div className="modal-body">
                    <p>{props.message}</p>
                </div>
                <div className="modal-footer">
                    {props.action &&
                        <button className="button-primary button-small" onClick={e => props.action(e)} style={style.button} >Delete</button>
                    }
                    <button className="button-primary-outline button-small" onClick={e => close(e)} style={style.button} >Close</button>
                </div>
            </div>
        </div>
    )
}