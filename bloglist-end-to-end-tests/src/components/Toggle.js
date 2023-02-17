import { useState, forwardRef, useImperativeHandle } from 'react'

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, refs) => {

    const [visible, setVisible] = useState(false)

    const showWhenVisible = {display: visible ? 'none' : ''}
    const hideWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility} id='show-form'>create</button>
            </div>
            <div style={hideWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </>
    )
})

export default Togglable