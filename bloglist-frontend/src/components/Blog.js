import { useState } from 'react'

const Blog = ({blog, handleLike, handleDelete, user}) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [details, setDetails] = useState()

    const toggleDetails = () => {
        setDetails(!details)
    }

    const addLike = () => {
        handleLike({...blog, likes: blog.likes += 1})
    }

    return (
        <div style={blogStyle}>
            <div>
                <span>{blog.title} {blog.author} <button onClick={toggleDetails}>view</button></span>
            </div>
            {details &&
                <div>
                    <p>{blog.url}</p>
                    <p>{blog.likes} <button onClick={addLike}>like</button></p>
                    <p>{blog.user.name}</p>
                    {user.username === blog.user.username &&
                        <button style={{color: 'black', backgroundColor: 'blue'}} onClick={() => handleDelete(blog)}>remove</button>
                    }
                </div>
            }
        </div>
    )
}


export default Blog