import React from 'react';
import {Callout} from '@blueprintjs/core';

export const DescriptionField = ({id, description}: { id: string, description: string }): React.JSX.Element | null => {
    if (!description) {
        return null;
    }

    return <Callout id={id} style={{marginBottom: '1em'}}>{description}</Callout>;
}
