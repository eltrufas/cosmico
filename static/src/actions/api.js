export const loginUser = (username, password) => {
  return fetch('/api/get_token', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'email': username, 'password': password }),
  })
  .then(res => res.json())
}
