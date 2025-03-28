import React from 'react';
import {H5} from "@blueprintjs/core";
import {RJSFSchema} from "@rjsf/utils";

export const TitleField = ({ id, title, uiSchema }: { id: string, title: string, uiSchema: RJSFSchema }): React.JSX.Element=> {
    return <H5 id={id}>{(uiSchema && uiSchema['ui:title']) || title}</H5>;
};