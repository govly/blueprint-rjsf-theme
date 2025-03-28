import type { ThemeProps } from "@rjsf/core";
import {getDefaultRegistry} from '@rjsf/core';
import type {RegistryWidgetsType, RegistryFieldsType, TemplatesType} from '@rjsf/utils';
import Widgets from './widgets';
import Templates from './templates';
import Fields from './fields';
import "./css/style.css"

const { fields, widgets } = getDefaultRegistry()

export type Bp5ThemeType = {
    widgets: RegistryWidgetsType,
    fields: RegistryFieldsType,
    templates: TemplatesType
}

export const Bp5Theme = {
    widgets: {
        ...widgets,
        ...Widgets
    },
    fields: {
        ...fields,
        ...Fields
    },
    templates: Templates,
} as ThemeProps as Bp5ThemeType;
