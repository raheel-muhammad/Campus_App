import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import "../StudentProfile/StudentProfile.css";
const Textfield = (props) => {
  const [disable, setDisable] = useState(true);

  const handleBtn = (e) => {
    e.preventDefault();
    setDisable(false)
  };

  return (
    <div className='input-field'>
      <TextField
        focused={!disable}
        onBlur={() => setDisable(true)}
        multiline
        rowsMax={4}
        id={props.id}
        label={props.label}
        required={props.required}
        value={props.value}
        name={props.name}
        fullWidth={props.fullWidth}
        onChange={props.onChange}
        disabled={disable}
        type={props.type}
        InputProps={{
          startAdornment: props.InputProps && props.InputProps.startAdornment,
          disableUnderline: disable
        }}
        inputProps={{
          minLength: props.inputProps && props.inputProps.minLength,
          maxLength: props.inputProps && props.inputProps.maxLength
        }}
        variant={props.variant}
        style={props.style}
        onKeyPress={props.onKeyPress}
        autoComplete={props.autoComplete}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderColor: "#532696"
            }
          }
        }}
        InputLabelProps={{ style: { color: '#000000' } }}
      />
      {props.editIcon ? disable && (
        <IconButton size="small" onClick={handleBtn} >
          <EditIcon fontSize="16px" />
        </IconButton>
      ) : <></>

      }
    </div>
  );
};

export default Textfield;
