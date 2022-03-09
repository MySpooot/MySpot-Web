import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import Review from 'src/pages/MyMap/Review';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ mapId: '1', kakaoAddressId: '2' })
}));

jest.mock('src/atoms', () => ({
    ...jest.requireActual('src/atoms'),
    useMeState: () => ({
        me: {},
        setMe: jest.fn()
    }),
    useMapMarkerState: () => ({
        markers: [
            {
                id: 1,
                name: '올림픽공원역 5호선',
                kakaoAddressId: 2,
                address: 'address',
                roadAddress: 'roadAddress',
                latitude: 80,
                longitude: 80,
                isMyLocation: false,
                isLike: false,
                likeCount: 0,
                replyCount: 2
            }
        ],
        setMarkers: jest.fn()
    }),
    useMarkerRepliesState: () => ({
        markerReplies: [
            { id: 1, created: '22.03.01', userId: 2, nickName: '백인재', message: '후기입니다' },
            { id: 2, created: '22.03.01', userId: 2, nickName: '백인재', message: '후기입니다2' }
        ],
        setMarkerReplies: jest.fn()
    })
}));

jest.mock('src/api', () => ({
    ...jest.requireActual('src/api'),
    createReply: jest.fn().mockResolvedValue({
        id: 3,
        created: Date.now(),
        message: '후기입니다3',
        userId: 2,
        markerId: 3,
        userNickName: '백인재'
    })
}));

describe('Review', () => {
    test('Login user e2e', async () => {
        mockAllIsIntersecting(0);

        render(<Review />, {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
                </BrowserRouter>
            )
        });

        await waitFor(() => expect(screen.getByText('올림픽공원역 5호선')).toBeInTheDocument());

        const textarea = screen.getByTestId('commentTextarea') as HTMLTextAreaElement;
        const registerButton = screen.getByTestId('registerButton') as HTMLButtonElement;

        expect(textarea.disabled).toBe(false);
        expect(registerButton.disabled).toBe(true);

        fireEvent.change(textarea, { target: { value: '댓글' } });
        expect(textarea.value).toBe('댓글');
        expect(registerButton.disabled).toBe(false);

        expect(screen.getByTestId('replyCount').textContent).toBe('2개');

        fireEvent.click(registerButton);
        await waitFor(() => expect(screen.getByTestId('replyCount').textContent).toBe('3개'));
        expect(textarea.value).toBe('');
    });
});
