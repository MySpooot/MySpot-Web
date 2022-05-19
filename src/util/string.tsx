import React from 'react';

export const newlineToBr = (text?: string) => {
    if (!text) {
        return '';
    }

    return text.split('\n').map((line, i) => (
        <span key={i}>
            {line}
            <br />
        </span>
    ));
};
