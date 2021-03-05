import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"

const FilterHandler = () => {
    const {sort, cod} = useSelector(state => state)
    const dispatch = useDispatch()

    const hargaHandler = () => {
        sort === 'highest' && dispatch({type: 'CHANGE_SORT', payload: ''})
        sort === 'lowest' && dispatch({type: 'CHANGE_SORT', payload: 'highest'})
        sort === '' && dispatch({type: 'CHANGE_SORT', payload: 'lowest'})
    }
    return (
        <div className="col" style={{display: 'flex', justifyContent: 'space-around'}}>
            <p
                style={{borderBottom: sort !== '' && '1px solid green', margin: '5px', cursor: 'pointer'}}
                onClick={() => hargaHandler()}
            >Harga {sort === 'highest' ? '+' : '-'}
            </p>
            <p
                style={{borderBottom: cod && '1px solid green', margin: '5px', cursor: 'pointer'}}
                onClick={() => dispatch({type: 'CHANGE_COD', payload: !cod})}
            >COD
            </p>
        </div>
    )
}

export default memo(FilterHandler)