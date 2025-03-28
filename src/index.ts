import { getDefaultRegistry } from '@rjsf/core';
import Widgets from './widgets';
import Templates from './templates';
import Fields from './fields';
import "./css/style.css"

const { fields, widgets } = getDefaultRegistry()

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
};