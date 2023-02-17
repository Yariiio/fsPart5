
const Notification = ({message}) => {

    const messageStyle = {
        fontSize: 20,
        color: 'grey',
        border: 'black solid 1px',
        margin: 10
    }

    if (message === null) {
        return null
    }
    else {
        return(
            <div style={messageStyle}>
                <h3>{message}</h3>
            </div>
        )
    }
}

export default Notification