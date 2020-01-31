import MomentUtils from "@date-io/moment";
import {
  DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import PropTypes from "prop-types";
import { addField, FieldTitle } from "react-admin";
import React from "react";
const makePicker = PickerComponent => {
  const _makePicker = React.forwardRef((props, ref) => {

    const onChange = date => {
      props.input.onChange(date);
      props.input.onBlur();
    };

    const {
      input,
      options,
      label,
      source,
      resource,
      isRequired,
      meta,
      providerOptions
    } = props;

    const { touched, error } = meta;

    return (
      <div className="MuiFormControl-marginNormal-196">
        <MuiPickersUtilsProvider {...providerOptions}>
          <PickerComponent
            {...options}
            label={
              <FieldTitle
                label={label}
                source={source}
                resource={resource}
                isRequired={isRequired}
              />
            }
            disableToolbar
            error={!!(touched && error)}
            helperText={touched && error}
            ref={ref}
            value={input.value ? input.value : null}
            variant="inline"
            onChange={date => onChange(date)}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  });
  _makePicker.propTypes = {
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    providerOptions: PropTypes.shape({
      utils: PropTypes.func,
      locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    })
  };

  _makePicker.defaultProps = {
    input: {},
    isRequired: "false",
    label: "",
    meta: { touched: false, error: false },
    options: {},
    resource: "",
    source: "",
    labelTime: "",
    providerOptions: {
      utils: MomentUtils,
      locale: undefined
    }
  };
  return _makePicker;
};

export const DateInput = addField(makePicker(DatePicker));
export const KeyboardDateInput = addField(makePicker(KeyboardDatePicker));
export const TimeInput = addField(makePicker(TimePicker));
export const DateTimeInput = addField(makePicker(DateTimePicker));