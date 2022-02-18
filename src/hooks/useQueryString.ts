import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

type QueryString<T extends string> = {
    [query in T]: string;
};

const useQueryString = <T extends string>() => {
    const { search } = useLocation();

    return parse(search) as QueryString<T>;
};

export default useQueryString;
