import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import React, { Component } from 'react';

class RenderSelect extends Component {
  render() {
    const { name, label, value, data, onChange } = this.props;

    return (
      <>
        <FormControl>
          <InputLabel htmlFor='demo-dialog-native'>{label}</InputLabel>
          <Select
            name={name}
            value={value}
            required={true}
            onChange={onChange}
            input={<Input />}
          >
            <option aria-label='Select' value=''>
              Select
            </option>
            {(data || []).map((itm) => {
              return <option value={itm.id}>{itm.label}</option>;
            })}
          </Select>
        </FormControl>
      </>
    );
  }
}

export default RenderSelect;
