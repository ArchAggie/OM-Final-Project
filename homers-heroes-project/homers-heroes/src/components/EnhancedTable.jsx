import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// function createData(firstName, lastName, project, phoneNumber, emailAddress, preferredContact) {
//   return {
//     firstName,
//     lastName,
//     project,
//     phoneNumber,
//     emailAddress,
//     preferredContact,
//   };
// }

// const rows = [
//   createData('Philip', 'Fry', 'Bake Sale','000-123-4567', 'fry@planex.com', 'email'),
//   createData('Turanga', 'Leela', 'Bake Sale','000-223-4567', 'captain_leela@planex.com', 'phone'),
//   createData('Amy', 'Wong', 'Big Project', '000-323-4567', 'amy_wong@marsuniversity.edu', 'email'),
//   createData('Bender', 'Rodriguez', 'Big Project','000-423-4567', 'b_b_rodriguez@moms.com', 'email'),
//   createData('Hermes', 'Conrad', 'Big Project','000-523-4567', 'conrad@planex.com', 'phone'),
// ];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    console.log(array);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: "firstName",
        numeric: false,
        disablePadding: true,
        label: "First Name",
    },
    {
        id: "lastName",
        numeric: false,
        disablePadding: true,
        label: "Last Name",
    },
    {
        id: "project",
        numeric: false,
        disablePadding: false,
        label: "Project",
    },
    {
        id: "phoneNumber",
        numeric: false,
        disablePadding: false,
        label: "Phone Number",
    },
    {
        id: "emailAddress",
        numeric: false,
        disablePadding: false,
        label: "Email Address",
    },
    {
        id: "preferredContact",
        numeric: false,
        disablePadding: false,
        label: "Preferred Contact",
    },
];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all volunteers",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "left" : "right"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const handleDelete = async (rows, selected, fetchData) => {
    try {
        await Promise.all(
            selected.map(async (firstName) => {
                const rowToDelete = rows.find((row) => row.firstName === firstName);
                await axios.delete(
                    `http://localhost:8080/Volunteers/${rowToDelete.volunteer_id}`
                );
            })
        );
        fetchData();
        // setSelected([]);
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

function EnhancedTableToolbar(props) {
    const { numSelected, rows, selected, handleDelete, fetchData, handleEdit } =
        props;
    const [open, setOpen] = React.useState(false);
    const [editData, setEditData] = React.useState({});

    const openEditModal = () => {
        if (selected.length !== 1) {
            console.error("Please select only one item to edit");
            return;
        }
        const rowToEdit = rows.find((row) => row.firstName === selected[0]);
        setEditData(rowToEdit);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(
                `http://localhost:8080/Volunteers/${editData.volunteer_id}`,
                editData
            );
            console.log("the put is working");
            fetchData();
            selected([]);
        } catch (error) {
            console.error("Error updating data:", error);
        }
        setOpen(false);
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Your Store's Volunteers
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(rows, selected, fetchData)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
            {numSelected === 1 ? (
                <div>
                    <Tooltip title="edit">
                        <IconButton onClick={openEditModal}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="edit-item-modal"
                        aria-describedby="edit-item-modal-description"
                    >
                        <Box
                            component="form"
                            onSubmit={handleEditSubmit}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <h2 id="edit-volunteer-modal">Edit Volunteer</h2>
                            <TextField
                                label="First Name"
                                value={editData ? editData.firstName : ""}
                                onChange={(e) =>
                                    setEditData({ ...editData, firstName: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Last Name"
                                value={editData ? editData.lastName : ""}
                                onChange={(e) =>
                                    setEditData({ ...editData, lastName: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            {/* <FormControl fullWidth>
                                <InputLabel id="project">Project</InputLabel>
                                <Select
                                    labelId="project"
                                    id="project"
                                    value={editData ? editData.project : ''}
                                    label="project"
                                    onChange={(e) =>
                                        setEditData({ ...editData, project: e.target.value })}
                                >
                                    <MenuItem value={"The Big Event"}>The Big Event</MenuItem>
                                    <MenuItem value={"Hands on Homer"}>Hands on Homer</MenuItem>
                                    <MenuItem value={"Bake Sale"}>Bake Sale</MenuItem>
                                </Select>
                            </FormControl> */}
                            <TextField
                                label="Phone Number"
                                value={editData ? editData.phoneNumber : ""}
                                onChange={(e) =>
                                    setEditData({ ...editData, phoneNumber: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email Address"
                                value={editData ? editData.emailAddress : ""}
                                onChange={(e) =>
                                    setEditData({ ...editData, emailAddress: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                            />
                            <FormControl fullWidth>
                                <InputLabel id="preferred-contact">
                                    Preferred Contact
                                </InputLabel>
                                <Select
                                    labelId="preferred-contact"
                                    id="preferred-contact"
                                    value={
                                        editData ? editData.preferredContact : "Preferred Contact"
                                    }
                                    label="preferred-contact"
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            preferredContact: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value={"PHONE"}>PHONE</MenuItem>
                                    <MenuItem value={"EMAIL"}>EMAIL</MenuItem>
                                </Select>
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>
                    </Modal>
                </div>
            ) : null}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("firstName");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/Volunteers");
            const data = response.data;
            setRows(data);
            console.log(response.data);
            console.log("these are the rows:", rows);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    React.useEffect(() => {
        fetchData();
        console.log("This is logging something.");
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.firstName);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    rows={rows}
                    selected={selected}
                    handleDelete={handleDelete}
                    fetchData={fetchData}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length || 0}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.firstName);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.firstName)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.firstName}
                                            selected={isItemSelected}
                                            sx={{ cursor: "pointer" }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.firstName}
                                            </TableCell>
                                            <TableCell align="right">{row.lastName}</TableCell>
                                            <TableCell align="right">{row.project}</TableCell>
                                            <TableCell align="right">{row.phoneNumber}</TableCell>
                                            <TableCell align="right">{row.emailAddress}</TableCell>
                                            <TableCell algin="right">
                                                {row.preferredContact}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Condense Table"
            />
        </Box>
    );
}
