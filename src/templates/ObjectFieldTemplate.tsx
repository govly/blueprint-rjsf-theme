import React from 'react';
import type {ObjectFieldTemplateProps} from '@rjsf/utils';
import {canExpand, getTemplate, getUiOptions} from '@rjsf/utils';
import {Button, Card} from "@blueprintjs/core";

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
    const {
        description,
        disabled,
        formData,
        idSchema,
        onAddClick,
        properties,
        readonly,
        schema,
        title,
        uiSchema,
        registry,
        required
    } = props;
    const options = getUiOptions(uiSchema);
    const uiTitle = options['ui:title'] || title;
    const TitleFieldTemplate = getTemplate<'TitleFieldTemplate'>('TitleFieldTemplate', registry, options);
    const DescriptionFieldTemplate = getTemplate<'DescriptionFieldTemplate'>(
        'DescriptionFieldTemplate',
        registry,
        options
    );
    return (
        <Card style={{ marginBottom: 20 }}>
            {(options['ui:title'] || title) && (
                <TitleFieldTemplate
                    id={`${idSchema.$id}-title`}
                    title={uiTitle as string}
                    required={required}
                    schema={schema}
                    uiSchema={uiSchema}
                    registry={registry}
                />
            )}
            {description && (
                <DescriptionFieldTemplate
                    id={`${idSchema.$id}-description`}
                    description={description}
                    schema={schema}
                    uiSchema={uiSchema}
                    registry={registry}
                />
            )}
            {properties.map((element, index) => (
                <div
                    key={index+1}
                    style={{
                        display: element.hidden ? 'none' : 'block',
                    }}
                >
                    {element.content}
                </div>
            ))}
            {canExpand(schema, uiSchema, formData) ? (
                <Button
                    fill icon="plus"
                    onClick={onAddClick(schema)}
                    disabled={disabled || readonly}
                    className="object-property-expand"
                    style={{margin: "5px"}}
                />
            ) : null}
        </Card>
    );
};
