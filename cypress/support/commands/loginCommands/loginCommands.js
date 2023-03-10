import LoginPage from '../../pageObjects/loginSelectors/loginPageSelectors'
import { newPassword } from '../../../fixtures/fakes'

const username = Cypress.env('USERNAME')
const password = Cypress.env('PASSWORD')
const loginPage = new LoginPage()

Cypress.Commands.add('adminLoginOnPortal', () => {
  cy.visit('/')
  loginPage.getUsernameField().should('be.visible').type(username)
  loginPage.getPasswordField().should('be.visible').type(password)
  cy.wait(1000)
  loginPage.getLoginButton().click({ force: true })
})

Cypress.Commands.add('managerLoginOnPortal', (user) => {
  cy.visit('/')
  loginPage.getUsernameField().should('be.visible').type(user.email)
  loginPage.getPasswordField().should('be.visible').type(newPassword)
  cy.wait(1000)
  loginPage.getLoginButton().click({ force: true })
})

Cypress.Commands.add('logoutFromPortal', () => {
  loginPage.getProfileIcon().click({ force: true })
  loginPage.getLogoutOption().click({ force: true })
  cy.location('pathname').should('eq', `/login`)
})

Cypress.Commands.add('verifyLogin', () => {
  loginPage.getLogo().should('be.visible')
  cy.location('pathname').should('eq', `/jobs`)
})

Cypress.Commands.add('setNewPassword', () => {
  loginPage.getUsernameField().should('be.visible').type(newPassword)
  loginPage.getPasswordField().should('be.visible').type(newPassword)
  cy.wait(500)
  loginPage.getLoginButton().should('be.visible').click() //here we use getLoginButton() because the selector is same
})

Cypress.Commands.add('verifyPasswordSetting', () => {
  loginPage
    .getTopBanner()
    .should('contain', 'Your new password has been saved! That was easy.')
})
