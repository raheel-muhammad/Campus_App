import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, TableHead } from '@mui/material';
import ViewJobsModalAdmin from '../../Modal/ViewJobsModalAdmin';
import { handleBlockOrUnblock } from '../../../firebase/BlockandUblock';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../Title';
import { AcceptApprovals } from '../../../firebase/handleApproval';




function TablePaginationActions(props) {

    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function PanelTabU(props) {
    const dispatch = useDispatch();
    // const BlockOrUnblockHandler = (role, item, index) => {
    //     handleBlockOrUnblock(role, item, dispatch, index)

    // }
    const { NewApprovalStudentsArray } = useSelector((state) => state.user);


    const handleAcceptRequest = async (index, uid, item, role) => {
        AcceptApprovals(role, index, uid, dispatch, item)
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.Data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (

        <>
            <Title>{props.Title}</Title>

            <TableContainer component={Paper} style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableRow style={{ verticalAlign: "top" }}>
                        <TableCell>{props.TableHead1}</TableCell>
                        <TableCell>{props.TableHead2}</TableCell>
                        <TableCell></TableCell>

                    </TableRow>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? props.Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.Data
                        ).map((row, index) => (
                            <TableRow key={row.name} style={{ verticalAlign: "top", maxHeight: "20px !important" }}>
                                <TableCell style={{ maxHeight: "20px" }} component="th" scope="row"  >
                                    {row.userName}
                                </TableCell>
                                <TableCell style={{ width: 160, maxHeight: "20px" }} align="right">
                                    {row.email}
                                </TableCell>
                                <TableCell align='right' style={{ maxHeight: "20px" }}>
                                    <Button
                                        size='small'
                                        onClick={() =>
                                            handleAcceptRequest(index, row.uid, row, row.role)} >Accept
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                </Table>

                <Box>
                    <TablePagination
                        labelRowsPerPage=''
                        rowsPerPageOptions={[5]}
                        style={{ display: "flex", justifyContent: "center" }}
                        colSpan={3}
                        count={props.Data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </Box>

            </TableContainer>
        </>);
}
