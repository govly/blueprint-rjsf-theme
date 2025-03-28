import React from 'react';
import {canExpand, getUiOptions, ObjectFieldTemplateProps} from '@rjsf/utils';
import {TitleField} from "../fields/TitleField";
import {DescriptionField} from "../fields/DescriptionField";
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
    } = props;
    const options = getUiOptions(uiSchema);
    const uiTitle = options['ui:title'] || title;
    return (
        <Card style={{ marginBottom: 20 }}>
            {(options['ui:title'] || title) && (
                <TitleField
                    id={`${idSchema.$id}-title`}
                    title={uiTitle as string}
                    uiSchema={options}
                />
            )}
            {description && (
                <DescriptionField
                    id={`${idSchema.$id}-description`}
                    description={description}
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
