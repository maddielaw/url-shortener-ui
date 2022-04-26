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


