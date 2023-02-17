import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({createBlog}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            title
            <input
                type='text'
                name='title'
                id='title'
                value={title}
                onChange={({target}) => setTitle(target.value)}
            />
            <br />
            author
            <input
                type='text'
                name='author'
                id='author'
                value={author}
                onChange={({target}) => setAuthor(target.value)}
            />
            <br />
                url
            <input
                type='text'
                name='url'
                id='url'
                value={url}
                onChange={({target}) => setUrl(target.value)}
            />
            <br />
            <button type='submit' id='create-blog'>create</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm