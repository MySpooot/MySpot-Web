import * as Setup from './setup';

describe('Map', () => {
    before(() => {
        Setup.common();
    });

    it('loggedIn & has map accessible user', () => {
        cy.get('h1').should('have.text', 'Cypress Map');

        cy.get('img[alt="marker"]').first().click();

        cy.getByTestId('placeOverlay').should('be.visible');
        cy.getByTestId('placeOverlay', 'h3').should('have.text', '강동역 5호선');
        cy.getByTestId('address').should('have.text', '서울 강동구 천호동 447');
        cy.getByTestId('roadAddress').should('have.text', '서울 강동구 천호대로 지하 1097');
    });
});
