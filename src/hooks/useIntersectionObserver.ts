import { useState, useEffect } from 'react';

type UserIntersectionObserverParam = {
    callback: IntersectionObserverCallback;
    option?: IntersectionObserverInit;
};

const useIntersectionObserver = ({ callback, option }: UserIntersectionObserverParam) => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(callback, option);

        observer.observe(ref);

        return () => observer.disconnect();
    }, [ref, callback]); // eslint-disable-line react-hooks/exhaustive-deps

    return { setRef, callback };
};

export default useIntersectionObserver;
