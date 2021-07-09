import { memo } from 'react'

const Skeleton = ():JSX.Element => {
    return (
        <div className="card card-promo float-left">
            <div className="skel-promo-title" />
            <div className="skel-promo-body" />
            <div className="skel-promo-date" />
        </div>
    )
}

export default memo(Skeleton)
