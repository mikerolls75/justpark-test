import HomePage from "../../pages/HomePage"
import FindParking from "../../pages/FindParking"
import CheckoutPage from "../../pages/CheckoutPage"

const homePage = new HomePage()
const findParking = new FindParking()
const checkoutPage = new CheckoutPage()

describe('Practical Test Scenarios', () => {
    beforeEach(() => {
        homePage.visitHomePage()
        homePage.login()
      })

    it('Scenario 1', () => {
        findParking.enterLocation('1001')
        findParking.selectFromLocationDropDown(1)
        cy.url().should('eq', 'https://www.justpark.com/checkout/1001')

        checkoutPage.selectFutureDate(30)
        checkoutPage.clickConfirmButton()

        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
        }
        
        let todaysDate = new Date()
        let futureTime = new Date()
        futureTime.setMinutes(todaysDate.getMinutes() + 1)

        // need time in format "mm:ss"
        const formattedTime = futureTime.toLocaleTimeString('en-GB', timeOptions)

        cy.contains(`Sorry, this parking space has a maximum stay of 1 week so you cannot park beyond ${formattedTime}`)
            .should('be.visible')
    })
})
