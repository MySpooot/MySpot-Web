import { useMediaQuery as useResponsive } from 'react-responsive';

const useMediaQuery = () => {
    const isPhone = useResponsive({ query: '(max-width: 768px)' });
    const isBelowThanTablet = useResponsive({ query: '(max-width: 1000px)' });

    return { isPhone, isBelowThanTablet };
};

export default useMediaQuery;
