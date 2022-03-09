import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import * as atoms from 'src/atoms';

import Review from './Review';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ mapId: '1', kakaoAddressId: '2' })
}));

// const mockUserMeState = jest.fn();

// jest.mock('src/atoms', () => ({
//     ...jest.requireActual('src/atoms'),
//     useMapMarkerState: () => ({
//         markers: [
//             {
//                 id: 1,
//                 name: '올림픽공원역 5호선',
//                 kakaoAddressId: 2,
//                 address: 'address',
//                 roadAddress: 'roadAddress',
//                 latitude: 80,
//                 longitude: 80,
//                 isMyLocation: false,
//                 isLike: false,
//                 likeCount: 0,
//                 replyCount: 0
//             }
//         ],
//         setMarkers: jest.fn()
//     })
// }));

// jest.mock('src/atoms/me', () => ({
//     useMeState: () => ({
//         me: {},
//         setMe: jest.fn()
//     })
// }));

Object.defineProperty(atoms, 'useMapMarkerState', {
    writable: true
});

describe('Review', () => {
    beforeEach(() => {
        jest.spyOn({ hello: () => '3' }, 'hello');
        jest.spyOn(atoms, 'useMapMarkerState').mockReturnValue({
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
                    replyCount: 0
                }
            ],
            setMarkers: jest.fn()
        });
    });

    test('Not Login user e2e', async () => {
        mockAllIsIntersecting(0);

        render(<Review />, {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
                </BrowserRouter>
            )
        });

        await waitFor(() => expect(screen.getByText('올림픽공원역 5호선')).toBeInTheDocument());

        // expect(container.getByH('h3')).toBeInTheDocument()
        // const textarea = screen.getByRole('textarea');
        const textarea = screen.getByTestId('commentTextarea') as HTMLTextAreaElement;
        // fireEvent.change(textarea, { target: { value: '댓글' } });
        expect(textarea.disabled).toBe(true);
        expect(textarea.value).toBe('');
    });

    test('Login user e2e', async () => {
        const { default: Review } = await import('./Review');
        render(<Review />, {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
                </BrowserRouter>
            )
        });

        await waitFor(() => expect(screen.getByText('올림픽공원역 5호선')).toBeInTheDocument());

        // expect(container.getByH('h3')).toBeInTheDocument()
        // const textarea = screen.getByRole('textarea');
        const textarea = screen.getByTestId('commentTextarea') as HTMLTextAreaElement;
        fireEvent.change(textarea, { target: { value: '댓글' } });
        expect(textarea.disabled).toBe(false);
        expect(textarea.value).toBe('댓글');
    });
});
