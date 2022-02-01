import { useEffect } from 'react';

const useKeyPress = (key: string, callback: () => void) => {
    useEffect(() => {
        const keyPressCallback = (event: KeyboardEvent) => {
            if (event.code === key) {
                callback();
            }
        };

        window.addEventListener('keydown', keyPressCallback);

        return () => window.removeEventListener('keydown', keyPressCallback);
    }, [key, callback]);
};

export default useKeyPress;
