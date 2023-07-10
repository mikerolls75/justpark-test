class HomePage {
    homePageUrl = 'https://justpark.com'
    privacyPolicyAcceptBtn = '#onetrust-accept-btn-handler'
    loginEmailField = 'input[data-cy="loginEmail-input"'
    loginPasswordField = 'input[data-cy="loginPassword-input"'
    signInBtn = 'input[value="Sign in"]'

    loginDefaultUser = 'miketest12345@gmail.com'
    loginDefaultUserPassword = 'byqfix-7moxco-Ruqpot'

    visitHomePage() {
        cy.visit(this.homePageUrl)
    }

    login() {
        cy.get(this.privacyPolicyAcceptBtn, { timeout: 20000 }).should('be.visible').should('be.enabled').click()

        cy.contains('Login').click()
        cy.contains('Login with email').click()
    
        cy.get("input[data-cy='loginEmail-input'").type(this.loginDefaultUser)
        cy.get("input[data-cy='loginPassword-input'").type(this.loginDefaultUserPassword)
    
        cy.get(this.signInBtn).click()
    }
}

export default HomePage