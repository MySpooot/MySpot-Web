import { BaseUrl } from '@/Constants';

export const loginUser = () => {
    cy.setToken();

    cy.intercept(`${BaseUrl}/map/111/detail`, {
        accessible: true,
        isFavorite: true,
        isOwner: true,
        isPrivate: false,
        mapId: 111,
        mapName: 'Cypress Map'
    });
    cy.intercept(`${BaseUrl}/map/111/marker`, [
        {
            address: '서울 송파구 방이동 89-28',
            addressId: 21160754,
            id: 41,
            isLike: false,
            isMyLocation: false,
            latitude: '37.5163389870117',
            likeCount: 2,
            locationName: '올림픽공원역 5호선',
            longitude: '127.130963675401',
            replyCount: 31,
            roadAddress: '서울 송파구 양재대로 지하 1233'
        }
    ]);

    cy.fixture('/marker/replies').then(replies => {
        cy.intercept({ url: `${BaseUrl}/map/marker/*/replies?*`, query: { offset: '0' } }, replies);
    });
    cy.fixture('/marker/replies2').then(replies => {
        cy.intercept({ url: `${BaseUrl}/map/marker/*/replies?*`, query: { offset: '10' } }, replies);
    });
    cy.fixture('/marker/replies3').then(replies => {
        cy.intercept({ url: `${BaseUrl}/map/marker/*/replies?*`, query: { offset: '20' } }, replies);
    });

    cy.visit('/map/111/review/21160754');
};

export const notLoginUser = () => {
    cy.clearToken();

    cy.intercept(`${BaseUrl}/map/111/detail`, {
        accessible: true,
        isFavorite: true,
        isOwner: true,
        isPrivate: false,
        mapId: 111,
        mapName: 'Cypress Map'
    });
    cy.intercept(`${BaseUrl}/map/111/marker`, [
        {
            address: '서울 송파구 방이동 89-28',
            addressId: 21160754,
            id: 41,
            isLike: false,
            isMyLocation: false,
            latitude: '37.5163389870117',
            likeCount: 2,
            locationName: '올림픽공원역 5호선',
            longitude: '127.130963675401',
            replyCount: 31,
            roadAddress: '서울 송파구 양재대로 지하 1233'
        }
    ]);

    cy.visit('/map/111/review/21160754');
};
