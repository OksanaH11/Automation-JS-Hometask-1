export class AboutPage{

    urlAboutPage = '/about';
    iconCompanyLogo = '.desktop-logo > .header__logo-light';
    btnDownload = '.button__content--desktop';

    openPage() {
        return cy.visit(this.urlAboutPage);  
    }

    clickIconCompanyLogo(){
        cy.get(this.iconCompanyLogo).should('be.visible').click();
    }

    clickbtnDownload(){
    
        const btnlocal = this.btnDownload;

        cy.window().document().then(function (doc) {

            // listener that reloads page after 3 seconds from clicking the Download button
            // to avoid Cypress wait for navigating to the linked resources      
            doc.addEventListener('click', () => {
                setTimeout(function () { doc.location.reload() }, 3000)
            })

            cy.get(btnlocal).contains('DOWNLOAD').click(); 
        })  
    }

}