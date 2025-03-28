import React from 'react';
import {FormGroup, NumericInput} from '@blueprintjs/core';
import type {WidgetProps} from '@rjsf/utils';
import {getUiOptions} from "@rjsf/utils";

export const UpDownWidget = (props : WidgetProps) => {
    const {
        id,
        required,
        readonly,
        disabled,
        label,
        value,
        onChange,
        onBlur,
        onFocus,
        autofocus,
        schema,
        uiSchema,
        placeholder,
    } = props
    const _onChange = (value: any) => {
        onChange(value);
    };
    const _onBlur = ({ target: { value } } : {target: {value: string}}) => onBlur(id, value);
    const _onFocus = ({ target: { value } } : {target: {value: string}}) => onFocus(id, value);

    const uiProps = getUiOptions(uiSchema);
    const uiDescription = uiProps['ui:description'] || schema.description
    const uiLabel = uiProps['ui:title'] || schema.title || label
    return (
        <FormGroup
            disabled={disabled}
            helperText={uiDescription as string}
            label={uiLabel as string}
            labelFor={id}
            labelInfo={
                (label || uiProps['ui:title'] || schema.title) && required
                    ? '(required)'
                    : null
            }
        >
            <NumericInput
                placeholder={placeholder}
                onValueChange={_onChange}
                disabled={disabled}
                readOnly={readonly}
                autoFocus={autofocus}
                onChange={_onChange}
                onBlur={_onBlur}
                onFocus={_onFocus}
                value={value}
                fill
            />
        </FormGroup>
    );
};
