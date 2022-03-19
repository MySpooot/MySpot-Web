import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

const useQueryString = <QueryString extends Record<string, string>>() => {
    const { search } = useLocation();

    return parse(search) as Partial<QueryString>;
};

export default useQueryString;
