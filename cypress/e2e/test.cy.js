//
//import { should } from 'chai';
import 'cypress-xpath';
const path = require("path");

describe('Basic test page', () => {
    beforeEach(() => {
        cy.visit("https://www.epam.com");
    })
});

describe('base page title', () => {
    it('should return page title', () => {
        cy.visit("/");
        cy.title()
            .should('equal', 'EPAM | Software Engineering & Product Development Services')
    })
});

describe('Light/Dark mode', () => {

    beforeEach(() => {
        
        cy.visit("/");
        cy.viewport('macbook-13');  //  set dimension 1280 x 800

        cy.on('uncaught:exception', (err, runnable) => {
            return false            //turn off uncaught exceptions to prevent test failing
        });
    })

    it('should check Dark mode', () => {
        //cy.visit("/");
        cy.get('[class^="dark-mode"]')
            .should('exist')
    });

    it('should check Light mode', () => {
        //cy.visit("/");
        //cy.get('.header__content > section')
            //should('not.be.visible')
            //.viewport('macbook-13');      //switch toglle is visible only if maximize browser window
            //fullcreen can be moved to Before

        cy.get('.header__content > section > div')
            .click();
        
        cy.get('[class*="light-mode"]')
            .should('exist');
    });

    it('should check UA language', () =>{

        //click on arrow to open panel for language selection
        cy.get('[class="location-selector__button"]').click();
        
        //select Ukraine language            
        cy.get('.location-selector__item [lang="uk"]').should('be.visible').click();
        
        //turn off uncaught exceptions from "careers.epam.ua"
        cy.origin('https://careers.epam.ua', () => {
            cy.on('uncaught:exception', (err, runnable) => {
                return false
            });
            
            //verify what language is selected
            cy.get('.location-selector__button').should('have.text', 'Україна (UA)')
        })
        
    });

    it('should check Policies list', () =>{

        //scroll to the page bottom
        cy.scrollTo('bottom');
        
        //verify 1st Policies column
        cy.get('[class="ul policies-left"] > li').each(($el) => {
            expect($el.text()).to.match(/INVESTORS|OPEN SOURCE|PRIVACY POLICY/)
        })

        //verify 2nd Policies column
        cy.get('[class="ul policies-right"] > li').each(($el) => {
            expect($el.text()).to.match(/COOKIE POLICY|APPLICANT PRIVACY NOTICE|WEB ACCESSIBILITY/)
        })

    });

    it('should check Location list by regions', () =>{

        //scroll to the Our Locations control
        cy.get('span .museo-sans-light:contains("Our\n Locations")').scrollIntoView(); 
        
        //expected countries from each region
        const expectedCountries = ['canada', 'armenia', 'australia'];

        
        cy.get('.js-tabs-links-list > div').each(($region, index) => {

            //verify 3 present regions
            expect($region.text()).to.match(/AMERICAS|EMEA|APAC/);

            //click on a region
            cy.wrap($region).click();

            //verify that 1st country from selected region is visible 
            cy.get(`.owl-item [data-country="${expectedCountries[index]}"]`).should('be.visible');
        });

    });

    it('should check search result for "AI" ', () =>{

        //click on search icon
        cy.get('.search-icon').click();
        cy.get('#new_form_search').should('be.visible').type("AI").type('{selectall}{enter}');
        
        //cy.get('#new_form_search').click();
        cy.get('.search-results__counter').should('be.visible').should('contain', 'results for "AI"');

        //get searched items list 
        cy.get('.search-results__items > article > p').each(($item) => {

            //verify that a searched item exists and is displayed
            cy.wrap($item).should('exist').should('be.visible');

            //verify that searched item contains 'AI'
            cy.wrap($item).should('contain', 'AI');

            //if ($item.is(':visible')){
                //cy.wait(5000);
                //cy.wrap($item).invoke('text')
                //    .then((text) => {
                //        expect(text.toLowerCase()).to.include('ai');

                //});
                
                //.invoke('text').contains('ai', {matchCase: false });
               // cy.wrap($item).should('contain', 'AI');
                //.should('have.attr', 'href').should('include', 'ai', { matchCase: false });                
            //}
  
            //cy.log(cy.wrap($item).invoke('attr','href'));
            //cy.wrap($item).should('have.attr', 'href');
            //cy.wrap($item).should('have.attr', 'href').and('include', 'AI');
            //cy.wrap($item).mapinvoke('attr').contains('AI', { matchCase: false });

            //cy.wrap($item).should('have.attr', 'href').should('include', 'ai', { matchCase: false }); //{ matchCase: false }

        });  


        //cy.get('#id-6563fe11-2f96-386e-92ae-b843b1712be5')
        //    .should('have.attr', 'type')
        //    .should('contain','search');
        
    });


    it('should check required fileds', () =>{
        
        //open https://www.epam.com/about
        cy.visit('/about/who-we-are/contact');    

        //check 'aria-required' attribute = true for required fields
        //check First name field
        cy.get('input#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_first_name').should('have.attr','aria-required').should('eq','true');

        //check Last name field
        cy.get('input#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_last_name').should('have.attr','aria-required').should('eq','true');
        
        //check User email field
        cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_email').should('have.attr','aria-required').should('eq','true');        
        
        //check User phone field
        cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_phone').should('have.attr','aria-required').should('eq','true');
        
        //check 'How did you hear about EPAM?' field
        cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about').should('have.attr','aria-required').should('eq','true');
        
        //check I consent checkbox
        cy.get('[name="gdprConsent"]').scrollIntoView().should('have.attr','aria-required').should('eq','true');

        
    });

    it('should check clicking by Company logo is leading to the main page', () =>{

        //open https://www.epam.com/about
        cy.visit('/about');

        //click company logo
        cy.get('.desktop-logo > .header__logo-light').should('be.visible').click();

        //check page url 
        cy.url().should('eq','https://www.epam.com/')

    }); 


    it('should check report is downloaded and check report name and extension', () =>{

        //open https://www.epam.com/about
        cy.visit('/about');


        //cy.get('.button__content--desktop').contains('DOWNLOAD').click();
        
       // cy.wait(60000);

          
        //listener that reloads page after 3 sec to avoid Cypress wait for navigating to the linked resources
        cy.window().document().then(function (doc) {
            doc.addEventListener('click', () => {
              // this adds a listener that reloads your page 
              // after 5 seconds from clicking the download button
                setTimeout(function () { doc.location.reload() }, 3000)
            })

            //click Download button
            cy.get('.button__content--desktop').contains('DOWNLOAD').click();
        })
        
        //verify downloaded file name and extension
        cy.readFile('cypress/downloads/' + 'EPAM_Corporate_Overview_Q3_october' + '.pdf').should('exist');

    }); 

    

});