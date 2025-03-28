import {Button, ControlGroup, FormGroup, HTMLSelect, InputGroup, MenuItem, TextArea} from "@blueprintjs/core";
import React, {ChangeEvent, FocusEvent, FocusEventHandler, useState} from "react";
import type {ItemRenderer} from '@blueprintjs/select';
import {Suggest} from "@blueprintjs/select";
import type {WidgetProps} from '@rjsf/utils';
import {getUiOptions} from "@rjsf/utils";

export const TextWidget = (props: WidgetProps) => {
    const {
        id,
        placeholder,
        required,
        readonly,
        disabled,
        label,
        value,
        onChange,
        onBlur,
        onFocus,
        autofocus,
        options,
        schema,
        uiSchema,
    } = props;

    const inputTypes = [
        {value: "text", label: "Text"},
        {value: "random", label: "Random"},
        {value: "color", label: "Color"},
        {value: "textarea", label: "Textarea"},
        {value: "suggest", label: "Suggest"},
        {value: "other", label: "Other"},
    ]

    const rawType = schema.type;
    const setType = rawType === "string" ? "text" : `${rawType}`;
    const inferredType = inputTypes.some((i) => i.value === setType)
        ? setType
        : "other";

    const defaultTextType = id.toLowerCase().includes("color")
        ? "color"
        : inferredType;

    const [localValue, setLocalValue] = useState(value || "");
    const [textType, setTextType] = useState(defaultTextType);

    const handleTextTypeChange = (e : ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setTextType(newType);

        if (newType === "random") {
            onChange(Math.random().toString(36).substring(2, 15));
        }
    };

    const _onChange = ({target: {value}} : {target: {value: string}}) =>
        setLocalValue(value === '' ? options.emptyValue : value);
    const _onBlur = (e: FocusEvent<HTMLInputElement>) => {
        const val = e.target.value;
        onChange(val === "" ? options.emptyValue : val);
        onBlur(id, val);
    };
    const _onFocus = ({target: {value}} : {target: {value: string}}) => onFocus(id, value);

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
            <ControlGroup fill={true} vertical={false} style={{alignItems: "stretch"}}>
                <HTMLSelect options={inputTypes} onChange={handleTextTypeChange}/>
                {textType === "textarea" && (
                    <TextArea
                        id={id}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readonly}
                        autoFocus={autofocus}
                        onChange={_onChange}
                        onBlur={_onBlur as unknown as FocusEventHandler<HTMLTextAreaElement>}
                        onFocus={_onFocus}
                        value={localValue}
                        style={{resize: "vertical"}}
                    />
                )}
                {textType === "suggest" && (
                    <SuggestingInput
                        value={localValue}
                        onChange={onChange}
                        suggestions={getSuggestions(label)}
                    />
                )}
                {(!["textarea", "suggest"].includes(textType)) && (
                    <>
                        <InputGroup
                            id={id}
                            placeholder={placeholder}
                            disabled={disabled}
                            readOnly={readonly}
                            autoFocus={autofocus}
                            onChange={_onChange}
                            onBlur={_onBlur}
                            onFocus={_onFocus}
                            value={localValue}
                            type={textType}
                        />
                        {textType === "random" && (
                            <Button variant={"minimal"} icon={"refresh"} size={"small"}
                                    onClick={() => onChange(Math.random().toString(36).substring(2, 15))}
                            />
                        )}
                    </>
                )}
            </ControlGroup>
        </FormGroup>
    )
}

const SuggestingInput = ({
                             value,
                             onChange,
                             suggestions,
                         } : {value: string, onChange: any, suggestions: any}) => {
    const [inputValue, setInputValue] = useState(value || "");

    return (
        <Suggest
            inputValueRenderer={(val) : string => val}
            itemPredicate={(query, item) => item.toLowerCase().includes(query.toLowerCase())}
            items={suggestions || []}
            query={inputValue}
            onQueryChange={(_q, e) => {
                if (e) {
                    const val = e.target.value;
                    setInputValue(val);
                    onChange(val);
                }
            }}
            inputProps={{
                placeholder: "Start typing...",
            }}
            onItemSelect={(item) => {
                setInputValue(item)
                onChange(item)
            }}
            itemRenderer={renderSuggestItem}
            noResults={
                <MenuItem
                    text={"No suggestions :("}
                    disabled={true}
                    roleStructure={"listoption"}
                />
            }
            createNewItemFromQuery={(query) => query}
            createNewItemRenderer={renderCreateNewItem}
        />
    );
}

const renderCreateNewItem = (
    query: string,
    active: boolean,
    handleClick: React.MouseEventHandler<HTMLElement>
): React.JSX.Element => (
    <MenuItem
        icon="add"
        text={`Use "${query}"?`}
        active={active}
        onClick={handleClick}
        shouldDismissPopover={true}
    />
);

const renderSuggestItem: ItemRenderer<string> = (item, { handleClick, modifiers }) => (
    <MenuItem
        key={item}
        text={item}
        onClick={handleClick}
        active={modifiers.active}
        disabled={modifiers.disabled}
    />
);

const getSuggestions = (type : string): string[] => {
    const source = suggestionMap[type];
    if (!source) return [];
    return typeof source === 'function' ? source() : source;
}

const suggestionMap : Record<string, any> = {
    fontSize: ['12px', '14px', '16px', '1rem', '2em'],
    textAlign: ['left', 'center', 'right', 'justify'],
    position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    display: ['flex', 'block', 'inline', 'none', 'relative', 'absolute'],
    id: [Math.random().toString(36).substring(2, 15)],
    uuid: () => [crypto.randomUUID(), crypto.randomUUID()],
    random: () => {
        const randomItems = []
        for (let i = 0; i < 5; i++) {
            randomItems.push(Math.random().toString(36).substring(2, 15))
        }
        return randomItems
    }
};
