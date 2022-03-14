import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';

// import MoreVertIcon from '@mui/icons-material/MoreVert';


function createData(preview, name, dimensions, type, updated, by, status, icon) {
    return {
        preview,
        name,
        dimensions,
        type,
        updated,
        by,
        status,
        icon
    };
}

const icon = <IconButton color="primary" sx={{ p: '10px' }}
    aria-label="directions" >
    <MoreVertIcon />
</IconButton>

// const rows = [
//     createData(
//         <CardMedia
//             component="img"
//             height="50"
//             image="https://www.inpixio.com/remove-background/images/main-before.jpg"
//             fontSize="10"
//         />,

//         "Robert Johnstons, Breaking News about",
//         "1280x584",
//         'JPG',
//         '11/Sep/2022',
//         'User',
//         'Publiced',
//         icon ,

//     ),

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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
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
        id: "preview",
        numeric: false,
        disablePadding: true,
        label: "Preview"
    },
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name"
    },
    {
        id: "dimensions",
        numeric: true,
        disablePadding: false,
        label: "Dimensions"
    },
    {
        id: "type",
        numeric: true,
        disablePadding: false,
        label: "Type"
    },
    {
        id: "updated",
        numeric: true,
        disablePadding: false,
        label: "Updated"
    },
    {
        id: "by",
        numeric: true,
        disablePadding: false,
        label: "By"
    },
    {
        id: "status",
        numeric: true,
        disablePadding: false,
        label: "Status"
    },
    {
        id: "icon",
        numeric: true,
        disablePadding: false,
        label: ""
    }
];


function EnhancedTableHead(props) {
    const { order, orderBy } = props;
    // const createSortHandler = (property) => (event) => {
    //     onRequestSort(event, property);
    // };


    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}

                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function TableMedia({ post }) {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // setData to table
    const [loading, setLoading] = React.useState(true);

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        if (post) {
            let rows = [];
            // console.log(post, "console post");
            post.forEach(
                (element) => {
                    let allRow = createData(
                        element?.imageSrc,
                        element?.title !== "" ? element.title : element.imageName,
                        "900x473",
                        'PNG',
                        element?.createdAt,
                        'User',
                        element?.status,
                        icon,

                    );
                    rows.push(allRow);
                    setRows([...rows]);
                }
            );
            setLoading(false)
        }
    }, [post]);

    if (loading) {
        return (
            <h2>Loading ....</h2>
        )
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, padding: 5, borderRadius: 5 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            // numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <TableCell align="center">
                                                {/* {row.preview} */}
                                                <CardMedia
                                                    component="img"
                                                    height="40"
                                                    image={`${row.preview}`}
                                                    fontSize="10"
                                                />

                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.dimensions}</TableCell>
                                            <TableCell align="right">{row.type}</TableCell>
                                            <TableCell align="right">{row.updated}</TableCell>
                                            <TableCell align="right">{row.by}</TableCell>
                                            <TableCell align="right"
                                                sx={{
                                                    color: row.status === true ? "#0DE86A" : "#E8270D"
                                                }}
                                            >{row.status === true ? "Publish" : "Draft"}</TableCell>

                                            <TableCell align="right">

                                                <div>
                                                    <IconButton
                                                        size="large"
                                                        aria-label="account of current user"
                                                        aria-haspopup="true"
                                                        onClick={handleMenu}
                                                        color="inherit"

                                                    >
                                                        {row.icon}
                                                    </IconButton>
                                                    <Menu
                                                        sx={{ boxShadow: 0 }}
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'right',
                                                        }}
                                                        keepMounted
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'right',
                                                        }}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleClose}
                                                    >
                                                        <MenuItem disableRipple >
                                                            <EditIcon sx={{ fontSize: 20, mr: 1 }} />
                                                            Edit
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose}>
                                                            <DeleteIcon sx={{ fontSize: 20, mr: 1 }} />
                                                            Delete
                                                        </MenuItem>
                                                    </Menu>
                                                </div>

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
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box >
    );
}
