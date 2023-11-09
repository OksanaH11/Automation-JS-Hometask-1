
export class ContactPage{
    
    urlContact = '/about/who-we-are/contact';
    inputFirstName = 'input#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_first_name';
    inputLastName = 'input#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_last_name';
    inputUserEmail = '#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_email';
    inputUserPhone = '#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_phone';
    inputHearAbout = '#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about';
    chkIConsent =  '[name="gdprConsent"]';

    openPage() {
        return cy.visit(this.urlContact);  
    };

    getInputFirstName (){
        return cy.get(this.inputFirstName);
    };

    getInputLastName (){
        return cy.get(this.inputLastName);
    };

    getInputUserEmail (){
        return cy.get(this.inputUserEmail);
    };

    getInputUserPhone (){
        return cy.get(this.inputUserPhone);
    };

    getInputHearAbout (){
        return cy.get(this.inputHearAbout);
    };

    getchkIConsent () {
        return cy.get(this.chkIConsent);  
    }

}