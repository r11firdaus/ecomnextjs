import { memo } from "react";

const alert = (props: {status: number, text: string}) => {
    switch (props.status) {
        case 200:
            return <p className="alert alert-success">{props.text}</p>
        case 401:
            return <p className="alert alert-danger">{props.text}</p>
        case 500:
            return <p className="alert alert-danger">{props.text}</p>
        default:
            break;
    }
}

export default memo(alert)
