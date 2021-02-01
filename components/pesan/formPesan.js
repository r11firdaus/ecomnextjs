import { memo } from "react"

class FormPesan extends React.Component {
    componentDidMount() {
        console.log('formChat dirender')
    }
    async formHandler() {
        const input = document.getElementById('input')
        if (input.value.length > 0) {
            await fetch(`/api/chat/message/post/${this.props.id_chat}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.props.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message: input.value, id_user: this.props.id_user })
            })
            input.value = ''
        }
    }

    render() {
        console.log(this.props.id_user)
        return (<>
            <form id="form" 
                onSubmit={e=> {
                e.preventDefault()
                this.formHandler()
            }}>
                <input id="input" autoComplete="off" />
                <button>Send</button>
            </form>
            <style jsx>
                {`
                    #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
                    #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
                    #input:focus { outline: none; }
                    #form > button { background: #333; border: none; padding: 0 1rem; border-radius: 3px; outline: none; color: #fff; }
                `}
            </style>
        </>)
    }
}

export default memo(FormPesan)