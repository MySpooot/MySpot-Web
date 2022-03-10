import * as Setup from './setup';

describe('Review: loginUser', () => {
    before(() => {
        Setup.loginUser();
    });

    it('login user', () => {
        cy.get('h3').first().should('have.text', '올림픽공원역 5호선');

        cy.get('textarea').should('be.enabled');
        cy.get('textarea').invoke('attr', 'placeholder').should('contain', '후기를 작성해 보세요.');
        cy.getByTestId('registerButton').should('have.text', '등록하기');
        cy.getByTestId('registerButton').should('be.disabled');

        cy.get('textarea').type('후기입니다.');
        cy.getByTestId('registerButton').should('be.enabled');

        cy.get('h3').last().should('have.text', '후기');
        cy.get('h3 + div').last().should('have.text', '31개');
    });
});

describe('Review: notLoginUser', () => {
    before(() => {
        Setup.notLoginUser();
    });

    it('not login user', () => {
        cy.get('textarea').should('be.disabled');
        cy.get('textarea').invoke('attr', 'placeholder').should('contain', '로그인한 유저만 후기를 작성할 수 있습니다.');

        cy.getByTestId('registerButton').should('have.text', '등록하기');
        cy.getByTestId('registerButton').should('be.disabled');
    });
});
