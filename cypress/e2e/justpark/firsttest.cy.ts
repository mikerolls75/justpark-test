import HomePage from "../../pages/HomePage"
import FindParking from "../../pages/FindParking"
import CheckoutPage from "../../pages/CheckoutPage"

const homePage = new HomePage()
const findParking = new FindParking()
const checkoutPage = new CheckoutPage()

before(() => {
    homePage.visitHomePage()
    homePage.login()
  })
  
describe('First scenario', () => {
    // context('Given a user lands on the homepage', () => {
    //     beforeEach(() => {
    //         homePage.visitHomePage()
    //     })
    // })

    // context('And they are logged into their account', () => {
    //     beforeEach(() => {
    //         homePage.login()
    //     })
    // })

    context('First scenario', () => {
        it('When they input “1001” into the primary search CTA on the homepage', () => {
            findParking.enterLocation('1001')
        })
    
        it('And select the first result', () => {
            cy.pause()
            findParking.selectFromLocationDropDown(1)
        })

        it('And They are taken to the checkout page', () => {
            cy.url().should('eq', 'https://www.justpark.com/checkout/1001')
        })

        it('And they changed the parking until a date to 30 days ahead of today', () => {
            checkoutPage.selectFutureDate(30)
        })

        it('And they click Continue (Confirm) to dismiss the modal', () => {
            checkoutPage.clickConfirmButton()
        })

        it('Then they should be presented with an error message on the left-hand side of the page', () => {
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
})