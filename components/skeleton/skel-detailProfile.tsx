import { memo } from "react"

const Skeleton = (): JSX.Element => {
    return (
        <div className="wrapper">
            <div className="skel-prof">
                <div className="skel-prof-head">
                    <div className="skel-prof-avatar"></div>
                    <div className="skel-prof-datauser">
                        <div className="skel-prof-name"></div>
                        <div className="skel-prof-detail"></div>
                    </div>
                </div>
                <div className="skel-prof-body">
                    <div className="skel-prof-article"></div>
                    <div className="skel-prof-article"></div>
                    <div className="skel-prof-article"></div>
                </div>
            </div>
        </div>
    )
}

export default memo(Skeleton)
