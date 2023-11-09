export class MainPage{

    darkMode = '[class^="dark-mode"]';
    lightMode = '[class*="light-mode"]';
    modeSwitchwer ='.header__content > section > div';
    arrowForLanguageSelection = '[class="location-selector__button"]';
    selectorUALanguage = '.location-selector__item [lang="uk"]';
    lblLanguage = '.location-selector__button';
    clmnPoliciesLeft = '[class="ul policies-left"] > li';
    clmnPoliciesRight = '[class="ul policies-right"] > li';
    lblOurLocations = 'span .museo-sans-light:contains("Our\n Locations")';
    tabListRegions = '.js-tabs-links-list > div';
    
    getPageTitle(){
        return cy.title();
    };

    getDarkMode(){
        return cy.get(this.darkMode);
    };

    getLightMode(){
        return cy.get(this.lightMode);
    };

    clickModeSwitcher(){
        cy.get(this.modeSwitchwer).click()
    }

    openLanguageSelection(){
        cy.get(this.arrowForLanguageSelection).click();
    }

    clicklblUALanguage(){
        cy.get(this.selectorUALanguage).should('be.visible').click();
    }

    ignoreExceptions(){
            cy.on('uncaught:exception', (err, runnable) => {
                return false
            })    
    }

    getlblLanguage(){
        
        return cy.origin('https://careers.epam.ua', () => {
            
        //turn off uncaught exceptions from "careers.epam.ua"
            cy.on('uncaught:exception', (err, runnable) => {
                return false
            })

            cy.get('.location-selector__button').invoke('text');
            
        })
    } 

    getclmnPoliciesLeft(){
        return cy.get(this.clmnPoliciesLeft);
    }   

    getclmnPoliciesRight(){
        return cy.get(this.clmnPoliciesRight);
    }   
    
    scrollToOurLocations() {
        cy.get(this.lblOurLocations).scrollIntoView();
    } 

    gettabListRegions() {
        return cy.get(this.tabListRegions)
    }

    clickOnRegin(region) {
        return cy.wrap(region).click();
    }

    getCountryinSelectedRegion(country, index){
        return cy.get(`.owl-item [data-country="${country[index]}"]`);
    }

    getPageUrl(){
       return  cy.url();
    }

}
