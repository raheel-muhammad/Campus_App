import FmdGoodIcon from '@mui/icons-material/FmdGood';
import InfoIcon from '@mui/icons-material/Info';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import PeopleIcon from '@mui/icons-material/People';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SchoolIcon from "@mui/icons-material/School";
import { Avatar, InputAdornment } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useState } from 'react';
import Textfield from '../Inputfeild/Textfield';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ProfileModal(props) {
    const { ApplicantsDetails, index } = props
    const [open, setOpen] = useState(false);
    const handleView = () => setOpen(true);
    const handleClose = () => setOpen(false);





    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 750,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} component='form'
                    >





                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "15px"
                        }}>

                            <Avatar alt={ApplicantsDetails?.fullname} src={ApplicantsDetails?.ImgUrl} style={{
                                width: "90px",
                                height: "90px ",
                            }} />

                        </div>
                        <Textfield
                            editIcon={false}
                            id='input-with-icon-textfield'
                            label='Full Name'
                            fullWidth
                            value={ApplicantsDetails?.fullname || ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <PersonSearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant='standard'
                            style={{ marginBottom: "10px" }}
                        />

                        <Textfield
                            editIcon={false}
                            id='input-with-icon-textfield'
                            label='Father Name'
                            fullWidth={true}
                            value={ApplicantsDetails?.fathername}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SchoolIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant='standard'
                            style={{ marginBottom: "10px" }}
                        />
                        <Textfield
                            editIcon={false}
                            id='input-with-icon-textfield'
                            label='Email'
                            fullWidth={true}
                            value={ApplicantsDetails?.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <FmdGoodIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant='standard'
                            style={{ marginBottom: "10px" }}
                        />
                        <Textfield
                            editIcon={false}
                            variant='standard'
                            id='input-with-icon-textfield'
                            label='CNIC'
                            fullWidth={true}
                            value={ApplicantsDetails?.cnic}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            inputProps={{ minLength: 3, maxLength: 3 }}
                            autoComplete='off'
                            style={{ marginBottom: "10px" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <PeopleIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Textfield
                            editIcon={false}
                            id='input-with-icon-textfield'
                            label='Student ID'
                            fullWidth={true}
                            value={ApplicantsDetails?.userName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LabelImportantIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant='standard'
                            style={{ marginBottom: "10px" }}
                        />
                        <Textfield
                            editIcon={false}
                            id='input-with-icon-textfield'
                            label='Highest Qualification'
                            fullWidth
                            disabled={true}
                            multiline
                            rowsMax={4}
                            value={ApplicantsDetails?.qualification}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <InfoIcon />
                                    </InputAdornment>
                                ),
                                disableUnderline: true
                            }}
                            variant='standard'
                            style={{ marginBottom: "10px" }}
                        />

                    </Box>
                </Fade>
            </Modal>
            <div style={{ display: "flex" }}>
                <Button size="small" onClick={handleView}>View Profile</Button>
            </div>

        </div>
    );
}
