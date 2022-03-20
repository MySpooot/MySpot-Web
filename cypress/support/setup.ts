import { BaseUrl } from '@/Constants';

beforeEach(() => {
    cy.fixture('/auth/me').then(me => {
        cy.intercept(`${BaseUrl}/auth/me`, me);
    });
});
