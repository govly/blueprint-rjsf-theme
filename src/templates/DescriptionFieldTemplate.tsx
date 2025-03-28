import React from 'react';
import {Callout} from '@blueprintjs/core';
import type {DescriptionFieldProps} from "@rjsf/utils";

export const DescriptionFieldTemplate = (props : DescriptionFieldProps) => {
    const {id, description} = props
    if (!description) {
        return null;
    }

    return <Callout id={id} style={{marginBottom: '1em'}}>{description}</Callout>;
}
