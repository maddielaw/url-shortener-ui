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

describe('Main dashboard user flow', () => {

  it('should display the page title and existing shortened URLs', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', getShortenedUrls()).as('getUrls')
    cy.visit('http://localhost:3000/')
    .get('.page-title').contains('URL Shortener')
    .get('.url').first().find('.url-title').contains('Awesome photo')
    .get('.url').first().find('.short-url').contains('http://localhost:3001/useshorturl/1')
    .get('.url').first().find('.long-url').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  });



})
