import FmdGoodIcon from '@mui/icons-material/FmdGood';
import InfoIcon from '@mui/icons-material/Info';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import PeopleIcon from '@mui/icons-material/People';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SchoolIcon from "@mui/icons-material/School";
import { LoadingButton } from '@mui/lab';
import { InputAdornment } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { useFormik } from "formik";
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { GetAppliedStudentData } from '../../firebase/GetAppliedStudentData';
import { DeleteJob, UpdateJob } from '../../firebase/PostAndUpdateJobs';
import { JobDeleteInit, JobUpdateFail, JobUpdateInit, JobUpdateSuccess } from '../../redux/action';
import DialogBox from '../DialogBox/DialogBox';
import DropDown from '../DropDown/DropDown';
import Textfield from '../Inputfeild/Textfield';
import SnackBar from '../Snackbar/SnakBar';
import ListDialog from './ListModal';

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

export default function EditModal(props) {
    const [snackDisplay, setSnackDispaly] = useState(false)
    const [openList, setOpenList] = useState(false)
    const dispatch = useDispatch();
    const UserDetails = useSelector((state) => state.user);
    const AppliedStudent = UserDetails.AppliedStudents
    const { JobDetails, index } = props
    const [open, setOpen] = useState(false);
    const handleEdit = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [disable, setDisable] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")


    const handleCloseAlert = () => {
        setSnackDispaly(false)
        // setErrorMessage("")
    }
    const handleListClose = () => {
        setOpenList(false)
    }
    const handleReset = () => {
        setDisable(true);
        formik.handleReset();
        // console.log(formik.values)
    };

    const handleChange = (e) => {
        setDisable(false)
        formik.handleChange(e)
    }

    const handleDelete = async () => {
        dispatch(JobDeleteInit())
        try {
            await DeleteJob(JobDetails, UserDetails.uid, dispatch, index)
            setErrorMessage("Job deleted successfully")
            setSnackDispaly(true)
            console.log("success");
        } catch {
            setErrorMessage("Job deletion failed")
            setSnackDispaly(true)
        }

    }
    const handleListModalOpen = async () => {
        if (JobDetails.ApplicantsIDs) {

            const ListArray = [...Object.entries(JobDetails?.ApplicantsIDs)?.map(entry => entry[0])]
            ListArray.map(async (item, index) =>
                await GetAppliedStudentData(item, dispatch)
            )

            setOpenList(true)
        } else {
            setErrorMessage("No Applicants Found")
            setSnackDispaly(true)
            // console.log("first", JobDetails)
        }



    }





    const validationSchema = Yup.object({
        JobDesignation: Yup.string(),
        RequiredQualification: Yup.string(),
        Location: Yup.string(),
        VacantPosition: Yup.string(),
        category: Yup.string(),
        JobDescription: Yup.string()
    });

    const formik = useFormik({
        initialValues: {
            JobDesignation: JobDetails.JobDesignation,
            RequiredQualification: JobDetails.RequiredQualification,
            Location: JobDetails.Location,
            VacantPosition: JobDetails.VacantPosition,
            category: JobDetails.category,
            JobDescription: JobDetails.JobDescription
        },
        validationSchema,
        onSubmit: async (values) => {
            // console.log("submit works")
            dispatch(JobUpdateInit());
            setDisable(true);
            try {
                await UpdateJob({
                    uid: UserDetails.uid,
                    dispatch: dispatch,
                    JobDesignation: values.JobDesignation,
                    RequiredQualification: values.RequiredQualification,
                    Location: values.Location,
                    VacantPosition: values.VacantPosition,
                    category: values.category,
                    jobID: JobDetails.jobID,
                    JobDescription: values.JobDescription
                })
                console.log(JobDetails)
                dispatch(JobUpdateSuccess({ ...values, jobID: JobDetails.jobID, index, ApplicantsIDs: JobDetails.ApplicantsIDs }));
            } catch (e) {
                console.log(e);
                dispatch(JobUpdateFail());
            }
        }
    });



    return (
        <div>
            <SnackBar openSnackBar={snackDisplay} handleCloseAlert={handleCloseAlert} severity={"error"} AlertMessage={errorMessage} />
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
                        onSubmit={formik.handleSubmit}>








                        <Textfield
                            editIcon={true}
                            id='input-with-icon-textfield'
                            label='Job Designation'
                            name='JobDesignation'
                            fullWidth
                            onChange={handleChange}
                            value={formik.values.JobDesignation}
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
                            editIcon={true}
                            id='input-with-icon-textfield'
                            label='Required Qualification'
                            fullWidth={true}
                            name='RequiredQualification'
                            onChange={handleChange}
                            value={formik.values.RequiredQualification}
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
                            editIcon={true}
                            id='input-with-icon-textfield'
                            label='Location'
                            fullWidth={true}
                            name='Location'
                            onChange={handleChange}
                            value={formik.values.Location}
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
                            editIcon={true}
                            variant='standard'
                            id='input-with-icon-textfield'
                            label='No. Of Vacant Position'
                            type='tel'
                            fullWidth={true}
                            name='VacantPosition'
                            onChange={handleChange}
                            value={formik.values.VacantPosition}
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
                            editIcon={true}
                            id='input-with-icon-textfield'
                            label='Job Description'
                            onChange={handleChange}
                            fullWidth
                            name="JobDescription"
                            disabled={true}
                            multiline
                            rowsMax={4}
                            value={formik.values.JobDescription}
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

                        <DropDown
                            variant='standard'
                            label='Category'
                            name='category'
                            onChange={handleChange}
                            id='category'
                            value={formik.values.category}
                            arrayCategoray={["Fresher", "Mid-Level", "Senior"]}
                            fullWidth={true}
                            Icon={<LabelImportantIcon />}
                        />




                        <div className='bottom-btns'>
                            <div className='apply-btn'>
                                <LoadingButton
                                    type='submit'
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={disable}
                                    loading={UserDetails.loading ? true : false}
                                >
                                    Apply Changes
                                </LoadingButton>
                            </div>
                            <div className='reset-btn'>
                                <LoadingButton
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={disable}
                                    loading={UserDetails.loading ? true : false}
                                    onClick={handleReset}
                                >
                                    Reset
                                </LoadingButton>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
            <div style={{ display: "flex", alignItems: "center" }}>
                <DialogBox ButtonText={"Delete"} size="small" DialogBoxTitle={"Do you want to delete this posted job?"}
                    DialogBoxText={"Note:This post will be deleted permenantly."}
                    AgreeButtonText={"Yes"}
                    CancelButtonText={"No"}
                    handleAgreeClick={handleDelete} />
                <Button size="small" onClick={handleEdit}>Edit</Button>
                <ListDialog ListButtonText={"Applicants"} ListDilogTitle={"Applicants:"}
                    ListDialogCloseButton={"Close"} handleListModalOpen={handleListModalOpen}
                    AppliedStudent={AppliedStudent}
                    openList={openList}
                    handleListClose={handleListClose} />
            </div>

        </div>
    );
}
