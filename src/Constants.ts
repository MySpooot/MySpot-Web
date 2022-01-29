export const BreakPoint = {
    PC: '@media (min-width: 768px)', // PC, Tablet
    Phone: '@media (max-width: 768px)'
} as const;

export const Dimension = {
    MaxWidth: '768px',
    Phone: '378px'
} as const;

export const Path = {
    home: '/home',
    login: '/login',
    join: '/join',
    myMap: '/map',
    search: '/search',
    authKakao: '/auth/kakao',
    myPage: '/mypage'
} as const;

export const Palette = {
    White: '#ffffff',
    Black: '#000000',
    Grey: {
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#eeeeee',
        '300': '#e0e0e0',
        '400': '#bdbdbd',
        '500': '#9e9e9e',
        '600': '#757575',
        '700': '#616161',
        '800': '#424242',
        '900': '#212121'
    },
    Blue: {
        '50': '#e3f2fd',
        '100': '#bbdefb',
        '200': '#90caf9',
        '300': '#64b5f6',
        '400': '#42a5f5',
        '500': '#2196f3',
        '600': '#1e88e5',
        '700': '#1976d2',
        '800': '#1565c0',
        '900': '#0d47a1',
        a100: '#82b1ff',
        a200: '#448aff',
        a400: '#2979ff',
        a700: '#2962ff'
    }
};
