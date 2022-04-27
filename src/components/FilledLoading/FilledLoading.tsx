import React, { FC } from 'react';

import { Container } from './styles';
import Loading from 'src/components/Loading';

const FilledLoading: FC = () => (
    <Container>
        <Loading />
    </Container>
);

export default FilledLoading;
