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

describe('Private Map', () => {
    before(() => {
        Setup.privateMap();
    });

    it('should show code input', () => {
        cy.get('h3').should('have.text', '접근이 제한되어 있는 지도');

        const input = cy.findByPlaceholderText('보안코드를 입력해주세요.');
        input.type('12345');
        input.invoke('val').should('eq', '1234');
    });
});
