import React from 'react';
import {H5} from "@blueprintjs/core";
import type {TitleFieldProps} from "@rjsf/utils";

export const TitleFieldTemplate = (props : TitleFieldProps): React.JSX.Element=> {
    const {id, title, uiSchema, required} = props
    return (
        <H5 id={id}>
        {(uiSchema && uiSchema['ui:title']) || title}
            {required && <span style={{marginLeft: "5px"}}>*</span>}
        </H5>
    )
};