import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { useState } from 'react';

export default function DropDown(props) {
  const [disable, setDisable] = useState(true);

  const value = props.value
  return (
    <Box sx={props.sx}>
      <FormControl fullWidth={props.fullWidth} >
        <InputLabel
          // id="demo-multiple-checkbox-label"
          sx={{
            // color: "red"
            "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
              color: "red"
            }
          }}>{props.label}:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={props.id}
          value={props.value}

          label={props.label}
          onChange={props.onChange}
          fullWidth={props.fullWidth}
          name={props.name}
          variant={props.variant}
          onBlur={() => setDisable(true)}
          disabled={disable}
          onClick={() => setDisable(false)}
          disableUnderline={disable}
          // sx={props.selectStyle || {}}
          // sx={{
          //   "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
          //     color: "red !important"
          //   }
          // }}
          renderValue={(value) => {
            return (
              <Box sx={{ display: "flex", gap: 1 }}>
                {props.Icon}
                {value}
              </Box>
            );
          }}
        >
          {props.arrayCategoray.map((item) => {
            return < MenuItem value={item} > {item}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box >
  );
}
