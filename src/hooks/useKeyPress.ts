import { useEffect } from 'react';

const useKeyPress = (key: string, callback: () => void) => {
    useEffect(() => {
        const keyPressCallback = (event: KeyboardEvent) => {
            if (event.code === key) {
                callback();
            }
        };

        window.addEventListener('keypress', keyPressCallback);

        return () => window.removeEventListener('keypress', keyPressCallback);
    }, [key, callback]);
};

export default useKeyPress;
