import { atom, useAtom } from 'jotai';

import { GetMyLocationResponse } from 'src/api/marker/types';

const locationState = atom<GetMyLocationResponse[] | undefined>(undefined);

export const useMyLocationState = () => {
    const [locations, setLocations] = useAtom(locationState);

    return { locations, setLocations };
};
