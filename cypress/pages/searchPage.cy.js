export class SearchPage{

iconSearch = '.search-icon';
formSearch = '#new_form_search';
lblSearchResult = '.search-results__counter';
listSearchResulItems = '.search-results__items > article > p';

inputSearchValue(text){
    cy.get(this.iconSearch).click();
    cy.get(this.formSearch).should('be.visible').type(text, {delay: 50}).type('{selectall}{enter}');
}

getlblSearchResult(){
   return cy.get(this.lblSearchResult);
}

getlistSearchResulItems(){
    return cy.get(this.listSearchResulItems);
}

getSearchItem(item){
    return cy.wrap(item);
}

}