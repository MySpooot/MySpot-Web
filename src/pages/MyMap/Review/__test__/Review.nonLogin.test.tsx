import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
    useMapMarkerState: () => ({
        markers: [
            {
                id: 1,
                name: '올림픽공원역 5호선',
                kakaoAddressId: 2,
                address: '송파구 오륜동',
                roadAddress: '양재대로 1218',
                latitude: 80,
                longitude: 80,
                isMyLocation: false,
                isLike: false,
                likeCount: 0,
                replyCount: 0
            }
        ],
        setMarkers: jest.fn()
    }),
    useMarkerRepliesState: () => ({
        markerReplies: [],
        setMarkerReplies: jest.fn()
    })
}));

describe('Review', () => {
    test('Non Login user e2e', async () => {
        mockAllIsIntersecting(0);

        render(<Review />, {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
                </BrowserRouter>
            )
        });

        await waitFor(() => expect(screen.getByText('올림픽공원역 5호선')).toBeInTheDocument());
        expect(screen.getByText('송파구 오륜동')).toBeInTheDocument();
        expect(screen.getByText('양재대로 1218')).toBeInTheDocument();

        const textarea = screen.getByTestId('commentTextarea') as HTMLTextAreaElement;
        const registerButton = screen.getByTestId('registerButton') as HTMLButtonElement;

        expect(textarea.disabled).toBe(true);
        expect(registerButton.disabled).toBe(true);

        await waitFor(() => expect(screen.getByText('후기가 없습니다.')).toBeInTheDocument());
        expect(screen.getByTestId('replyCount').textContent).toBe('0개');
    });
});
