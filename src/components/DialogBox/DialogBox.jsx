import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogBox(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {

        setOpen(false);

    };
    const handleClose = async () => {

        await props.handleAgreeClick().then(() => setOpen(false))



    }

    return (
        <div>
            <Button size={props.size} onClick={handleClickOpen}>
                {props.ButtonText}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCancel}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{props.DialogBoxTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.DialogBoxText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>{props.CancelButtonText}</Button>
                    <Button onClick={handleClose}>{props.AgreeButtonText}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
