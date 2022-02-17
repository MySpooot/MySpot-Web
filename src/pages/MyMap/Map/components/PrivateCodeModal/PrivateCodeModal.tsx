import React, { FC, useState } from 'react';
import { useMutation } from 'react-query';

import Modal from 'src/components/Modal';
import { checkPrivateCode } from 'src/api/map';

type PrivateCodeModalProps = {
    mapId: number;
    onCodeEnterSuccess: (accessible: boolean) => void;
    onCodeEnterFail?: () => void;
};

const PrivateCodeModal: FC<PrivateCodeModalProps> = ({ mapId, onCodeEnterSuccess, onCodeEnterFail }) => {
    const { mutate: onPrivateCodeEnterClick } = useMutation(() => checkPrivateCode({ mapId }, { code: privateCode }), {
        onSuccess: data => {
            onCodeEnterSuccess(data);
        },
        onError: () => {
            onCodeEnterFail?.();
        }
    });

    const [privateCode, setPrivateCode] = useState('');

    return (
        <Modal>
            <h3>PrivateMap입니다. 코드를 입력해주세요.</h3>
            <input value={privateCode} onChange={event => setPrivateCode(event.target.value)} />
            <button onClick={() => onPrivateCodeEnterClick()}>ENTER</button>
        </Modal>
    );
};

export default PrivateCodeModal;
