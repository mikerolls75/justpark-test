class CheckoutPage {
    datePickerOpenBtn = '.c-time-and-label__date'
    datePickerFormElement = '.c-date-picker-with-time-dropdown'
    datePickerNextMonthBtn = '.next-HbvwV'
    datePickerDateElement = (date: string) => {
        return `button[aria-label=\"${date}\"]`
    }

    selectFutureDate(dayInFuture: 30) {
        cy.get(this.datePickerOpenBtn).click()
        
        let todaysDate = new Date()
        let futureDate = new Date()
        futureDate.setDate(todaysDate.getDate() + dayInFuture)

        const dateOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        }
        
        //  look for format 'Weekday(long), Month(long) DD, YYYY'
        const formattedDate = futureDate.toLocaleDateString('en-US', dateOptions)

        // check date picker form is displayed
        cy.get(this.datePickerFormElement)

        cy.get(this.datePickerNextMonthBtn).click()
        cy.get(this.datePickerDateElement(formattedDate)).click()
        
        cy.contains('Done').click()
    }

    clickConfirmButton(){
        cy.contains('Confirm').click()
    }
}

export default CheckoutPage