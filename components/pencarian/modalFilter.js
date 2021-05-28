import { memo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// cuma dummy, nanti dikirim dari backend
const sortType = [
    {
        title: "Relevance",
        value: "relevance"
    },
    {
        title: "Highest Price",
        value: "highest"
    },
    {
        title: "Lowest Price",
        value: "lowest"
    },
    {
        title: "Highest Rating",
        value: "rating"
    },
    {
        title: "Newest",
        value: "newest"
    },
]
const location = ["Bandung", "Cimahi", "Jakarta"]

const ModalFilter = () => {
    const { modalFilter } = useSelector(state => state)
    const dispatch = useDispatch()
    const [selected, setselected] = useState('relevance')

    const showResult = () => {
        dispatch({ type: 'CHANGE_SORT', payload: selected })
        clearData()
        dispatch({ type: 'MODAL_FILTER', payload: false })
    }
    
    const clearData = () => {
        const barangUserLocal = localStorage.removeItem('barang_user_id');
        const barangLocal = localStorage.removeItem('barang_user');
        const subCategoryLocal = localStorage.getItem('nama_subcategory');
        const barangSubCategoryLocal = localStorage.getItem('barang_subcategory');
        barangUserLocal && barangUserLocal;
        barangLocal && barangLocal;
        subCategoryLocal && subCategoryLocal;
        barangSubCategoryLocal && barangSubCategoryLocal;
    }

    return (<>
        {modalFilter &&
            <div className="modal-mask">
                <div className="modal">
                    <div className="modal-body">
                        <strong>Sort</strong>
                        {
                            sortType.map((type, index) => (
                                <button
                                    className={`button-${selected == type.value ? 'primary' : 'outline-primary'} button-small mini-btn`}
                                    onClick={() => setselected(type.value)}
                                    key={index}
                                >{type.title}</button>
                            ))
                        }
                    </div>
                    {/* <div className="modal-body">
                        <strong>Location</strong>
                        <button className="button-primary button-small mini-btn">Choose Location</button>
                        {location &&
                            location.map(loc => (
                                <button className="button-primary button-small mini-btn">{loc}</button>
                            ))
                        }
                    </div> */}
                    <div className="modal-footer">
                        <button className="button-primary button-small mini-btn" onClick={() => showResult()}>Show Result</button>
                        <button className="button-outline-primary button-small mini-btn" onClick={() => dispatch({ type: 'MODAL_FILTER', payload: false })}>Cancel</button>
                    </div>
                </div>
            </div>
        }
    </>)
}

export default memo(ModalFilter)