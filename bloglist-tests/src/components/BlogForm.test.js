import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
        const testForm = {
            title: 'this is my test title',
            author: 'this is my test author',
            url: 'this is my test title url'
        }

        const createBlog = jest.fn()
        const user = userEvent.setup()

        render(<BlogForm createBlog={createBlog} />)

        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')
        const createButton = screen.getByText('create')

        await user.type(titleInput, testForm.title)
        await user.type(authorInput, testForm.author)
        await user.type(urlInput, testForm.url)

        await user.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0]).toStrictEqual(testForm)
    })
})