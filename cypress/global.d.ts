declare namespace Cypress {
    interface Chainable {
        getByTestId(testId: string, selector?: string): Chainable<unknown>;
        setToken(): Chainable<unknown>;
        clearToken(): Chainable<unknown>;
        interceptRequest(action: any): Chainable<unknown>;
    }
}
