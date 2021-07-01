import { Fragment, memo } from "react"

const Bubble = (props) => {
    return (<>
        <ul className="row" id="message" style={{ margin: '-20px 0 3rem 0', listStyle: 'none' }}>
            {props.person.length > 0 &&
                props.person.map((per, index) => (
                    <Fragment key={index}>
                        <div className="col" style={{ padding: '0' }}>
                            {per.id_user == props.id_userMe ?
                                <li className="card float-right" style={styles.userMe}>{per.message}</li> :
                                <li className="card float-left" style={styles.otherUser}>{per.message}</li>
                            }
                        </div>
                    </Fragment>))
            }
        </ul>
    </>)
}

const styles = {
    userMe: {
        maxWidth: '70%',
        backgroundColor: '#be9b7b',
        padding: '10px',
        margin: '10px',
        color: 'white'
    },
    otherUser: {
        maxWidth: '70%',
        padding: '10px',
        margin: '10px'
    }
}

export default memo(Bubble)