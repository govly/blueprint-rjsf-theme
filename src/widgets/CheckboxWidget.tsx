import {Checkbox, FormGroup} from "@blueprintjs/core";
import {getUiOptions, schemaRequiresTrueValue, WidgetProps} from "@rjsf/utils";

export const CheckboxWidget = (props : WidgetProps) => {
    const {
        schema,
        id,
        value,
        disabled,
        readonly,
        label,
        autofocus,
        onBlur,
        onFocus,
        onChange,
        uiSchema
    } = props;

    const required = schemaRequiresTrueValue(schema);
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
            <Checkbox
                id={id}
                checked={typeof value === 'undefined' ? false : value}
                required={required}
                disabled={disabled || readonly}
                autoFocus={autofocus}
                type="checkbox"
                onChange={(event) => onChange(event.target.checked)}
                onBlur={onBlur && ((event) => onBlur(id, event.target.checked))}
                onFocus={onFocus && ((event) => onFocus(id, event.target.checked))}
            >
                Should we?
            </Checkbox>
        </FormGroup>
    );
}