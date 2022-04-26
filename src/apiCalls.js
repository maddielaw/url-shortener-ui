export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong! Please try again.')
        } else {
          return response.json()
        }
      })
}

export const postUrls = (newUrl) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: "POST",
    body: JSON.stringify(newUrl),
    headers: {"Content-Type": "application/json"}
  }).then(response => {
    if (!response.ok) {
      throw new Error('Please fill out all form fields!')
    } else {
      return response.json()
    }
  })
}

export const deleteUrls = (urlID) => {
  return fetch(`http://localhost:3001/api/v1/urls/${urlID}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
  })
  .then(response => response.text())
}