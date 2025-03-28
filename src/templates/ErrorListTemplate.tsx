import {Callout, Intent} from "@blueprintjs/core";
import type {ErrorListProps} from '@rjsf/utils';
import {TranslatableString} from "@rjsf/utils";
import React from "react";

export const ErrorListTemplate = ({errors, registry} : ErrorListProps) : React.JSX.Element => {
    const { translateString } = registry;
    return (
        <Callout title={translateString(TranslatableString.ErrorsLabel)} intent={Intent.DANGER} style={{marginBottom: 10}}>
            {errors.map((error, i) => {
                return <Text key={i + 1}>{error.stack}</Text>;
            })}
        </Callout>
    )
}

const Text = ({children, key}: {children: string, key: number}) : React.JSX.Element => {
    return (
        <div key={key}>
            {children}
        </div>
    )
}