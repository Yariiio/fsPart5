import { useState } from 'react'

const Blog = ({blog, handleLike, handleDelete, user}) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [details, setDetails] = useState(false)

    const toggleDetails = () => {
        setDetails(!details)
    }

    const addLike = () => {
        handleLike({...blog, likes: blog.likes += 1})
    }

    return (
        <div style={blogStyle} className='blog-container'>
            <div className='simple-details'>
                <span>{blog.title} {blog.author} <button onClick={toggleDetails} className='details-button'>{!details ? 'view' : 'hide'}</button></span>
            </div>
            {details &&
                <div className='full-details'>
                    <p>{blog.url}</p>
                    <p>likes {blog.likes} <button onClick={addLike} className='like-button'>like</button></p>
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