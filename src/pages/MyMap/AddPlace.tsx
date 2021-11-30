import React, { FC, useRef } from 'react';
import useSearchMap from '@src/hooks/useSearchMap';
const AddPlace: FC = () => {
    const searchWord = '';

    const { searchPlaces, data } = useSearchMap();
    searchPlaces(searchWord);
    return (
        <>
            <input type='text' {...searchWord} />
            <button>검색</button>
            {data}
        </>
    );
};

export default AddPlace;
