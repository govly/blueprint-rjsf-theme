import React from 'react';
import {getDefaultRegistry} from '@rjsf/core';
import type {ArrayFieldTemplateItemType, ArrayFieldTemplateProps} from "@rjsf/utils";
import {
    getUiOptions,
    Registry,
    RJSFSchema,
    UiSchema,
    getTemplate
} from '@rjsf/utils';
import {Button, ButtonGroup} from '@blueprintjs/core';

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps): React.JSX.Element => {
    let {schema, registry} = props;
    if (!registry) {
        registry = getDefaultRegistry() as Registry
    }


    if (registry.schemaUtils.isMultiSelect(schema)) {
        return <DefaultFixedArrayFieldTemplate props={props}/>;
    } else {
        return <DefaultNormalArrayFieldTemplate props={props}/>;
    }
};

const ArrayFieldTitle = ({idSchema, title, uiSchema, required, schema, registry}: {
    idSchema: RJSFSchema,
    title: string,
    uiSchema: UiSchema,
    required: boolean | undefined,
    schema: RJSFSchema,
    registry: Registry
}): React.JSX.Element | null => {
    if (!title) {
        return null;
    }
    const options = getUiOptions(uiSchema);
    const TitleFieldTemplate = getTemplate<'TitleFieldTemplate'>('TitleFieldTemplate', registry, options);

    const id = `${idSchema.$id}__title`;
    return <TitleFieldTemplate id={id}
                               title={title}
                               uiSchema={uiSchema}
                               required={required}
                               schema={schema}
                               registry={registry}
    />;
};

const ArrayFieldDescription = ({idSchema, description, uiSchema, registry, schema}:
                               {
                                   idSchema: RJSFSchema,
                                   description: string,
                                   uiSchema: UiSchema,
                                   registry: Registry,
                                   schema: RJSFSchema
                               }) => {
    if (!description) {
        return null;
    }

    const options = getUiOptions(uiSchema);
    const DescriptionFieldTemplate = getTemplate<'DescriptionFieldTemplate'>(
        'DescriptionFieldTemplate',
        registry,
        options
    );
    const id = `${idSchema.$id}__description`;
    return <DescriptionFieldTemplate
        id={id}
        description={description}
        schema={schema}
        registry={registry}
    />;
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

const DefaultFixedArrayFieldTemplate = ({props}: { props: ArrayFieldTemplateProps }) => {
    const arrayItems = props.items as ArrayFieldTemplateItemType[];
    const options = getUiOptions(props.uiSchema);
    const {title} = props
    const uiTitle = options['ui:title'] || title;
    const uiDescription = options['ui:description'] || props.schema.description
    return (
        <div className={props.className}>
            <ArrayFieldTitle
                idSchema={props.idSchema}
                title={uiTitle as string}
                uiSchema={options}
                required={props.required}
                schema={props.schema}
                registry={props.registry}
            />

            {(options['ui:description'] || props.schema.description) && (
                <div
                    className="field-description"
                    key={`field-description-${props.idSchema.$id}`}
                >
                    {uiDescription as React.ReactNode}
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

const DefaultNormalArrayFieldTemplate = ({props}: { props: ArrayFieldTemplateProps }) => {
    const arrayItems = props.items
    const options = getUiOptions(props.uiSchema);
    const uiTitle = options['ui:title'] || props.title
    const uiDescription = options['ui:description'] || props.schema.description
    return (
        <div>
            <ArrayFieldTitle
                idSchema={props.idSchema}
                title={uiTitle as string}
                uiSchema={options}
                required={props.required}
                schema={props.schema}
                registry={props.registry}
            />

            {(options['ui:description'] || props.schema.description) && (
                <ArrayFieldDescription
                    idSchema={props.idSchema}
                    description={uiDescription as string}
                    schema={props.schema}
                    registry={props.registry}
                    uiSchema={options}
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
