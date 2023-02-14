const baseAPI = Cypress.env('BASE_API')
const username = Cypress.env('USERNAME')
const password = Cypress.env('PASSWORD')

Cypress.Commands.add('APIAdminLogin', () => {
  const options = {
    method: 'POST',
    url: `${baseAPI}/auth/login`,
    body: {
      email: username,
      password: password,
      device_type: 'web'
    }
  }
  cy.request(options).then((response) => {
    window.localStorage.setItem('Realday/jwt', '"' + response.body.token + '"')
  })
})

Cypress.Commands.add('APILogout', (token) => {
  let authorization = `bearer ${token}`
  const options = {
    method: 'POST',
    url: `${baseAPI}/auth/logout`,
    headers: {
      authorization
    }
  }
  cy.request(options)
})