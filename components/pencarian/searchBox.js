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
            <input type="text" id="search" placeholder="Search in Jwallin" />
        </form>
    )
}

export default memo(index)