import HomePage from "./HomePage";

class FindParking {
    homeButton = 'span.c-header__logo-container > a'
    searchBoxField = '#search-box'

    rowFromLocationDropDown = (row: number) => {
        return `div.c-predictive-search-input__results-container > div:nth-child(${row})`
    }

    visitFindParkingPage() {
        cy.get(this.homeButton).click()
    }

    enterLocation(location: string) {
        this.visitFindParkingPage()
        cy.get(this.searchBoxField).type(location)
    }

    selectFromLocationDropDown(row: number) {
        cy.get(this.rowFromLocationDropDown(row)).click()
    }
}

export default FindParking