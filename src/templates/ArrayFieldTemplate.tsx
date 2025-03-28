import React from 'react';
import {getDefaultRegistry} from '@rjsf/core';
import {ArrayFieldTemplateProps, getUiOptions, Registry, RJSFSchema, UiSchema} from '@rjsf/utils';
import {Button, ButtonGroup} from '@blueprintjs/core';
import {TitleField} from "../fields/TitleField";
import {DescriptionField} from "../fields/DescriptionField";
import {ArrayFieldTemplateItemType} from "@rjsf/utils/src/types";

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps): React.JSX.Element => {
    let {schema, registry} = props;
    if (!registry) {
        registry = getDefaultRegistry() as Registry
    }


    if (registry.schemaUtils.isMultiSelect(schema)) {
        return <DefaultFixedArrayFieldTemplate props={schema}/>;
    } else {
        return <DefaultNormalArrayFieldTemplate props={schema}/>;
    }
};

const ArrayFieldTitle = ({idSchema, title, uiSchema}: {
    idSchema: RJSFSchema,
    title: string,
    uiSchema: UiSchema
}): React.JSX.Element | null => {
    if (!title) {
        return null;
    }

    const id = `${idSchema.$id}__title`;
    return <TitleField id={id} title={title} uiSchema={uiSchema}/>;
};

const ArrayFieldDescription = ({idSchema, description}: { idSchema: RJSFSchema, description: string }) => {
    if (!description) {
        return null;
    }

    const id = `${idSchema.$id}__description`;
    return <DescriptionField id={id} description={description}/>;
};

// Used in the two templates
const DefaultArrayItem = (props: ArrayFieldTemplateItemType) => {
    return (
        <div key={props.key}>
            <div style={{display: 'flex', gap: 10, alignItems: "center"}}>
                <div style={{flex: 1}}>{props.children}</div>

                <div>
                    {props.hasToolbar && (
                        <ButtonGroup variant={"minimal"} style={{verticalAlign: "middle"}}>
                            {(props.hasMoveUp || props.hasMoveDown) && (
                                <Button
                                    icon="arrow-up"
                                    tabIndex={-1}
                                    disabled={
                                        props.disabled || props.readonly || !props.hasMoveUp
                                    }
                                    onClick={props.onReorderClick(props.index, props.index - 1)}
                                />
                            )}

                            {(props.hasMoveUp || props.hasMoveDown) && (
                                <Button
                                    icon="arrow-down"
                                    tabIndex={-1}
                                    disabled={
                                        props.disabled || props.readonly || !props.hasMoveDown
                                    }
                                    onClick={props.onReorderClick(props.index, props.index + 1)}
                                />
                            )}

                            {props.hasRemove && (
                                <Button
                                    icon="trash"
                                    tabIndex={-1}
                                    disabled={props.disabled || props.readonly}
                                    onClick={props.onDropIndexClick(props.index)}
                                />
                            )}
                        </ButtonGroup>
                    )}
                </div>
            </div>
        </div>
    );
};

const DefaultFixedArrayFieldTemplate = ({props}: { props: RJSFSchema }) => {
    const arrayItems = props.items as ArrayFieldTemplateItemType[];
    const options = getUiOptions(props.uiSchema);
    const {title} = props
    let uiTitle = options['ui:title'] || title;
    return (
        <div className={props.className}>
            <ArrayFieldTitle
                idSchema={props.idSchema}
                title={uiTitle as string}
                uiSchema={options}
            />

            {(props.uiSchema['ui:description'] || props.schema.description) && (
                <div
                    className="field-description"
                    key={`field-description-${props.idSchema.$id}`}
                >
                    {props.uiSchema['ui:description'] || props.schema.description}
                </div>
            )}

            <div
                className="row array-item-list"
                key={`array-item-list-${props.idSchema.$id}`}
            >
                {arrayItems?.map(DefaultArrayItem)}
            </div>

            {props.canAdd && (
                <Button
                    fill icon="plus"
                    className="array-item-add"
                    onClick={props.onAddClick}
                    disabled={props.disabled || props.readonly}
                    style={{margin: "5px"}}
                />
            )}
        </div>
    );
};

const DefaultNormalArrayFieldTemplate = ({props}: { props: RJSFSchema }) => {
    const arrayItems = props.items as ArrayFieldTemplateItemType[];
    return (
        <div>
            <ArrayFieldTitle
                idSchema={props.idSchema}
                title={props.uiSchema['ui:title'] || props.title}
                uiSchema={props.uiSchema}
            />

            {(props.uiSchema['ui:description'] || props.schema.description) && (
                <ArrayFieldDescription
                    idSchema={props.idSchema}
                    description={
                        props.uiSchema['ui:description'] || props.schema.description
                    }
                />
            )}

            <div key={`array-item-list-${props.idSchema.$id}`}>
                {arrayItems?.map(DefaultArrayItem)}

                {props.canAdd && (
                    <Button
                        fill icon="plus"
                        className="array-item-add"
                        onClick={props.onAddClick}
                        disabled={props.disabled || props.readonly}
                        style={{margin: "5px"}}
                    />
                )}
            </div>
        </div>
    );
};
