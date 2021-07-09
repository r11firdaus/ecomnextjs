import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GlobalState } from "../../type"
import ModalFilter from "./modalFilter"

const FilterHandler = (): JSX.Element => {
    const { cod }: GlobalState = useSelector(state => state)
    const dispatch = useDispatch()

    const btnFilterHandler = (): void => {
        dispatch({type: 'MODAL_FILTER', payload: true})
    }

    return (<>
        <div className="col" style={{ display: 'flex', justifyContent: 'space-around', position: 'sticky' }}>
            <div>
                <button className="button-small button-primary-text" onClick={()=>btnFilterHandler()}>Filter</button>
            </div>

            <p
                style={{ borderBottom: cod && '1px solid green', margin: '5px', cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'CHANGE_COD', payload: !cod })}
            >COD
            </p>
        </div>
        <ModalFilter />
    </>)
}

export default memo(FilterHandler)