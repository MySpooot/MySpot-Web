import '@testing-library/cypress/add-commands';

Cypress.Commands.add('getByTestId', (id: string, selector: string = '') => cy.get(`[data-testid=${id}] ${selector}`));

Cypress.Commands.add('setToken', () => {
    localStorage.setItem(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJ1c2VyTGV2ZWwiOjEsImlhdCI6MTY0OTc2OTE0MCwiZXhwIjoxNjUyMzYxMTQwfQ.CRTiFxVb9Iw4GknUEC6CmMebb7WL_qwZe6R8PDQiGpU'
    );
});

Cypress.Commands.add('clearToken', () => {
    localStorage.removeItem('token');
});

Cypress.Commands.add('interceptRequest', (...actions: InterceptRequestAction[]) => {
    actions.forEach(action => {
        switch (action) {
            case 'GET /auth/me':
                cy.fixture('auth/me').then(me => {
                    cy.intercept(getEndPoint(action), me);
                });

                break;
            case 'POST /auth/login':
                break;
            default:
                throw new Error('Unexpected action!');
        }
    });
});

type InterceptRequestAction = `${'GET' | 'POST' | 'PUT' | 'DELETE'} ${
    | AuthRequestUrl
    | MapRequestUrl
    | MarkerRequestUrl
    | ReplyRequestUrl
    | LikeRequestUrl}`;
type AuthRequestUrl = '/auth/me' | '/auth/login' | '/auth/logout';
type MapRequestUrl =
    | '/map/*/detail'
    | '/map'
    | '/map/*'
    | '/map/recent'
    | '/map/recent/*'
    | '/map/favorite'
    | '/map/favorite/*'
    | '/map/*/code'
    | '/map/*/code/match';
type MarkerRequestUrl = '/map/*/marker' | '/map/marker/*' | '/map/marker/location' | '/map/marker/location/*';
type ReplyRequestUrl = '/map/marker/*/replies' | '/map/marker/replies/*';
type LikeRequestUrl = '/map/marker/*/like';
const getEndPoint = (action: InterceptRequestAction) => `https://nestjs-map.herokuapp.com${action.split(' ')[1]}`;
