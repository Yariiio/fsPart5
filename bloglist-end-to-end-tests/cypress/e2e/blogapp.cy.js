describe('Blogapp', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user1 = {
            username: 'testuser1',
            name: 'testname1',
            password: 'testpassword1'
        }
        const user2 = {
            username: 'testuser2',
            name: 'testname2',
            password: 'testpassword2'
        }
        const user3 = {
            username: 'testuser3',
            name: 'testname3',
            password: 'testpassword3'
        }

        cy.request('POST', 'http://localhost:3003/api/users', user1)
        cy.request('POST', 'http://localhost:3003/api/users', user2)
        cy.request('POST', 'http://localhost:3003/api/users', user3)
        cy.visit('http://localhost:3000')
    })
    
    it('Login form is shown', function() {
        cy.visit('http://localhost:3000')
        cy.get('.login-form').contains('username')
        cy.get('.login-form').contains('password')
    })
    //*****TESTS FOR LOGIN*****
    describe('Login', function() {
        it('succeeds with right credentials', function() {
            cy.get('#username').type('testuser1')
            cy.get('#password').type('testpassword1')
            cy.get('#login-button').click()
            cy.get('.notification').contains('Welcome testuser1!')
        })
        describe('fails with wrong credentials', function() {
            it('fails with wrong username', function() {
                cy.get('#username').type('wrong')
                cy.get('#password').type('testpassword1')
                cy.get('#login-button').click()
                cy.get('.notification').contains('invalid username or password')
            })
            it('fails with wrong password', function() {
                cy.get('#username').type('testuser1')
                cy.get('#password').type('wrong')
                cy.get('#login-button').click()
                cy.get('.notification').contains('invalid username or password')
            })
        })
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({username: 'testuser1', password: 'testpassword1'})
        })

        it('a new blog can be created', function() {
            cy.get('#show-form').click()
            cy.get('#title').type('test title1')
            cy.get('#author').type('test author1')
            cy.get('#url').type('test url')

            cy.get('#create-blog').click()
            cy.get('.notification').contains('test title1 by test author1 added')
            cy.contains('test title1 test author1')
        })
    })

    describe('when logged in and there is a blog', function() {
        beforeEach(function() {
            cy.login({username: 'testuser1', password: 'testpassword1'})
            cy.createBlog({title: 'test title1', author: 'test author1', url: 'test url1'})
        })

        it('user can like a blog', function() {
            cy.get('#view').click()
            cy.get('#likes').contains(0)
            cy.get('#like').click()
            cy.get('#likes').contains(1)
            cy.get('#like').click()
            cy.get('#likes').contains(2)
        })

        it('user can delete own blog', function() {
            cy.get('html').should('contain', 'test title1 test author1')
            cy.get('#view').click()
            cy.get('#delete-button').click()
            cy.get('html').should('not.contain', 'test title1 test author1')
        })
    })

    describe('when there are couple of blogs from different users and one user is logged in', function() {
        beforeEach(function() {
            cy.login({username: 'testuser1', password: 'testpassword1'})
            cy.createBlog({title: 'test title1', author: 'test author1', url: 'test url1'})
            cy.get('#log-out')
            cy.login({username: 'testuser2', password: 'testpassword2'})
            cy.createBlog({title: 'test title2', author: 'test author2', url: 'test url2'})
            cy.get('#log-out')
            cy.login({username: 'testuser3', password: 'testpassword3'})
            cy.createBlog({title: 'test title3', author: 'test author3', url: 'test url3'})
        })

        it('user can see delete button only on blogs which are created by the user', function() {
            cy.get('.blog').eq(0).contains('view').click()
            cy.get('.blog').eq(1).contains('view').click()
            cy.get('.blog').eq(2).contains('view').click()

            cy.get('.blog').eq(0).should('not.contain', 'remove')
            cy.get('.blog').eq(1).should('not.contain', 'remove')
            cy.get('.blog').eq(2).should('contain', 'remove')
        })

        it('blogs are sorted out by most likes at the top', function() {
            cy.get('.blog').eq(0).contains('view').click()
            cy.get('.blog').eq(1).contains('view').click()
            cy.get('.blog').eq(2).contains('view').click()

            cy.get('.blog').eq(0).should('contain', 'testname1')

            cy.get('.blog').eq(2).contains('like').click()

            cy.get('.blog').eq(0).should('contain', 'testname3')

            cy.get('.blog').eq(2).contains('like').click()
            cy.get('.blog').eq(1).contains('like').click()

            cy.get('.blog').eq(0).should('contain', 'testname2')
        })
    })
})