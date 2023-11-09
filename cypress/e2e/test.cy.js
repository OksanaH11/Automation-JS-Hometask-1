const path = require("path");
const { MainPage } = require("../pages/mainPage.cy");
const { SearchPage } = require("../pages/searchPage.cy");
const { ContactPage } = require("../pages/ContactPage.cy");
const { AboutPage } = require("../pages/aboutPage.cy");

const mainPage = new MainPage
const searchPage = new SearchPage
const contactPage = new ContactPage
const aboutPage = new AboutPage

describe('test Epam.com page', () => {

    beforeEach(() => {

        cy.visit("/");

        //set dimension 1280 x 800
        cy.viewport('macbook-13');  
        
        //turn off uncaught exceptions to prevent test failing
        cy.on('uncaught:exception', (err, runnable) => {
            return false            
        });

    });

    it('should return page title', () => {
        mainPage.getPageTitle().should('equal', 'EPAM | Software Engineering & Product Development Services')
    });

    it('should check Dark mode', () => {
        mainPage.getDarkMode().should('exist')
    });

    it('should check Light mode', () => {
        mainPage.clickModeSwitcher();
        mainPage.getLightMode().should('exist')
    });

    it('should check UA language', () => {

        //click on arrow to open panel for language selection
        mainPage.openLanguageSelection();
        
        //select Ukraine language            
        mainPage.clicklblUALanguage();
                    
        //verify UA language is selected
        mainPage.getlblLanguage().should('equal', 'Україна (UA)');

    });

    it('should check Policies list', () =>{

        //scroll to the page bottom
        cy.scrollTo('bottom');
        
        //verify left Policies column
        mainPage.getclmnPoliciesLeft().each(($el) => {
            expect($el.text()).to.match(/INVESTORS|OPEN SOURCE|PRIVACY POLICY/)
        })

        //verify right Policies column
        mainPage.getclmnPoliciesRight().each(($el) => {
            expect($el.text()).to.match(/COOKIE POLICY|APPLICANT PRIVACY NOTICE|WEB ACCESSIBILITY/)
        })  

    });

    it('should check Location list by regions', () =>{

        //expected countries from each region
        const expectedCountries = ['canada', 'armenia', 'australia'];

        //scroll to the Our Locations control
        mainPage.scrollToOurLocations();
        
        mainPage.gettabListRegions().each(($region, index) => {

            //verify 3 present regions
            expect($region.text()).to.match(/AMERICAS|EMEA|APAC/);

            //click on a region
            mainPage.clickOnRegin($region);

            //verify that 1st country from selected region is visible 
            mainPage.getCountryinSelectedRegion(expectedCountries,index).should('be.visible');

        });

    });

    it('should check search result for "AI" ', () =>{

        //click on search icon and enter 'AI'
        searchPage.inputSearchValue('AI');

        //verify search result label displys results for "AI"
        searchPage.getlblSearchResult().should('contain', 'results for "AI"');

        //get searched items list 
        searchPage.getlistSearchResulItems().each(($item) => {

            //verify that search result item is displayed and contains 'AI'
            searchPage.getSearchItem($item).should('be.visible').should('contain', 'AI');

        });  
       
    });

    it('should check required fileds', () =>{
        
        //open https://www.epam.com/about
        contactPage.openPage();

        //check 'aria-required' attribute = true for required fields
        //check First name field 
        contactPage.getInputFirstName().should('have.attr','aria-required').should('eq','true');

        //check Last name field
        contactPage.getInputLastName().should('have.attr','aria-required').should('eq','true');
        
        //check User email field
        contactPage.getInputUserEmail().should('have.attr','aria-required').should('eq','true');        
        
        //check User phone field
        contactPage.getInputUserPhone().should('have.attr','aria-required').should('eq','true');
        
        //check 'How did you hear about EPAM?' field
        contactPage.getInputHearAbout().should('have.attr','aria-required').should('eq','true');
        
        //check I consent checkbox
        contactPage.getchkIConsent().scrollIntoView().should('have.attr','aria-required').should('eq','true');
        
    });

    it('should check clicking by Company logo is leading to the main page', () =>{

        //open https://www.epam.com/about
        aboutPage.openPage();

        //click company logo
        aboutPage.clickIconCompanyLogo();

        //check page url 
        mainPage.getPageUrl().should('eq','https://www.epam.com/')

    }); 


    it('should check downloaded report with valid name and extension exists', () =>{

        //open https://www.epam.com/about
        aboutPage.openPage();

        //click Download button
        aboutPage.clickbtnDownload();
        
        //verify that file with given name and extension exists
        cy.readFile('cypress/downloads/' + 'EPAM_Corporate_Overview_Q3_october' + '.pdf').should('exist');

    }); 

})