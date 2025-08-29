import React, { ChangeEvent, FocusEvent, useCallback } from "react";
import {
  ariaDescribedByIds,
  enumOptionsValueForIndex,
  getUiOptions,
  TranslatableString,
} from "@rjsf/utils";
import type { WidgetProps } from "@rjsf/utils";
import {
  FormGroup,
  HTMLSelect,
  MenuItem,
  OptionProps,
} from "@blueprintjs/core";
import { getDefaultRegistry } from "@rjsf/core";
import { type ItemRenderer, MultiSelect } from "@blueprintjs/select";

/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export const SelectWidget = (props: WidgetProps): React.JSX.Element => {
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
    label,
  } = props;
  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options;
  const emptyValue = multiple ? [] : "";

  const registry = getDefaultRegistry();

  const uiProps = getUiOptions(uiSchema);
  const uiHelperText = uiProps["ui:help"] || schema.description;
  const uiLabel = uiProps["ui:title"] || schema.title || label;
  const { translateString } = registry;
  const HTMLSelectOptions: OptionProps[] = [];
  if (!multiple) {
    HTMLSelectOptions.push({
      value: "",
      label: placeholder && placeholder !== "" ? placeholder : "Select option",
      disabled: true,
    });
  }
  if (Array.isArray(enumOptions)) {
    for (const option of enumOptions) {
      HTMLSelectOptions.push({
        value: option.value,
        label: translateString(TranslatableString.OptionPrefix, [option.value]),
        disabled: enumDisabled && enumDisabled.indexOf(option.value) !== -1,
      });
    }
  }

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLSelectElement>) => {
      return onFocus(
        id,
        enumOptionsValueForIndex(
          event.currentTarget.value,
          enumOptions,
          optEmptyVal,
        ),
      );
    },
    [onFocus, id, schema, enumOptions, optEmptyVal],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLSelectElement>) => {
      return onBlur(
        id,
        enumOptionsValueForIndex(
          event.currentTarget.value,
          enumOptions,
          optEmptyVal,
        ),
      );
    },
    [onBlur, id, schema, enumOptions, optEmptyVal],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      return onChange(
        enumOptionsValueForIndex(
          event.currentTarget.value,
          enumOptions,
          optEmptyVal,
        ),
      );
    },
    [onChange, schema],
  );

  return (
    <FormGroup
      disabled={disabled}
      helperText={uiHelperText as string}
      label={uiLabel as string}
      labelFor={id}
      labelInfo={
        (label || uiProps["ui:title"] || schema.title) && required
          ? "(required)"
          : null
      }
    >
      {multiple ? (
        <MultiSelectWidget {...props} />
      ) : (
        <HTMLSelect
          id={id}
          fill
          className={"bp6-rjsf-selectWrapper"}
          disabled={disabled}
          required={required}
          autoFocus={autofocus}
          onBlur={handleBlur}
          value={typeof value === "undefined" ? emptyValue : value}
          onFocus={handleFocus}
          onChange={handleChange}
          aria-describedby={ariaDescribedByIds(id)}
          options={HTMLSelectOptions}
        />
      )}
    </FormGroup>
  );
};

const MultiSelectWidget = (props: WidgetProps): React.JSX.Element => {
  const {
    options,
    value = [],
    disabled,
    onChange,
    placeholder,
    registry,
  } = props;
  const enumOptions = options.enumOptions || [];
  const { translateString } = registry;

  const items: OptionProps[] = enumOptions.map(
    (opt: any): { label: string; value: string } => ({
      label: translateString(TranslatableString.OptionPrefix, [opt.value]),
      value: opt.value,
    }),
  );

  const handleSelect = (item: OptionProps) => {
    if (!value.includes(item.value)) {
      onChange([...value, item.value]);
    }
  };

  const handleRemove = (item: OptionProps) => {
    onChange(value.filter((v: string) => v !== item.value));
  };

  const selectedItems = items.filter((item) => value.includes(item.value));

  const renderItem: ItemRenderer<OptionProps> = (
    item: OptionProps,
    { handleClick, modifiers },
  ) => {
    const isSelected = selectedItems.some(
      (selected) => selected.value === item.value,
    );
    return (
      <MenuItem
        key={item.value}
        text={item.label}
        active={modifiers.active}
        onClick={handleClick}
        shouldDismissPopover={false}
        icon={isSelected ? "tick" : "blank"}
      />
    );
  };

  return (
    <MultiSelect<OptionProps>
      items={items}
      itemRenderer={renderItem}
      itemPredicate={(
        query: string,
        item: OptionProps,
        _index?: number,
        _exactMatch?: boolean,
      ): boolean => {
        const result = item.label?.toLowerCase().includes(query.toLowerCase());
        return result || false;
      }}
      onItemSelect={handleSelect}
      onRemove={handleRemove}
      selectedItems={selectedItems}
      tagRenderer={(item) => item.label}
      tagInputProps={{
        disabled,
        placeholder,
      }}
      popoverProps={{ minimal: true }}
      fill
      resetOnSelect
    />
  );
};
