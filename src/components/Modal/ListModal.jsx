import { Avatar, Table, TableBody, TableCell, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RemoveAppliedStudent } from '../../redux/action';
import ProfileModal from './ProfileModal';

export default function ListDialog(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');


    const handleClickOpen = () => {
        setOpen(true);
        setScroll('paper');
    };

    const handleClose = () => {
        dispatch(RemoveAppliedStudent())
        props.handleListClose()
        setOpen(false);
    };
    const handleOpen = async () => {
        await props.handleListModalOpen()
        //     .then(() => {
        //     handleClickOpen()
        // })
        // if (props.AppliedStudent[0]) {
        //     handleClickOpen()
        // }

    }

    useEffect(() => {
        dispatch(RemoveAppliedStudent())
    }, [])

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
            <Button onClick={() => handleOpen()}>
                {props.ListButtonText}
            </Button>
            <Dialog
                open={props.openList}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{props.ListDilogTitle}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Table size="large">
                            <TableBody>
                                {props.AppliedStudent?.map((Data, index) => (
                                    <TableRow key={Data.id}>
                                        <TableCell> <Avatar alt={Data.fullname} src={Data.ImgUrl} style={{ marginRight: "10px" }} /></TableCell>
                                        <TableCell>{Data.fullname}</TableCell>
                                        <TableCell>{Data.email}</TableCell>
                                        <TableCell>{Data.userName}</TableCell>
                                        <TableCell><ProfileModal ApplicantsDetails={Data} index={index} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    <Button onClick={handleClick} size="small" >{props.ListDialogCloseButton}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
