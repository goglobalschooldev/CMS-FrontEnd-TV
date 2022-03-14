import React, { useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { Typography, Grid, Box, Button, Modal } from '@mui/material'
import { Divider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import FormTable from '../components/News/FormTable';
import { makeStyles } from '@mui/styles';
import AddForm from '../components/News/AddForm';
import api from '../api/posts'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: '#797E7F',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.30),
        color: 'black'
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
        backgroundColor: '#fff',
        borderRadius: 7,
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    Input: { color: "inherit" },
    "&:hover": {
        input: {
            color: 'black'
        },
        label: {
            color: 'black'
        }
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const gridStyle = {
    justifyContent: 'right',
    display: 'flex'

}

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: '#FAFAFA',
        width: "100%",
    },
    cate: {
        width: "100%",
    },

}));

export default function News() {
    const [openNews, setOpenNews] = React.useState(false);
    const handleOpenNews = () => setOpenNews(true);
    const handleCloseNews = () => setOpenNews(false);

    const classes = useStyles();



    return (
        <Box>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant='h4' > News </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={6} >
                    <Search sx={{ borderRadius: 5 }} >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Grid>
                <Grid item xs={6}
                    style={gridStyle}>
                    <Button variant='contained' onClick={handleOpenNews}>Add News</Button>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={3}>
                                    <Button className={classes.cate} variant="contained">All</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button className={classes.root}>Agriculture</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button className={classes.root}>Education</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button className={classes.root}>Entertainment</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={3}>
                                    <Button className={classes.root}>Business</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button className={classes.root}>National</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button className={classes.root}>International</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button className={classes.root}>Technology</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/*call table */}
                <Grid item xs={12} >
                    <FormTable />
                </Grid>
            </Grid>
            <Modal
                open={openNews}
                onClose={handleCloseNews}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddForm handleOpenNews={handleOpenNews} />
            </Modal>
        </Box >

    );

}


