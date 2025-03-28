import React, {ChangeEvent, FocusEvent, SyntheticEvent, useCallback} from 'react';
import {
    ariaDescribedByIds,
    enumOptionsValueForIndex,
    getUiOptions,
    WidgetProps,
} from '@rjsf/utils';
import {FormGroup, HTMLSelect} from "@blueprintjs/core";
import {getDefaultRegistry} from "@rjsf/core";

function getValue(event: SyntheticEvent<HTMLSelectElement>, multiple: boolean) {
    if (multiple) {
        return Array.from((event.target as HTMLSelectElement).options)
            .slice()
            .filter((o) => o.selected)
            .map((o) => o.value);
    }
    return (event.target as HTMLSelectElement).value;
}

/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export const  SelectWidget = (props: WidgetProps) :React.JSX.Element => {
    const {
        schema,
        id,
        options,
        value,
        required,
        disabled,
        multiple = false,
        autofocus = false,
        onChange,
        onBlur,
        onFocus,
        placeholder,
        uiSchema,
        label
    } = props
    const {enumOptions, enumDisabled, emptyValue: optEmptyVal} = options;
    const emptyValue = multiple ? [] : '';

    const handleFocus = useCallback(
        (event: FocusEvent<HTMLSelectElement>) => {
            const newValue = getValue(event, multiple);
            return onFocus(id, enumOptionsValueForIndex(newValue, enumOptions, optEmptyVal));
        },
        [onFocus, id, schema, multiple, enumOptions, optEmptyVal]
    );

    const handleBlur = useCallback(
        (event: FocusEvent<HTMLSelectElement>) => {
            const newValue = getValue(event, multiple);
            return onBlur(id, enumOptionsValueForIndex(newValue, enumOptions, optEmptyVal));
        },
        [onBlur, id, schema, multiple, enumOptions, optEmptyVal]
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            const newValue = getValue(event, multiple);
            return onChange(enumOptionsValueForIndex(newValue, enumOptions, optEmptyVal));
        },
        [onChange, schema, multiple, enumOptions, optEmptyVal]
    );

    const showPlaceholderOption = !multiple && schema.default === undefined;

    const registry = getDefaultRegistry();

    const uiProps = getUiOptions(uiSchema);
    const uiHelperText = uiProps['ui:help'] || schema.description;
    const uiLabel = uiProps['ui:title'] || schema.title || label;
    return (
        <FormGroup
            disabled={disabled}
            helperText={uiHelperText as string}
            label={uiLabel as string}
            labelFor={id}
            labelInfo={
                (label || uiProps['ui:title'] || schema.title) && required
                    ? '(required)'
                    : null
            }
        >
            {multiple ? (
                <div className={"selectWrapper"}>
                    <registry.widgets.SelectWidget {...props} />
                </div>
            ) : (
        <HTMLSelect
            id={id}
            fill
            disabled={disabled}
            required={required}
            autoFocus={autofocus}
            onBlur={handleBlur}
            value={typeof value === 'undefined' ? emptyValue : value}
            onFocus={handleFocus}
            onChange={handleChange}
            aria-describedby={ariaDescribedByIds(id)}
        >
            {showPlaceholderOption && <option value=''>{placeholder}</option>}
            {Array.isArray(enumOptions) &&
                enumOptions.map(({value, label}, i) => {
                    const disabled = enumDisabled && enumDisabled.indexOf(value) !== -1;
                    return (
                        <option key={i+1} value={String(i)} disabled={disabled}>
                            {label}
                        </option>
                    );
                })}
        </HTMLSelect>
            )}
        </FormGroup>
    );
}
