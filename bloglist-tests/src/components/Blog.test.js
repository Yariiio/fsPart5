import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
    test('title and author fields are rendered and url and likes fields are not', () => {
        const testBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
            likes: 0        }

        const {container} = render(<Blog blog={testBlog}/>)

        const toggleDetailsButton = container.querySelector('.details-button')
        const containerDiv = container.querySelector('.blog-container')

        expect(containerDiv).toHaveTextContent('test title')
        expect(containerDiv).toHaveTextContent('test author')
        expect(containerDiv).not.toHaveTextContent('test url')
        expect(containerDiv).not.toHaveTextContent(0)
        expect(toggleDetailsButton).toHaveTextContent('view')
        expect(toggleDetailsButton).not.toHaveTextContent('hide')
    })

    test('url and likes fields are rendered after clicking view button', async () => {
        const testBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
            likes: 0,
            user: {
                name: 'test name'
            }
        }

        const testUser = {
            name: testBlog.user.name
        }

        const mockHandler = jest.fn()

        const {container} = render(<Blog blog={testBlog} user={testUser} toggleDetails={mockHandler} />)

        const containerDiv = container.querySelector('.blog-container')

        const user = userEvent.setup()
        const toggleDetailsButton = container.querySelector('.details-button')
        await user.click(toggleDetailsButton)

        expect(containerDiv).toHaveTextContent('test url')
        expect(containerDiv).toHaveTextContent(0)
        expect(toggleDetailsButton).not.toHaveTextContent('view')
        expect(toggleDetailsButton).toHaveTextContent('hide')
    })

    test('clicking like button twice invokes event handler twice', async () => {
        const testBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
            likes: 0,
            user: {
                name: 'test name'
            }
        }

        const testUser = {
            name: testBlog.user.name
        }

        const detailsHandler = jest.fn()
        const likeHandler = jest.fn()

        const {container} = render(<Blog blog={testBlog} user={testUser} toggleDetails={detailsHandler} handleLike={likeHandler}/>)

        const user = userEvent.setup()
        const toggleDetailsButton = container.querySelector('.details-button')
        await user.click(toggleDetailsButton)

        const likeButton = container.querySelector('.like-button')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeHandler.mock.calls).toHaveLength(2)
    })
})