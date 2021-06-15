import Router from "next/router"
import { memo } from "react"

const index = (props) => {
    const searchHandler = e => {
        e.preventDefault()
        const input = document.getElementById('search')
        const keyword = `s=${input.value.replace(/ /g, "_")}`
        Router.push(`/pencarian/${keyword}`)
    }

    return(
        <form style={{ flex: props.flex }} onSubmit={e => searchHandler(e)}>
            <input type="search" id="search" placeholder="Search in Jwallin" style={{padding: "8px"}} />
        </form>
    )
}

export default memo(index)