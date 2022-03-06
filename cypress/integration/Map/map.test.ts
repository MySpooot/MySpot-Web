beforeEach(() => {
    cy.intercept('https://nestjs-map.herokuapp.com/auth/me', {
        id: 7,
        nickname: '백인재',
        thumbnail: 'http://k.kakaocdn.net/dn/CKOTn/btrfEm77yMD/0yeOb5spzcu4Edr1c6bwHk/img_110x110.jpg'
    });
    cy.intercept('https://nestjs-map.herokuapp.com/map/111/detail', {
        accessible: true,
        isFavorite: true,
        isOwner: true,
        isPrivate: false,
        mapId: 111,
        mapName: 'Cypress Map'
    });
    cy.intercept('https://nestjs-map.herokuapp.com/map/111/marker', [
        {
            address: '서울 강동구 천호동 447',
            addressId: 21160690,
            id: 96,
            isLike: true,
            isMyLocation: true,
            latitude: '37.5358819145235',
            likeCount: 1,
            locationName: '강동역 5호선',
            longitude: '127.132396300314',
            replyCount: 0,
            roadAddress: '서울 강동구 천호대로 지하 1097'
        },
        {
            address: '서울 송파구 방이동 89-28',
            addressId: 21160754,
            id: 41,
            isLike: false,
            isMyLocation: false,
            latitude: '37.5163389870117',
            likeCount: 0,
            locationName: '올림픽공원역 5호선',
            longitude: '127.130963675401',
            replyCount: 31,
            roadAddress: '서울 송파구 양재대로 지하 1233'
        }
    ]);

    cy.visit('/map/111');
});

describe('Map', () => {
    it('loggedIn & has map accessible user', () => {
        cy.get('h3').should('have.text', 'Cypress Map');

        cy.get('img[alt="marker"]').first().click();

        cy.getByTestId('placeOverlay').should('be.visible');
        cy.getByTestId('placeOverlay', 'h3').should('have.text', '강동역 5호선');
        cy.getByTestId('address').should('have.text', '서울 강동구 천호동 447');
        cy.getByTestId('roadAddress').should('have.text', '서울 강동구 천호대로 지하 1097');
    });
});
