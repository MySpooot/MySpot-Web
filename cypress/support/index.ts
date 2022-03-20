import './commands';
import './setup';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
