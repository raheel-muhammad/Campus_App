import { Avatar, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Container } from '@mui/system';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { RemoveAppliedStudent } from '../../redux/action';
import ProfileModal from './ProfileModal';
import Cards from '../MainCards/Cards'
import { AllJobsArray, AvailableJobs } from '../../firebase/AvailableJobs'
import "./style.css"

export default function ViewJobsModalAdmin(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');


    const handleClickOpen = () => {
        setOpen(true);
        setScroll('paper');
    };

    const handleClose = () => {
        dispatch(RemoveAppliedStudent())
        setOpen(false);
    };
    const handleOpen = async () => {
        if (props.item.role === "company") {
            await AllJobsArray(props.uid, dispatch).then(() => handleClickOpen())
        } else {
            await AvailableJobs(dispatch, props.uid).then(() => handleClickOpen())
        }

    }
    const handleClick = () => {
        handleClose()
    }
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button onClick={() => handleOpen()} className="ButtonText">
                {props.ListButtonText1}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth={true}
            >
                <DialogTitle id="scroll-dialog-title" style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }} >{props.ListDilogTitle1}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >

                        <Container sx={{ py: 8 }} maxWidth="md" >

                            <Grid container spacing={4}>


                                {
                                    props.alljobs.length ?
                                        props?.alljobs?.map((item, index) => (

                                            item && <Cards
                                                uid={props.uid}
                                                jobID={item.jobID}
                                                item={item}
                                                index={index}
                                                DialogBoxButtonText={props.DialogBoxButtonText}
                                                DialogBoxTitle={props.DialogBoxTitle}
                                                DialogBoxText={props.DialogBoxText}
                                                DialogAgreeButtonText={props.DialogAgreeButtonText}
                                                DialogCancelButtonText={props.DialogCancelButtonText}
                                                DialogBox={props.DialogBox}
                                                EditModal={props.EditModal}
                                            />

                                        ))
                                        : <Typography >No jobs available</Typography>
                                }


                            </Grid>
                        </Container>







                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClick} size="small" className="ButtonText" >
                        {props.ListDialogCloseButton1}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
