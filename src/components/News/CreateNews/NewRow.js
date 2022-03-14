import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Menu, MenuItem } from '@mui/material';
import { Markup } from 'interweave';
import moment from "moment";
export default function NewRow({ row }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableRow
            hover
            key={row.id}
        >
            <TableCell
                component="th"
                scope="row"
                padding="true"
                width={"30%"}
            >
                <Markup content={row.title} />
            </TableCell>
            <TableCell align="right">{row.newsCategory.name}</TableCell>
            <TableCell align="right">{row.view}</TableCell>
            <TableCell align="right">{row.like}</TableCell>
            <TableCell align="right">{moment(row.updatedAt).format("YYYY-MMMM-DD")}</TableCell>
            <TableCell align="right">{row.author}</TableCell>
            <TableCell align="right"
                sx={{
                    color: row.status === "Published" ? "#0DE86A" : "#E8270D"
                }}
            >{row.status}</TableCell>
            <TableCell padding="checkbox">
                <>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon
                            color="palette.grey.a700"
                        />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}><EditIcon sx={{ fontSize: 20, mr: 1 }} />edit</MenuItem>
                        <MenuItem onClick={handleClose}><DeleteIcon sx={{ fontSize: 20, mr: 1 }} />delete</MenuItem>
                    </Menu>
                </>
            </TableCell>

        </TableRow>

    );
}
