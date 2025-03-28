import React, {ChangeEvent, FocusEvent, useCallback} from 'react';
import {
    ariaDescribedByIds,
    enumOptionsDeselectValue,
    enumOptionsIsSelected,
    enumOptionsSelectValue,
    enumOptionsValueForIndex,
    getUiOptions,
} from '@rjsf/utils';
import type {WidgetProps} from '@rjsf/utils';

import {Checkbox, FormGroup} from '@blueprintjs/core';

/** The `CheckboxesWidget` is a widget for rendering checkbox groups.
 *  It is typically used to represent an array of enums.
 *
 * @param props - The `WidgetProps` for this component
 */
export const CheckboxesWidget = ({
                                     id,
                                     disabled,
                                     options: {inline = false, enumOptions, enumDisabled, emptyValue},
                                     value,
                                     autofocus = false,
                                     readonly,
                                     onChange,
                                     onBlur,
                                     onFocus,
                                     uiSchema,
                                     schema,
                                     label,
                                     required
                                 }: WidgetProps): React.JSX.Element => {
    const checkboxesValues = Array.isArray(value) ? value : [value];

    const handleBlur = useCallback(
        ({target}: FocusEvent<HTMLInputElement>) =>
            onBlur(id, enumOptionsValueForIndex(target && target.value, enumOptions, emptyValue)),
        [onBlur, id]
    );

    const handleFocus = useCallback(
        ({target}: FocusEvent<HTMLInputElement>) =>
            onFocus(id, enumOptionsValueForIndex(target && target.value, enumOptions, emptyValue)),
        [onFocus, id]
    );

    const uiProps = getUiOptions(uiSchema);
    const uiDescription = uiProps['ui:description'] || schema.description
    const uiLabel = uiProps['ui:title'] || schema.title || label
    return (
        <FormGroup
            disabled={disabled}
            helperText={uiDescription as string}
            label={uiLabel as string}
            labelInfo={
                (label || uiProps['ui:title'] || schema.title) && required
                    ? '(required)'
                    : null
            }
        >
            {Array.isArray(enumOptions) &&
                enumOptions.map((option, index) => {
                    const checked = enumOptionsIsSelected(option.value, checkboxesValues);
                    const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;

                    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
                        if (event.target.checked) {
                            onChange(enumOptionsSelectValue(index, checkboxesValues, enumOptions));
                        } else {
                            onChange(enumOptionsDeselectValue(index, checkboxesValues, enumOptions));
                        }
                    };

                    return (
                        <Checkbox
                            key={index + 1}
                            id={`${id}_${index}`}
                            label={option.label}
                            required={required}
                            inline={inline}
                            checked={checked}
                            autoFocus={autofocus && index === 0}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            disabled={disabled || itemDisabled || readonly}
                            aria-describedby={ariaDescribedByIds(id)}
                        />
                    );
                })}
        </FormGroup>
    );
}
