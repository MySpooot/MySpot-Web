import { useMediaQuery as useResponsive } from 'react-responsive';

const useMediaQuery = () => {
    const isPhone = useResponsive({ query: '(max-width: 768px)' });

    return { isPhone };
};

export default useMediaQuery;
