const getShortenedUrls = () => {
  return {
    statusCode: 200,
    ok: true,
    body: {
      urls: [
        {
          id: 1, 
          long_url: "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80", 
          short_url: "http://localhost:3001/useshorturl/1", 
          title: "Awesome photo"
        }
      ]
    }
  }
}

const postShortenedUrls = () => {
  return {
    statusCode: 200,
    ok: true,
    body: {
      id: 2,
      long_url: 'https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      short_url: 'http://localhost:3001/useshorturl/2',
      title: 'Cute Parrot',
    }
  }
}

const getUrlsAgain = () => {
  return {
    statusCode: 200,
    ok: true,
    body: {
      urls: []
    }
  }
}


describe('Main dashboard user flow', () => {

  it('should display the page title and existing shortened URLs', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', getShortenedUrls()).as('getUrls')
    cy.visit('http://localhost:3000/')
    .get('.page-title').contains('URL Shortener')
    .get('.url').first().find('.url-title').contains('Awesome photo')
    .get('.url').first().find('.short-url').contains('http://localhost:3001/useshorturl/1')
    .get('.url').first().find('.long-url').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  });

  it('should display the shortener form with proper inputs', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', getShortenedUrls()).as('getUrls')
    cy.visit('http://localhost:3000/')
    .get('.form').within(() => {
      cy.get('input:invalid').should('have.length', 2)
    })
    .get('.title-input').should('have.attr', 'placeholder').should('eq', 'Title...')
    .get('.url-input').should('have.attr', 'placeholder').should('eq', 'URL to Shorten...')
    .get('.submit').contains('Shorten Please!')
  });

  it('should be able to fill out all input fields', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', getShortenedUrls()).as('getUrls')
    cy.visit('http://localhost:3000/')
    .get('.title-input').type('Cute Parrot').should('have.attr', 'value').should('eq', 'Cute Parrot')
    .get('.url-input').type('https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')
    .get('.url-input').should('have.attr', 'value').should('eq', 'https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')
  });

  it('should be able to POST a new shortened URL', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', getShortenedUrls()).as('getUrls')
    cy.visit('http://localhost:3000/')
    .get('.title-input').type('Cute Parrot')
    .get('.url-input').type('https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', postShortenedUrls()).as('postUrls')
    .get('.submit').click()
    .get('.url').last().find('.url-title').contains('Cute Parrot')
    .get('.url').last().find('.short-url').contains('http://localhost:3001/useshorturl/2')
    .get('.url').last().find('.long-url').contains('https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')
  });

  it('should display an error message if the server is down', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500
    }).as('500 error')
    cy.visit('http://localhost:3000/')
    .get('.error-msg').contains('Something went wrong! Please try again.')
  });

  it('should display an error message for 4xx errors', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 422
    }).as('422 error')
    cy.visit('http://localhost:3000/')
    .get('.error-msg').contains('Something went wrong! Please try again.')
  });


  it('should be able to DELETE a URL', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', getShortenedUrls()).as('getUrls')
    cy.visit('http://localhost:3000/')
    .get('.title-input').type('Cute Parrot')
    .get('.url-input').type('https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', postShortenedUrls()).as('postUrls')
    .get('.submit').click()
    .get('.url').last().find('.delete-btn').click()
    .get('.url').should('have.length', 1)
  });

})
