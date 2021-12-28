export const Color = {};

export const BreakPoint = {
    PC: '@media (min-width: 768px)', // PC, Tablet
    Phone: '@media (max-width: 768px)'
} as const;

export const Path = {
    home: '/home',
    login: '/login',
    join: '/join',
    myMap: '/mymap',
    authKakao: '/auth/kakao',
    mypage: '/mypage'
} as const;
