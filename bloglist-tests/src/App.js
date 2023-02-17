import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggle'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [blogs.length])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (credentialsObject) => {

        try {
            const user = await loginService.login(credentialsObject)

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            handleMessage(`Welcome ${user.username}!`)
        }
        catch(exception) {
            handleMessage(exception.response.data.error)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const blogFormRef = useRef()

    const addBlog = async (newBlog) => {
        try {
            blogFormRef.current.toggleVisibility()
            await blogService.create(newBlog)
            setBlogs(blogs.concat(newBlog))
            handleMessage(`${newBlog.title} by ${newBlog.author} added`)
        }
        catch(exception) {
            handleMessage('title and author must be provided')
        }
    }

    const deleteBlog = async (currentblog) => {
        try {
            const blogToDelete = blogs.find(blog => blog.id === currentblog.id)
            if(blogToDelete) {
                if(window.confirm(`remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
                    await blogService.remove(blogToDelete)
                    setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
                }
            }
        }
        catch(exception) {
            console.log(exception)
        }
    }

    const handleLike = async (currentBlog) => {
        try {
            await blogService.update(currentBlog)
            //just doublechecking there is a blog to update and then just updating the state for refresh in likes on a page
            const blogToUpdate = blogs.find(blog => blog.id === currentBlog.id)
            if(blogToUpdate) {
                setBlogs([...blogs])
            }
        }
        catch(exception) {
            console.log(exception)
        }
    }

    //helper function for notifications
    const handleMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    if(!user) {
        return (
            <>
                <h2>Log in to application</h2>
                <Notification message={message}/>
                <LoginForm handleLogin={handleLogin} />
            </>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <br />
            <Notification message={message} />
            <p>{user.username} logged in <span><button onClick={handleLogout}>log out</button></span></p>
            <h2>Create new Blog</h2>
            <Togglable ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
            {blogs.sort((a, b) => b.likes - a.likes).map( (blog, index) =>
                <Blog key={index} blog={blog} handleLike={handleLike} handleDelete={deleteBlog} user={user}/>
            )}
        </div>
    )
}


export default App