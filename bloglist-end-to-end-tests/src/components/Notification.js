
const Notification = ({message}) => {

    const messageStyle = {
        fontSize: 20,
        color:  'grey',
        border: 'grey solid 1px',
        margin: 10
    }

    if (message === null) {
        return null
    }
    else {
        return(
            <div style={messageStyle} className='notification'>
                <h3>{message}</h3>
            </div>
        )
    }
}

export default Notification